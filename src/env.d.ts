import i18next from 'i18next'

declare namespace App {
  interface Locals {
    t: typeof i18next.getFixedT
  }
}
