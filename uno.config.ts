import { defineConfig } from 'unocss'

import presetAttributify, {
  extractorAttributify,
} from '@unocss/preset-attributify'
import { presetIcons, presetWind4 } from 'unocss'
export default defineConfig({
  presets: [presetAttributify(), presetWind4(), presetIcons()],
  extractors: [extractorAttributify()],
})
