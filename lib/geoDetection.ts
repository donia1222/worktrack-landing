'use client'

export interface CountryConfig {
  code: string
  language: string
  currency: string
  currencySymbol: string
}

export const COUNTRY_MAPPING: Record<string, CountryConfig> = {
  // Spanish-speaking countries -> EUR
  'ES': { code: 'ES', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'AR': { code: 'AR', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'MX': { code: 'MX', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'CO': { code: 'CO', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'CL': { code: 'CL', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'PE': { code: 'PE', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'VE': { code: 'VE', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'UY': { code: 'UY', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'EC': { code: 'EC', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'BO': { code: 'BO', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'PY': { code: 'PY', language: 'es', currency: 'EUR', currencySymbol: '€' },

  // USA and English-speaking countries -> USD
  'US': { code: 'US', language: 'en', currency: 'USD', currencySymbol: '$' },
  'CA': { code: 'CA', language: 'en', currency: 'USD', currencySymbol: '$' },
  'GB': { code: 'GB', language: 'en', currency: 'USD', currencySymbol: '$' },
  'AU': { code: 'AU', language: 'en', currency: 'USD', currencySymbol: '$' },
  'NZ': { code: 'NZ', language: 'en', currency: 'USD', currencySymbol: '$' },
  'IE': { code: 'IE', language: 'en', currency: 'USD', currencySymbol: '$' },

  // Switzerland -> CHF (regardless of language)
  'CH': { code: 'CH', language: 'de', currency: 'CHF', currencySymbol: 'CHF' },
  
  // Germany/Austria -> EUR (not CHF!)
  'DE': { code: 'DE', language: 'de', currency: 'EUR', currencySymbol: '€' },
  'AT': { code: 'AT', language: 'de', currency: 'EUR', currencySymbol: '€' },

  // European countries -> EUR
  'FR': { code: 'FR', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'IT': { code: 'IT', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'PT': { code: 'PT', language: 'es', currency: 'EUR', currencySymbol: '€' },
  'NL': { code: 'NL', language: 'en', currency: 'EUR', currencySymbol: '€' },
  'BE': { code: 'BE', language: 'en', currency: 'EUR', currencySymbol: '€' },
}

export function getCountryFromNavigator(): string | null {
  if (typeof window === 'undefined') return null
  
  // Try to get country from navigator.language (e.g., "en-US", "de-CH", "es-ES")
  const locale = navigator.language || navigator.languages?.[0]
  if (locale) {
    const countryCode = locale.split('-')[1]?.toUpperCase()
    if (countryCode && COUNTRY_MAPPING[countryCode]) {
      return countryCode
    }
  }
  
  // Try timezone detection as backup
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Common timezone to country mapping
    if (timezone.includes('Zurich') || timezone.includes('Geneva')) return 'CH'
    if (timezone.includes('New_York') || timezone.includes('Los_Angeles') || timezone.includes('Chicago')) return 'US'
    if (timezone.includes('Madrid') || timezone.includes('Barcelona')) return 'ES'
    if (timezone.includes('Berlin') || timezone.includes('Munich')) return 'DE'
    if (timezone.includes('London')) return 'GB'
    if (timezone.includes('Paris')) return 'FR'
    if (timezone.includes('Rome')) return 'IT'
    if (timezone.includes('Mexico_City')) return 'MX'
    if (timezone.includes('Buenos_Aires')) return 'AR'
    if (timezone.includes('Bogota')) return 'CO'
    if (timezone.includes('Santiago')) return 'CL'
  } catch (e) {
    console.log('Timezone detection failed:', e)
  }
  
  return null
}

export function getLanguageFromCountry(countryCode: string | null): string {
  if (!countryCode || !COUNTRY_MAPPING[countryCode]) {
    return 'es' // Default fallback
  }
  
  return COUNTRY_MAPPING[countryCode].language
}

export function detectLanguageAndCountry(): { language: string; country: string | null } {
  const country = getCountryFromNavigator()
  const language = getLanguageFromCountry(country)
  
  console.log(`🌍 Geographic detection: Country=${country}, Language=${language}`)
  
  return { language, country }
}