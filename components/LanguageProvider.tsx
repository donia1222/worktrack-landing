'use client'

import { useState, useEffect, ReactNode } from 'react'
import { LanguageContext, Language, detectBrowserLanguage } from '@/lib/language'

// Import translations
import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'
import deMessages from '@/messages/de.json'

const messages = {
  es: esMessages,
  en: enMessages,
  de: deMessages
}

interface LanguageProviderProps {
  children: ReactNode
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('es')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Check localStorage first, then browser language
    const savedLang = localStorage.getItem('worktrack-language') as Language
    const detectedLang = detectBrowserLanguage()
    
    const initialLang = savedLang || detectedLang
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
    
    return value || key
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