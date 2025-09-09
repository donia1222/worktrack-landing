'use client'

import { useState, useEffect } from 'react'
import { getCachedCountryDetection, CountryDetection } from '@/lib/ipGeolocation'

export function useCurrency() {
  const [currency, setCurrency] = useState<CountryDetection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function detectCurrency() {
      try {
        console.log('🚀 Starting real IP-based currency detection...')
        const result = await getCachedCountryDetection()
        setCurrency(result)
        console.log('✅ Currency detection complete:', result)
      } catch (error) {
        console.error('❌ Currency detection error:', error)
        // Fallback to EUR
        setCurrency({
          country: 'Default',
          currency: 'EUR',
          prices: {
            '3months': '€5.99',
            '6months': '€9.99',
            '1year': '€14.99'
          }
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    detectCurrency()
  }, [])
  
  return { currency, isLoading }
}