'use client'

export interface CountryDetection {
  country: string
  currency: string
  prices: {
    '3months': string
    '6months': string
    '1year': string
  }
}

const CURRENCY_MAP: Record<string, CountryDetection> = {
  'CH': {
    country: 'Switzerland',
    currency: 'CHF',
    prices: {
      '3months': '5.69 CHF',
      '6months': '9.49 CHF', 
      '1year': '14.24 CHF'
    }
  },
  'US': {
    country: 'United States',
    currency: 'USD',
    prices: {
      '3months': '$6.59',
      '6months': '$10.99',
      '1year': '$16.49'
    }
  },
  'DEFAULT': {
    country: 'Default',
    currency: 'EUR',
    prices: {
      '3months': '€5.99',
      '6months': '€9.99',
      '1year': '€14.99'
    }
  }
}

export async function detectCountryByIP(): Promise<CountryDetection> {
  try {
    console.log('🌍 Starting IP geolocation detection...')
    
    // Using multiple free APIs as fallbacks
    const apis = [
      'https://ipapi.co/country_code/',
      'https://api.country.is/',
      'https://ipinfo.io/country'
    ]
    
    for (const api of apis) {
      try {
        console.log(`🔍 Trying API: ${api}`)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        
        const response = await fetch(api, {
          method: 'GET',
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          let countryCode = ''
          
          if (api.includes('country.is')) {
            const data = await response.json()
            countryCode = data.country
          } else {
            countryCode = (await response.text()).trim().toUpperCase()
          }
          
          console.log(`✅ IP Detection successful: ${countryCode}`)
          
          if (countryCode === 'CH') {
            console.log('🇨🇭 Switzerland detected - Using CHF')
            return CURRENCY_MAP['CH']
          } else if (countryCode === 'US') {
            console.log('🇺🇸 USA detected - Using USD')
            return CURRENCY_MAP['US']
          } else {
            console.log(`🌍 Country ${countryCode} - Using EUR as default`)
            return CURRENCY_MAP['DEFAULT']
          }
        }
      } catch (apiError) {
        console.log(`❌ API ${api} failed:`, apiError)
        continue
      }
    }
    
    throw new Error('All IP geolocation APIs failed')
    
  } catch (error) {
    console.log('❌ IP geolocation failed, using EUR default:', error)
    return CURRENCY_MAP['DEFAULT']
  }
}

// Cache para evitar múltiples llamadas
let cachedResult: CountryDetection | null = null
let cachePromise: Promise<CountryDetection> | null = null

export function getCachedCountryDetection(): Promise<CountryDetection> {
  if (cachedResult) {
    console.log('💾 Using cached country detection')
    return Promise.resolve(cachedResult)
  }
  
  if (cachePromise) {
    console.log('⏳ Using pending country detection')
    return cachePromise
  }
  
  console.log('🆕 Starting new country detection')
  cachePromise = detectCountryByIP().then(result => {
    cachedResult = result
    cachePromise = null
    return result
  })
  
  return cachePromise
}