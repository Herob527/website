import { fromJsx } from 'takumi-js/helpers/jsx'
import type { BlogPost } from './pages/[...locale]/blog/[slug]/og.png'
import { dateUtils } from './date-utils'

export const ogMarkup = async (post: BlogPost, locale: string) => {
  const date = dateUtils.parse(post.date)
  const data = await fromJsx(
    <div
      tw="flex flex-col w-full h-full p-12 justify-between"
      style={{
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div tw="flex flex-col flex-1 justify-center">
        <h1
          tw="text-white font-bold leading-tight m-0"
          style={{ fontSize: '64px', letterSpacing: '-0.02em' }}
        >
          {post.title}
        </h1>
        <p
          tw="text-gray-400 mt-6 m-0 leading-relaxed"
          style={{ fontSize: '28px', maxWidth: '900px' }}
        >
          {post.description}
        </p>
      </div>

      <div tw="flex items-center justify-between">
        <span tw="text-gray-500" style={{ fontSize: '22px' }}>
          {dateUtils.format(date, locale)}
        </span>
      </div>
    </div>,
  )
  return data
}
