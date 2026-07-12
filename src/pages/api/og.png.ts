import { ogMarkup } from '@root/src/og'
import type { APIRoute } from 'astro'
import ImageResponse, { type ImageResponseOptions } from 'takumi-js/response'

const OUTPUT_TYPE: ImageResponseOptions['format'] = 'png'

const DIMENSIONS = {
  width: 1200,
  height: 630,
}

export const GET: APIRoute = async ({ params }) => {
  const toRender = await ogMarkup()

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
