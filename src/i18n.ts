import type { GetStaticPathsItem } from 'astro'
import i18next from 'i18next'
import { DEFAULT_LANGUAGE } from './constants'
import { translationLoader } from './i18n/translation-loader'

export const locales = translationLoader.getLocales()

export const initI18n = async () =>
  i18next.init({
    lng: DEFAULT_LANGUAGE,
    resources: translationLoader.loadTranslations(),
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
