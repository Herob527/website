import { ogMarkup } from '@root/src/og'
import type { APIRoute } from 'astro'
import ImageResponse, { type ImageResponseOptions } from 'takumi-js/response'
import { locales } from '@root/src/i18n'
import { getCollection } from 'astro:content'
import { googleFonts } from 'takumi-js/helpers'

import getReadingTime from 'reading-time'

const OUTPUT_TYPE: ImageResponseOptions['format'] = 'png'

export type BlogPost = Awaited<
  ReturnType<typeof getCollection<'blog'>>
>[number]['data']

const DIMENSIONS = {
  width: 1200,
  height: 630,
}

export const GET: APIRoute = async ({ props }) => {
  const { post, minutesRead } = props as Props
  const toRender = await ogMarkup(post, minutesRead)

  const image = await new ImageResponse(toRender.node, {
    format: OUTPUT_TYPE,
    stylesheets: toRender.stylesheets,
    ...DIMENSIONS,
    fonts: googleFonts(['Montserrat']),
  }).arrayBuffer()

  return new Response(image, {
    headers: {
      'Content-Type': `image/${OUTPUT_TYPE}`,
      'Cache-Control': 'public, max-age=1, immutable',
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
            if (!el.body) throw Error('No body')
            const { minutes } = getReadingTime(el.body)
            return {
              slug,
              locale: locale,
              postLocale,
              postData: el.data,
              minutesRead: minutes,
            }
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
        minutesRead: entry.minutesRead,
      },
    }))
}

interface Props {
  post: BlogPost
  minutesRead: number
}
