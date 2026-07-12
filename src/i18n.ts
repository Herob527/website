import type { GetStaticPathsItem } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import i18next, { type Resource } from 'i18next'
import { DEFAULT_LANGUAGE } from './constants'

const localesDir = path.join(process.cwd(), 'src', 'locales')

const loadTranslations = (): Resource => {
  const files = fs.readdirSync(localesDir).filter((f) => f.endsWith('.yaml'))
  return Object.fromEntries(
    files.map((file) => {
      const locale = file.replace('.yaml', '')
      const content = fs.readFileSync(path.join(localesDir, file), 'utf-8')
      return [
        locale,
        {
          translation: yaml.parse(content) as Record<string, unknown>,
        },
      ]
    }),
  )
}

export const locales = fs
  .readdirSync(localesDir)
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => f.replace('.yaml', ''))

export const initI18n = async () =>
  i18next.init({
    lng: DEFAULT_LANGUAGE,
    resources: loadTranslations(),
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
