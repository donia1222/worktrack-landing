'use client'

export interface CurrencyInfo {
  currency: string
  symbol: string
  prices: {
    '3months': string
    '6months': string 
    '1year': string
  }
}

export const CURRENCY_BY_COUNTRY: Record<string, CurrencyInfo> = {
  // Switzerland -> CHF
  'CH': {
    currency: 'CHF',
    symbol: 'CHF',
    prices: {
      '3months': '5.69 CHF',
      '6months': '9.49 CHF',
      '1year': '14.24 CHF'
    }
  },
  
  // USA -> USD
  'US': {
    currency: 'USD',
    symbol: '$',
    prices: {
      '3months': '$6.59',
      '6months': '$10.99',
      '1year': '$16.49'
    }
  },
  
  // All other countries -> EUR (default)
  'DEFAULT': {
    currency: 'EUR',
    symbol: '€',
    prices: {
      '3months': '€5.99',
      '6months': '€9.99',
      '1year': '€14.99'
    }
  }
}

export function detectCountryFromBrowser(): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    // Method 1: Navigator language (most reliable)
    const locale = navigator.language || navigator.languages?.[0] || ''
    console.log('🌍 Browser locale:', locale)
    
    if (locale) {
      const countryCode = locale.split('-')[1]?.toUpperCase()
      console.log('🏳️ Detected country from locale:', countryCode)
      if (countryCode) return countryCode
    }
    
    // Method 2: Timezone detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log('🕐 Browser timezone:', timezone)
    
    // Swiss timezones
    if (timezone.includes('Zurich') || timezone.includes('Geneva') || timezone.includes('Bern')) {
      console.log('🇨🇭 Switzerland detected via timezone')
      return 'CH'
    }
    
    // USA timezones
    if (timezone.includes('New_York') || timezone.includes('Los_Angeles') || 
        timezone.includes('Chicago') || timezone.includes('Denver') ||
        timezone.includes('Phoenix') || timezone.includes('Alaska') ||
        timezone.includes('Hawaii')) {
      console.log('🇺🇸 USA detected via timezone')
      return 'US'
    }
    
    // Other common timezones
    if (timezone.includes('Berlin') || timezone.includes('Munich')) return 'DE'
    if (timezone.includes('Madrid') || timezone.includes('Barcelona')) return 'ES'
    if (timezone.includes('Paris')) return 'FR'
    if (timezone.includes('London')) return 'GB'
    if (timezone.includes('Rome') || timezone.includes('Milan')) return 'IT'
    
  } catch (error) {
    console.log('❌ Country detection failed:', error)
  }
  
  return null
}

export function getCurrencyForCountry(countryCode: string | null): CurrencyInfo {
  console.log('💰 Getting currency for country:', countryCode)
  
  if (countryCode === 'CH') {
    console.log('💰 Using CHF for Switzerland')
    return CURRENCY_BY_COUNTRY['CH']
  }
  
  if (countryCode === 'US') {
    console.log('💰 Using USD for USA')
    return CURRENCY_BY_COUNTRY['US']
  }
  
  console.log('💰 Using EUR as default')
  return CURRENCY_BY_COUNTRY['DEFAULT']
}

export function getAutoDetectedCurrency(): CurrencyInfo {
  const country = detectCountryFromBrowser()
  const currency = getCurrencyForCountry(country)
  
  console.log(`🎯 Final detection: Country=${country}, Currency=${currency.currency}`)
  return currency
}