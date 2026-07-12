import { fromJsx } from 'takumi-js/helpers/jsx'
import type { BlogPost } from './pages/[...locale]/blog/[slug]/og.png'

export const ogMarkup = async (post: BlogPost) => {
  const data = await fromJsx(
    <div tw="bg-blue-500 text-3xl text-white p-4">{post.title}</div>,
  )
  return data
}
