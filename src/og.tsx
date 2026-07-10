import { fromJsx } from 'takumi-js/helpers/jsx'

export const test = () =>
  fromJsx(<div tw="bg-blue-500 text-white p-4">Hello World</div>)
