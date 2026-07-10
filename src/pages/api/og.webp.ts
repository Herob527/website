import { test } from '@root/src/og'
import * as takumi from 'takumi-js'
import Sharp from 'sharp'
import type { APIRoute } from 'astro'
import ImageResponse from 'takumi-js/response'

export const GET: APIRoute = async ({ params }) => {
  const toRender = await test()
  const content = await takumi.render(toRender.node, {
    width: 1200,
    height: 630,
  })
  return new ImageResponse(content, {
    format: 'webp',
    height: 630,
    width: 1200,
    stylesheets: toRender.stylesheets,
  })
}
