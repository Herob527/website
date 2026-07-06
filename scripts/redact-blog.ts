import { LMStudioClient } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'

const client = new LMStudioClient()

const models: Model[] = [
  'microsoft/phi-4-reasoning-plus',
  'zai-org/glm-4.7-flash',
  'google/gemma-4-26b-a4b-qat',
  'openai/gpt-oss-20b',
]

for (const modelName of models) {
  const model = await client.llm.model(modelName, {
    config: {
      contextLength: 512,
    },
  })

  const result = await model.respond(
    "Testing. Respond with 'yes' only without thinking.",
    {
      maxTokens: 10,
    },
  )

  await model.unload()

  console.info({ modelName, content: result.content, info: result.modelInfo })
}

exit(0)
