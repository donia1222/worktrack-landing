'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { detectLanguageAndCountry } from './geoDetection'

export type Language = 'es' | 'en' | 'de' | 'fr' | 'it' | 'pt' | 'nl' | 'ja'

/** El nombre de cada idioma, escrito en ese idioma: nadie busca «espagnol»
 *  en una lista, busca «Español». */
export const languages = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ja: '日本語',
} as const

/** La bandera de cada uno, para la lista. */
export const languageFlags: Record<Language, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  de: '🇩🇪',
  fr: '🇫🇷',
  it: '🇮🇹',
  pt: '🇵🇹',
  nl: '🇳🇱',
  ja: '🇯🇵',
}

export const languageCodes = Object.keys(languages) as Language[]

export function isLanguage(valor: unknown): valor is Language {
  return typeof valor === 'string' && (languageCodes as string[]).includes(valor)
}

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
  if (isLanguage(language)) {
    return language
  }

  // Fallback to old browser language detection. Se mira la lista entera de
  // idiomas del navegador y no solo el primero: quien tiene el movil en ingles
  // pero es holandes suele llevar «nl» en segundo lugar, y prefiere leer en el
  // suyo si lo tenemos.
  const preferidos = [
    window.navigator.language,
    ...(window.navigator.languages || []),
  ].filter(Boolean)

  for (const preferido of preferidos) {
    const base = preferido.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }
  
  // Quien no hable ninguno de los ocho: el ingles es la traduccion que menos
  // gente pierde, y ademas es el idioma en el que se anuncia.
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