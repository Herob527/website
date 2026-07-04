// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  site: 'https://herob527.github.io',
  base: import.meta.env.DEV ? '/' : '/website',
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
})
