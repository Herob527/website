import { defineMiddleware } from 'astro:middleware'
import i18next from 'i18next'
import { initI18n } from './i18n'

await initI18n()

const onRequest = defineMiddleware(async (context, next) => {
  const { currentLocale } = context

  context.locals.t = i18next.getFixedT(currentLocale ?? 'pl')
  return next()
})

export { onRequest }
