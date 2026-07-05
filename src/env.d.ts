import i18next from 'i18next'

declare global {
  namespace App {
    interface Locals {
      t: ReturnType<typeof i18next.getFixedT>
    }
  }
}
