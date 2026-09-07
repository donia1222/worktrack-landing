'use client'

import { useState, useEffect, ReactNode } from 'react'
import { LanguageContext, Language, detectBrowserLanguage, isLanguage } from '@/lib/language'

// Import translations
import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'
import deMessages from '@/messages/de.json'
import frMessages from '@/messages/fr.json'
import itMessages from '@/messages/it.json'
import ptMessages from '@/messages/pt.json'
import nlMessages from '@/messages/nl.json'
import jaMessages from '@/messages/ja.json'

const messages: Record<Language, any> = {
  es: esMessages,
  en: enMessages,
  de: deMessages,
  fr: frMessages,
  it: itMessages,
  pt: ptMessages,
  nl: nlMessages,
  ja: jaMessages,
}

interface LanguageProviderProps {
  children: ReactNode
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Check localStorage first, then browser language
    // Validado, no confiado: en localStorage puede haber un idioma que ya no
    // existe —o que nunca existio— y entonces `messages[language]` era
    // undefined y la pagina salia con las claves crudas.
    const savedLang = localStorage.getItem('worktrack-language')
    const detectedLang = detectBrowserLanguage()

    const initialLang = isLanguage(savedLang) ? savedLang : detectedLang
    setLanguageState(initialLang)
    setIsHydrated(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('worktrack-language', lang)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[language]

    for (const k of keys) {
      value = value?.[k]
    }

    // Si a un idioma le falta una clave, se cae al ingles antes que a la clave
    // cruda: «hero.title» en mitad de la pagina se ve mucho peor que la misma
    // frase en ingles.
    if (typeof value === 'string') return value

    let respaldo: any = messages.en
    for (const k of keys) {
      respaldo = respaldo?.[k]
    }
    return typeof respaldo === 'string' ? respaldo : key
  }

  // Prevent hydration mismatch
  if (!isHydrated) {
    return <div className="min-h-screen bg-gray-50" />
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}