import { defineConfig, transformerAttributifyJsx } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import { presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind4(), presetIcons()],
  transformers: [transformerAttributifyJsx()],
})
