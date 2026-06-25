import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginAstro from 'eslint-plugin-astro'
import unocss from '@unocss/eslint-plugin'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  ...pluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  unocss.configs.flat,
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
]
