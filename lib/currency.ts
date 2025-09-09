'use client'

export interface CurrencyConfig {
  code: string
  symbol: string
  rate: number // Exchange rate from EUR base
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  es: {
    code: 'EUR',
    symbol: '€',
    rate: 1.0, // Base currency
  },
  en: {
    code: 'USD', 
    symbol: '$',
    rate: 1.1, // 1 EUR = 1.1 USD (approximate)
  },
  de: {
    code: 'CHF',
    symbol: 'CHF',
    rate: 0.95, // 1 EUR = 0.95 CHF (approximate)
  }
}

export const BASE_PRICES_EUR = {
  '3months': 6,
  '6months': 10,
  '1year': 18
}

export function getCurrencyForLanguage(language: string): CurrencyConfig {
  return CURRENCIES[language] || CURRENCIES['es'] // Default to EUR
}

export function convertPrice(priceEur: number, targetCurrency: CurrencyConfig): number {
  const converted = priceEur * targetCurrency.rate
  // Round to reasonable price points
  if (targetCurrency.code === 'USD') {
    return Math.round(converted)
  } else if (targetCurrency.code === 'CHF') {
    return Math.round(converted * 2) / 2 // Round to .5
  }
  return Math.round(converted)
}

export function formatPrice(price: number, currency: CurrencyConfig): string {
  if (currency.code === 'CHF') {
    return `${price} ${currency.symbol}`
  }
  return `${currency.symbol}${price}`
}

export function getPricesForLanguage(language: string) {
  const currency = getCurrencyForLanguage(language)
  
  return {
    currency,
    prices: {
      '3months': {
        amount: convertPrice(BASE_PRICES_EUR['3months'], currency),
        formatted: formatPrice(convertPrice(BASE_PRICES_EUR['3months'], currency), currency)
      },
      '6months': {
        amount: convertPrice(BASE_PRICES_EUR['6months'], currency),
        formatted: formatPrice(convertPrice(BASE_PRICES_EUR['6months'], currency), currency)
      },
      '1year': {
        amount: convertPrice(BASE_PRICES_EUR['1year'], currency),
        formatted: formatPrice(convertPrice(BASE_PRICES_EUR['1year'], currency), currency)
      }
    }
  }
}