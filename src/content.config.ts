import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const lifeStages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life-stages' }),
  schema: z.object({
    startDate: z.string(),
    endDate: z.string(),
    label: z.string(),
    color: z.string(),
    order: z.number(),
    parent: z.string().optional(),
  }),
})

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    written_by: z.string(),
  }),
})

export const collections = { lifeStages, blog }
