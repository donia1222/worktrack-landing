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
  // Ingles, no español. Esto es lo que se pinta en el servidor y lo que ve
  // todo el mundo durante el primer instante, antes de que el navegador diga
  // de donde viene. La publicidad va en ingles y a paises de habla inglesa,
  // asi que un destello de español al aterrizar es tirar el clic que acabamos
  // de pagar. Si algun dia el grueso del trafico vuelve a ser español, esto
  // se cambia aqui y en el fallback de abajo.
  if (typeof window === 'undefined') return 'en'

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
  
  // Quien no habla ninguno de los tres —un holandes, un frances, un italiano—
  // entendia menos español que ingles. Hasta que la pagina este traducida a
  // mas idiomas, el ingles es la peor traduccion que menos gente pierde.
  return 'en'
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