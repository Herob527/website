import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import type { Resource } from 'i18next'

const LOCALE_FILE_EXT = '.yaml'

export class TranslationLoader {
  private readonly localesDir: string

  constructor() {
    this.localesDir = path.join(process.cwd(), 'src', 'locales')
  }

  getLocales(): string[] {
    return this.getTranslationFiles().map((f) => f.replace(LOCALE_FILE_EXT, ''))
  }

  loadTranslations(): Resource {
    return Object.fromEntries(
      this.getTranslationFiles().map((file) => {
        const locale = file.replace(LOCALE_FILE_EXT, '')
        const content = fs.readFileSync(
          path.join(this.localesDir, file),
          'utf-8',
        )
        return [locale, { translation: this.parseTranslationFile(content) }]
      }),
    )
  }

  private getTranslationFiles(): string[] {
    return fs
      .readdirSync(this.localesDir)
      .filter((f) => f.endsWith(LOCALE_FILE_EXT))
  }
  private parseTranslationFile(content: string): Record<string, unknown> {
    return yaml.parse(content) as Record<string, unknown>
  }
}

export const translationLoader = new TranslationLoader()
