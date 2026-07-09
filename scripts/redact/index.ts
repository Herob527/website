import { LLM, LMStudioClient, type ChatLike } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'
import { Glob, YAML } from 'bun'
import { mdxToJs } from 'satteri'
import { z } from 'zod'
import redactor from './prompts/redactor.md?raw'
import fixer from './prompts/mdxFixer.md?raw'

const client = new LMStudioClient()

const models: Model[] = [
  'zai-org/glm-4.7-flash',
  'openai/gpt-oss-20b',
  'google/gemma-4-26b-a4b-qat',
]

// const fixingArticleModel: Model = 'qwen/qwen3.5-9b'

const redactorPrompt = redactor

const fixMdxPrompt = fixer

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

const log = (message: unknown) => {
  console.info(`(${createTimestamp()}):`, message)
}

const validateMdx = (mdx: string) => {
  try {
    mdxToJs(mdx)
    return { isValid: true, error: undefined } as const
  } catch (e) {
    log('Error while validating mdx.')
    if (e instanceof Error) {
      return { isValid: false, error: e.message } as const
    }
    return { isValid: false, error: 'Unknown error' } as const
  }
}

const fixupMdx = async (model: LLM, mdx: string, error: string) => {
  let latestError: string | null = null
  const chat = () =>
    [
      {
        role: 'system',
        content: fixMdxPrompt,
      },
      {
        role: 'user',
        content: `Can you fix this mdx string? 
>>>
${mdx}
>>>

I get error: 

>>>
${latestError ?? error}
>>>
`,
      },
    ] satisfies ChatLike
  let index = 0

  const schema = z.object({ fixed: z.string() })
  // It's assumed it'll eventually fix mdx... hopefully
  while (true) {
    log(`Fixing mdx, iteration ${index.toString()}`)
    const data = model.respond(chat(), {
      structured: { type: 'json', jsonSchema: schema.toJSONSchema() },
    })

    for await (const { content } of data) {
      process.stdout.write(content)
    }
    const { nonReasoningContent, content } = await data
    const { error } = validateMdx(nonReasoningContent)

    if (error) {
      latestError = error
      index += 1
      continue
    }
    const parsed = schema.parse(JSON.parse(content))

    log(`Fixing mdx finished`)
    return parsed.fixed
  }
}

let loadedModel: LLM | null = null

for (const { inputPath, outputPath, model, parent } of toGenerate) {
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
      content: redactorPrompt,
    },
    {
      role: 'user',
      content: article,
    },
  ] satisfies ChatLike

  log(
    `Began generating redaction by '${model}' of '${parent}' to '${outputPath}'`,
  )

  const frontmatterWithAI = {
    parentId: parent,
    written_by: model,
  } satisfies AiBlog

  let { nonReasoningContent } = await redactArticle(loadedModel, chat)
  const { error } = validateMdx(nonReasoningContent)
  if (error) {
    nonReasoningContent = await fixupMdx(
      loadedModel,
      nonReasoningContent,
      error,
    )
  }

  const output = Bun.file(outputPath)
  const template = `
---
${YAML.stringify(frontmatterWithAI, null, 2)}
---
${nonReasoningContent}
`
  await output.write(template)

  log(
    `Finished generating redaction by '${model}' of '${parent}' to '${outputPath}'`,
  )

  await loadedModel.unload()
  loadedModel = null

  log(`Unloaded ${model}`)
}

exit(0)
