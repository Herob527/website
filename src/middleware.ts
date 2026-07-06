import { defineMiddleware } from 'astro:middleware'
import i18next from 'i18next'
import { initI18n } from './i18n'
import { DEFAULT_LANGUAGE } from './constants'

await initI18n()

const onRequest = defineMiddleware(async (context, next) => {
  const { currentLocale } = context

  context.locals.t = i18next.getFixedT(currentLocale ?? DEFAULT_LANGUAGE)
  return next()
})

export { onRequest }
