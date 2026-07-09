import { LLM, LMStudioClient, type ChatLike } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'
import { Glob, YAML } from 'bun'
// import { mdxToJs } from 'satteri'

const client = new LMStudioClient()

const models: Model[] = [
  'zai-org/glm-4.7-flash',
  'openai/gpt-oss-20b',
  'google/gemma-4-26b-a4b-qat',
]

// const fixingArticleModel: Model = 'qwen/qwen3.5-9b'

const systemPrompt = `You are an experienced technical writer who specializes in explaining complex topics to beginners.

Your task is to rewrite the provided MDX article so it is easier to understand for readers with little or no prior knowledge of the technology being discussed.

Requirements:

Preserve the original meaning and technical accuracy.
Preserve the original language of given article.
Preserve imports.
Do not add new information, examples, or opinions that are not present in the original article.
You may reorganize sections, improve formatting, simplify explanations, and rewrite sentences to improve readability.
Keep all existing code examples unless they are explicitly removed in the source article.
Keep the output in valid MDX format.
After generating the rewritten content, check the output for mdx errors like missing closing gaps.
Maintain a friendly, educational tone.
Use gender-neutral language whenever reasonably possible.
Improve headings, paragraphs, lists, and transitions to make the article flow naturally.
Do not omit important technical details unless they are redundant or repeated elsewhere in the article.

Output only the rewritten MDX content. Do not include explanations, notes, or markdown code fences.

Skip the top frontmatter, it'll be later injected into script.
`

const blogGlob = new Glob('src/content/blog/**/*.{md,mdx}')
const blogCollections = await Array.fromAsync(blogGlob.scan())

interface AiBlog {
  parentId: string
  written_by: string
}

const articles = new Map(
  await Promise.all(
    blogCollections.map(async (blogPath) => {
      const content = await Bun.file(blogPath).text()
      return [blogPath, content] as const
    }),
  ),
)

const aiGenerationData = models.flatMap((model) => {
  return [...articles.keys()].map((blogPath) => {
    const [fileName, locale] = blogPath.split('/').reverse()
    const [name, ext] = fileName.split('.')
    const generatedName = `${name}.${model.replace('/', '_')}.${ext}`
    const path = ['src/content/blog-ai', locale, generatedName].join('/')
    return {
      parent: name,
      inputPath: blogPath,
      outputPath: path,
      model: model,
    }
  })
})

const toGenerate = (
  await Promise.all(
    aiGenerationData.map(async (item) => {
      const exists = await Bun.file(item.outputPath).exists()
      return { ...item, exists }
    }),
  )
).filter((item) => !item.exists)

if (toGenerate.length === 0) {
  throw new Error('Nothing new to generate')
}

const redactArticle = async (model: LLM, chat: ChatLike) => {
  const prediction = model.respond(chat)
  for await (const { content } of prediction) {
    process.stdout.write(content)
  }
  const { stats, nonReasoningContent } = await prediction
  return { stats, nonReasoningContent }
}

const createTimestamp = () =>
  Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date())

let loadedModel: LLM | null = null

for (const { inputPath, outputPath, model, parent } of aiGenerationData) {
  const article = articles.get(inputPath)
  if (!article) throw new Error(`No article found under ${inputPath}`)

  loadedModel ??= await client.llm.model(model, {
    config: {
      evalBatchSize: 4096,
      flashAttention: true,
    },
  })

  const chat = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: article,
    },
  ] satisfies ChatLike

  const startDate = createTimestamp()

  console.info(
    `(${startDate}): Began generating redaction by '${model}' of '${parent}' to '${outputPath}'`,
  )

  const frontmatterWithAI = {
    parentId: parent,
    written_by: model,
  } satisfies AiBlog

  const { nonReasoningContent } = await redactArticle(loadedModel, chat)

  const output = Bun.file(outputPath)
  const template = `
---
${YAML.stringify(frontmatterWithAI, null, 2)}
---
${nonReasoningContent}
`
  await output.write(template)

  await loadedModel.unload()
  loadedModel = null
}

exit(0)
