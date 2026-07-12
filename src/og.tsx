import { fromJsx } from 'takumi-js/helpers/jsx'

export const test = async () => {
  const data = await fromJsx(
    <div tw="bg-blue-500 text-3xl text-white p-4">Hello World</div>,
  )
  return data
}
