import { LMStudioClient } from '@lmstudio/sdk'
import { exit } from 'process'
import type { Model } from './models'

const client = new LMStudioClient()

const modelName: Model = 'microsoft/phi-4-reasoning-plus'

const model = await client.llm.model(modelName)

const result = await model.respond("Testing. Respond with 'yes' only.", {
  maxTokens: 10,
})

await model.unload()

console.info(result.content)

exit(0)
