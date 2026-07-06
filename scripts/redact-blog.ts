import { LMStudioClient } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'
import { Glob } from 'bun'

const client = new LMStudioClient()

const models: Model[] = [
  'microsoft/phi-4-reasoning-plus',
  'zai-org/glm-4.7-flash',
  'google/gemma-4-26b-a4b-qat',
  'openai/gpt-oss-20b',
]

const blogGlob = new Glob('src/content/blog/**/*.{md,mdx}')
const blogCollections = await Array.fromAsync(blogGlob.scan())
console.log(blogCollections)

// const blogCollections = import.meta.glob('../src/content/blog/**/*.md', {
//   import: 'default',
//   query: '?raw',
//   eager: true,
// })

// for (const modelName of models) {
//   const model = await client.llm.model(modelName, {
//     config: {
//       contextLength: 512,
//     },
//   })
//
//   const result = await model.respond(
//     "Testing. Respond with 'yes' only without thinking.",
//     {
//       maxTokens: 10,
//     },
//   )
//
//   await model.unload()
//
//   console.info({ modelName, content: result.content, info: result.modelInfo })
// }
//
exit(0)
