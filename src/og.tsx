import { fromJsx } from 'takumi-js/helpers/jsx'
import type { BlogPost } from './pages/[...locale]/blog/[slug]/og.png'
import { dateUtils } from './date-utils'

export const ogMarkup = async (post: BlogPost, locale: string) => {
  const date = dateUtils.parse(post.date)
  const data = await fromJsx(
    <div tw="flex flex-col">
      <div tw="bg-blue-500 text-3xl text-white p-4">{post.title}</div>,
      <div tw="bg-blue-500 text-3xl text-white p-4">{post.description}</div>,
      <div tw="bg-blue-500 text-3xl text-white p-4">
        {dateUtils.format(date, locale)}
      </div>
      ,
    </div>,
  )
  return data
}
