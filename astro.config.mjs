// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import UnoCSS from 'unocss/astro'

import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [
    preact(),
    UnoCSS({
      injectReset: true,
    }),
  ],
})
