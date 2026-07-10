import type { GetStaticPathsItem } from 'astro'
import i18next from 'i18next'
import { DEFAULT_LANGUAGE } from './constants'

const translations = import.meta.glob('./locales/*.yaml', {
  eager: true,
  import: 'default',
})

const transformed = Object.fromEntries(
  Object.entries(translations).map(([key, val]) => {
    const locale = /\/(.{2,4})\.yaml/.exec(key)?.[1]
    if (!locale) throw new Error('Invalid locale')
    return [locale, { translation: val }]
  }),
) as Record<string, Record<string, string>>

export const locales = Object.keys(transformed)

export const initI18n = async () =>
  i18next.init({
    lng: DEFAULT_LANGUAGE,
    resources: transformed,
  })

export const geti18nStaticPaths = () => {
  const items = locales.map(
    (el) =>
      ({
        params: {
          locale: el,
        },
      }) as const,
  )
  return [
    ...items,
    {
      params: {
        locale: undefined,
      } as const,
    },
  ] satisfies GetStaticPathsItem[]
}
