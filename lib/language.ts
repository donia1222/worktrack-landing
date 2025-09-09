'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { detectLanguageAndCountry } from './geoDetection'

export type Language = 'es' | 'en' | 'de'

export const languages = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch'
} as const

// Detect browser language with geographic detection
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'es'
  
  // First try geographic detection
  const { language } = detectLanguageAndCountry()
  
  // Validate the detected language
  if (language === 'es' || language === 'en' || language === 'de') {
    return language
  }
  
  // Fallback to old browser language detection
  const browserLang = window.navigator.language.toLowerCase()
  
  if (browserLang.startsWith('es')) return 'es'
  if (browserLang.startsWith('en')) return 'en'  
  if (browserLang.startsWith('de')) return 'de'
  
  // Default fallback
  return 'es'
}

// Language Context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}