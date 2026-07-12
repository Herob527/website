import { fromJsx } from 'takumi-js/helpers/jsx'
import type { BlogPost } from './pages/[...locale]/blog/[slug]/og.png'
import { dateUtils } from './date-utils'

export const ogMarkup = async (post: BlogPost, locale: string) => {
  const date = dateUtils.parse(post.date)
  const tags = post.tags ?? []

  const data = await fromJsx(
    <div
      tw="flex flex-col w-full h-full p-12 justify-between"
      style={{
        background: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div tw="flex flex-col flex-1 justify-center">
        <h1
          tw="text-gray-900 font-bold leading-tight m-0"
          style={{ fontSize: '64px', letterSpacing: '-0.02em' }}
        >
          {post.title}
        </h1>
        <p
          tw="text-gray-500 mt-6 m-0 leading-relaxed"
          style={{ fontSize: '28px', maxWidth: '900px' }}
        >
          {post.description}
        </p>
      </div>

      <div tw="flex items-center justify-between">
        <div tw="flex items-center gap-3">
          {tags.map((tag) => (
            <span
              tw="bg-gray-100 text-gray-600 rounded-full px-4 py-2 font-medium"
              style={{ fontSize: '20px' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span tw="text-gray-400" style={{ fontSize: '22px' }}>
          {dateUtils.format(date, locale)}
        </span>
      </div>
    </div>,
  )
  return data
}
