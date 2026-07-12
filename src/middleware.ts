import { defineMiddleware } from 'astro:middleware'
import i18next from 'i18next'
import { initI18n } from './i18n'
import { DEFAULT_LANGUAGE } from './constants'

const onRequest = defineMiddleware(async (context, next) => {
  const { currentLocale } = context

  await initI18n()
  context.locals.t = i18next.getFixedT(currentLocale ?? DEFAULT_LANGUAGE)
  return next()
})

export { onRequest }
