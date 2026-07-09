import { describe, expect, test } from 'bun:test'
import { dateUtils } from './date-utils'

describe('DateUtils', () => {
  describe('parse', () => {
    test('parses ISO date string', () => {
      const date = dateUtils.parse('2024-03-15')
      expect(date.year).toBe(2024)
      expect(date.month).toBe(3)
      expect(date.day).toBe(15)
    })

    test('parses date with leading zeros', () => {
      const date = dateUtils.parse('2024-01-05')
      expect(date.year).toBe(2024)
      expect(date.month).toBe(1)
      expect(date.day).toBe(5)
    })

    test('parses leap year date', () => {
      const date = dateUtils.parse('2024-02-29')
      expect(date.year).toBe(2024)
      expect(date.month).toBe(2)
      expect(date.day).toBe(29)
    })

    test('throws on invalid date', () => {
      expect(() => dateUtils.parse('invalid')).toThrow()
    })
  })

  describe('compare', () => {
    test('returns negative when a < b', () => {
      const a = dateUtils.parse('2024-01-01')
      const b = dateUtils.parse('2024-12-31')
      expect(dateUtils.compare(a, b)).toBeLessThan(0)
    })

    test('returns positive when a > b', () => {
      const a = dateUtils.parse('2024-12-31')
      const b = dateUtils.parse('2024-01-01')
      expect(dateUtils.compare(a, b)).toBeGreaterThan(0)
    })

    test('returns 0 when equal', () => {
      const a = dateUtils.parse('2024-06-15')
      const b = dateUtils.parse('2024-06-15')
      expect(dateUtils.compare(a, b)).toBe(0)
    })

    test('sorts array of dates ascending', () => {
      const dates = [
        dateUtils.parse('2024-03-15'),
        dateUtils.parse('2024-01-01'),
        dateUtils.parse('2024-12-31'),
      ]
      const sorted = dates.sort(dateUtils.compare)
      expect(sorted[0].month).toBe(1)
      expect(sorted[1].month).toBe(3)
      expect(sorted[2].month).toBe(12)
    })
  })

  describe('format', () => {
    test('formats date in English', () => {
      const date = dateUtils.parse('2024-03-15')
      const result = dateUtils.format(date, 'en')
      expect(result).toBe('March 15, 2024')
    })

    test('formats date in Polish', () => {
      const date = dateUtils.parse('2024-03-15')
      const result = dateUtils.format(date, 'pl')
      expect(result).toBe('15 marca 2024')
    })

    test('formats date with custom options', () => {
      const date = dateUtils.parse('2024-03-15')
      const result = dateUtils.format(date, 'en', {
        year: 'numeric',
        month: 'short',
      })
      expect(result).toBe('Mar 2024')
    })

    test('formats date with year and month only', () => {
      const date = dateUtils.parse('2024-03-15')
      const result = dateUtils.format(date, 'en', {
        year: 'numeric',
        month: 'long',
      })
      expect(result).toBe('March 2024')
    })
  })
})
