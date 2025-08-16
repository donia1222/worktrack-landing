'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'
import { useLanguage, languages, Language } from '@/lib/language'

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'mobile'
}

export default function LanguageSelector({ variant = 'header' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Mobile variant - horizontal button group
  if (variant === 'mobile') {
    return (
      <div className="w-full">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-4">
          {language === 'es' ? 'Idioma' : language === 'en' ? 'Language' : 'Sprache'}
        </p>
        <div className="flex gap-2 px-4">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                language === code 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{code === 'es' ? '🇪🇸' : code === 'en' ? '🇺🇸' : '🇩🇪'}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Globe className="w-4 h-4" />
          <span>{languages[language]}</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[120px] z-50"
            >
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm ${
                    language === code ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          variant === 'header' 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages[language]}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[140px] z-50"
          >
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Language)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                  language === code ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{code === 'es' ? '🇪🇸' : code === 'en' ? '🇺🇸' : '🇩🇪'}</span>
                <span>{name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}