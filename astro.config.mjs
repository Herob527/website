// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import UnoCSS from 'unocss/astro'
import preact from '@astrojs/preact'

/** @param {import('mdast').Root} tree */
const processLinks = (tree) => {
  for (const node of tree.children ?? []) {
    if (node.type === 'link' && node.url.startsWith('http')) {
      node.data = node.data || {}
      // @ts-expect-error — hProperties is set by remark-rehype
      node.data.hProperties = node.data.hProperties || {}

      // @ts-expect-error — hProperties is set by remark-rehype
      node.data.hProperties.target = '_blank'

      // @ts-expect-error — hProperties is set by remark-rehype
      node.data.hProperties.rel = 'noopener noreferrer'
    }
  }
}

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  markdown: {
    processor: unified({
      remarkPlugins: [() => processLinks],
    }),
  },
  integrations: [
    preact(),
    UnoCSS({
      mode: 'dist-chunk',
    }),
  ],
})
