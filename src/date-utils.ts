class DateUtils {
  parse(dateString: string): Temporal.PlainDate {
    return Temporal.PlainDate.from(dateString)
  }

  compare(a: Temporal.PlainDate, b: Temporal.PlainDate): number {
    return Temporal.PlainDate.compare(a, b)
  }

  format(
    date: Temporal.PlainDate,
    locale: string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Intl.DateTimeFormat(locale, options ?? defaultOptions).format(
      this.convertToDate(date),
    )
  }

  private convertToDate(date: Temporal.PlainDate): Date {
    return new Date(date.year, date.month - 1, date.day)
  }
}

export const dateUtils = new DateUtils()
