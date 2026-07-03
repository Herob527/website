import yaml from 'yaml'

const translations = Object.fromEntries(
  Object.entries(
    import.meta.glob('../locales/*.yaml', {
      eager: true,
      import: 'default',
      query: '?raw',
    }),
  ).map(([key, value]) => {
    const processedKey = /\/(.{2,5})\.yaml$/g.exec(key)
    if (!processedKey) {
      throw new Error(`Invalid key: ${key}`)
    }
    return [processedKey[1], yaml.parse(value)]
  }),
)

export default translations
