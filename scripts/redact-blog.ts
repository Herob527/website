import { LMStudioClient, type ChatLike } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'
import { Glob, YAML } from 'bun'
import { mdxToJs } from 'satteri'

const client = new LMStudioClient()

const models: Model[] = [
  'google/gemma-4-e4b',
  // 'microsoft/phi-4-reasoning-plus',
  // 'zai-org/glm-4.7-flash',
  // 'google/gemma-4-26b-a4b-qat',
  // 'openai/gpt-oss-20b',
]

const blogGlob = new Glob('src/content/blog/**/*.{md,mdx}')
const blogCollections = await Array.fromAsync(blogGlob.scan())

interface Frontmatter {
  title: string
  description: string
  date: string
  written_by: string
  language: string
}

const articles = await Promise.all(
  blogCollections.map(async (blogPath) => {
    const item = await Bun.file(blogPath).text()
    const compiled = mdxToJs(item)

    const { frontmatter } = compiled
    if (!frontmatter?.value) {
      throw new Error('No frontmatter')
    }
    const val = YAML.parse(frontmatter.value) as Frontmatter
    return {
      blogPath,
      frontmatter: val,
      content: item,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: blogPath.split('/').at(-1)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      language: blogPath.split('/').at(-2)!,
    }
  }),
)

for (const modelName of models) {
  const model = await client.llm.model(modelName, {
    config: {
      evalBatchSize: 4096,
      flashAttention: true,
    },
  })

  for (const article of articles.filter(
    (article) => article.frontmatter.written_by === 'human',
  )) {
    const chat = [
      {
        role: 'system',
        content: `You are an experienced technical writer who specializes in explaining complex topics to beginners.

Your task is to rewrite the provided MDX article so it is easier to understand for readers with little or no prior knowledge of the technology being discussed.

Requirements:

Preserve the original meaning and technical accuracy.
Do not add new information, examples, or opinions that are not present in the original article.
You may reorganize sections, improve formatting, simplify explanations, and rewrite sentences to improve readability.
Keep all existing code examples unless they are explicitly removed in the source article.
Keep the output in valid MDX format.
Maintain a friendly, educational tone.
Use gender-neutral language whenever reasonably possible.
Improve headings, paragraphs, lists, and transitions to make the article flow naturally.
Do not omit important technical details unless they are redundant or repeated elsewhere in the article.

Output only the rewritten MDX content. Do not include explanations, notes, or markdown code fences.`,
      },
      {
        role: 'user',
        content: article.content,
      },
    ] satisfies ChatLike

    const output = Bun.file(
      `generated/${article.language}/${article.name.replace('.mdx', `.${modelName.replaceAll('/', '_')}`)}.mdx`,
    )
    await output.unlink()
    const writer = output.writer({ highWaterMark: 1024 ** 2 })
    const prediction = model.respond(chat)
    for await (const { content } of prediction) {
      await writer.write(content)
      process.stdout.write(content)
    }
    const { stats } = await prediction
    console.log(
      `\nRedacted ${article.name} successfully with model: ${modelName}. Speed: ${stats.tokensPerSecond ? stats.tokensPerSecond.toString() : 'undefined'}`,
    )
    await writer.end()
  }

  await model.unload()
}

exit(0)
