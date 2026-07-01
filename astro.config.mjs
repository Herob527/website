// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import UnoCSS from 'unocss/astro'
import preact from '@astrojs/preact'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://herob527.github.io',
  base: '/website',
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [preact(), UnoCSS(), mdx()],
})
