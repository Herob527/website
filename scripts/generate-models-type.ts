import { LMStudioClient } from '@lmstudio/sdk'
import { exit } from 'process'
import { writeFile } from 'fs/promises'
import path from 'path'

const client = new LMStudioClient()

const models = (await client.system.listDownloadedModels())
  .filter((el) => el.type === 'llm')
  .map((m) => m.modelKey)

const outputType = `export type Model = ${models.map((el) => `'${el}'`).join(' | ')}`

await writeFile(path.resolve(import.meta.dirname, './models.ts'), outputType)

exit(0)
