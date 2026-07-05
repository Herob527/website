import { defineMiddleware } from 'astro:middleware'
import i18next from 'i18next'

const translations = import.meta.glob('./locales/*.yaml', {
  eager: true,
  import: 'default',
})

const transformed = Object.fromEntries(
  Object.entries(translations).map(([key, val]) => {
    const locale = /\/(.{2,4})\.yaml/.exec(key)?.at(1)
    if (!locale) throw new Error('Invalid locale')
    return [locale, { translation: val }]
  }),
) as Record<string, Record<string, string>>

await i18next.init({
  lng: 'pl',
  resources: transformed,
})

const onRequest = defineMiddleware(async (context, next) => {
  const { currentLocale } = context

  context.locals.t = i18next.getFixedT(currentLocale ?? 'pl')
  return next()
})

export { onRequest }
