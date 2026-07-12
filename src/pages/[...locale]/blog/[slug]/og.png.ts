import { ogMarkup } from '@root/src/og'
import type { APIRoute } from 'astro'
import ImageResponse, { type ImageResponseOptions } from 'takumi-js/response'

import { locales } from '@root/src/i18n'
import { getCollection } from 'astro:content'

const OUTPUT_TYPE: ImageResponseOptions['format'] = 'png'

export type BlogPost = Awaited<
  ReturnType<typeof getCollection<'blog'>>
>[number]['data']

const DIMENSIONS = {
  width: 1200,
  height: 630,
}

export const GET: APIRoute = async ({ params, props }) => {
  const { post } = props as Props
  const toRender = await ogMarkup(post)

  const image = await new ImageResponse(toRender.node, {
    format: OUTPUT_TYPE,
    stylesheets: toRender.stylesheets,
    ...DIMENSIONS,
  }).arrayBuffer()

  return new Response(image, {
    headers: {
      'Content-Type': `image/${OUTPUT_TYPE}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

export async function getStaticPaths() {
  const collections = (
    await Promise.all(
      [...locales, undefined].flatMap(async (locale) => {
        const data = await getCollection('blog')
        return data
          .filter((el) => {
            const postLocale = el.id.split('/')[0]
            return locales.includes(postLocale)
          })
          .map((el) => {
            const parts = el.id.split('/')
            const slug = parts.length > 1 ? parts.slice(1).join('/') : el.id
            const postLocale = parts[0]
            return { slug, locale: locale, postLocale, postData: el.data }
          })
      }),
    )
  ).reduce((acc, cur) => [...acc, ...cur].flat(), [])

  return collections
    .filter(
      (entry) =>
        entry.locale === undefined || entry.locale === entry.postLocale,
    )
    .map((entry) => ({
      params: {
        slug: entry.slug,
        locale: entry.locale,
      },
      props: {
        post: entry.postData,
      },
    }))
}

interface Props {
  post: BlogPost
}
