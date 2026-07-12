import { fromJsx } from 'takumi-js/helpers/jsx'
import type { BlogPost } from './pages/[...locale]/blog/[slug]/og.png'

export const ogMarkup = async (post: BlogPost, minutesRead: number) => {
  const tags = post.tags ?? []

  const data = await fromJsx(
    <div
      tw="flex w-full h-full"
      style={{
        background: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Accent sidebar */}
      <div
        tw="flex flex-col justify-between h-full"
        style={{
          width: '24px',
          background: 'linear-gradient(180deg, #0A66C2 0%, #0044cc 100%)',
        }}
      />

      <div tw="flex flex-col flex-1 h-full p-16 justify-between">
        {/* Brand row */}
        <div tw="flex items-center justify-between"></div>

        {/* Main content */}
        <div tw="flex flex-col" style={{ maxWidth: '880px' }}>
          <h1
            tw="text-gray-900 font-bold leading-tight m-0"
            style={{
              fontSize: '58px',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
          <p
            tw="text-gray-500 mt-4 leading-relaxed"
            style={{
              fontSize: '26px',
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </p>
        </div>

        {/* Tags row */}
        <div tw="flex items-center gap-3">
          {tags.map((tag) => (
            <span
              tw="flex items-center rounded-full px-4 justify-center flex-row py-2 font-medium"
              style={{
                fontSize: '19px',
                background: '#EAF3FC',
                color: '#0A66C2',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>,
  )
  return data
}
