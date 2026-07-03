// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import nanostoresI18n from 'astro-nanostores-i18n'
import translations from './src/utils/i18n'

// https://astro.build/config
export default defineConfig({
  site: 'https://herob527.github.io',
  base: '/website',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
  },
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [
    mdx(),
    sitemap(),
    nanostoresI18n({
      /**
       * Predefined translations to initialize the i18n store with.
       * This should be an object where keys are locale codes and values are
       * translation components in JSON format.
       */
      translations,
      /**
       * Whether to automatically add middleware for locale detection.
       * If enabled, the middleware will set the current locale based on the URL pathname.
       * If disabled, you need to manage locale setting manually in your components or add your own middleware.
       *
       * @default false
       */
      addMiddleware: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
