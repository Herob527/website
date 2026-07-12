// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { DEFAULT_LANGUAGE } from './src/constants'

// https://astro.build/config
export default defineConfig({
  site: 'https://herob527.github.io',
  base: import.meta.env.DEV ? '/' : '/website',
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: [DEFAULT_LANGUAGE, 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
