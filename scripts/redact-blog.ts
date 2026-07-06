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
    }
  }),
)

for (const modelName of models) {
  const model = await client.llm.model(modelName)

  for (const article of articles.filter(
    (article) => article.frontmatter.written_by === 'human',
  )) {
    const chat = [
      {
        role: 'system',
        content:
          "You are an experienced technical blog writer that has year of experience and praises for writing to people with no experience with given technology. Your task is to redact given post so it'll be easier to read by non-technical people. Mind it should not include new information, just be based on provided article. It's to redact, reword and improve wording and formatting of mdx-based article. You should output only direct text so it can be saved directly into file. Create only content to be saved without notes or anything like that",
      },
      {
        role: 'user',
        content: article.content,
      },
    ] satisfies ChatLike

    const output = Bun.file(
      `generated/${article.name.replace('.mdx', '.modelName')}.mdx`,
    )
    await output.write('')
    const writer = output.writer()
    const prediction = model.respond(chat)
    for await (const { content } of prediction) {
      await writer.write(content)
    }
    const { stats } = await prediction
    console.log(
      `Redacted ${article.name} successfully with model: ${modelName}. Speed: ${stats.tokensPerSecond ? stats.tokensPerSecond.toString() : 'undefined'}`,
    )
    await writer.end()
  }

  await model.unload()
}

exit(0)
