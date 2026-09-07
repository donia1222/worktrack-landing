'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { useLanguage, languages, languageFlags, languageCodes, Language } from '@/lib/language'

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'mobile'
}

export default function LanguageSelector({ variant = 'header' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Con tres idiomas la lista cabia en pantalla y daba igual; con ocho, no
  // cerrarla al tocar fuera o al pulsar Escape la deja tapando media pagina.
  useEffect(() => {
    if (!isOpen) return

    const alTocarFuera = (evento: MouseEvent) => {
      if (!contenedor.current?.contains(evento.target as Node)) setIsOpen(false)
    }
    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', alTocarFuera)
    document.addEventListener('keydown', alPulsar)
    return () => {
      document.removeEventListener('mousedown', alTocarFuera)
      document.removeEventListener('keydown', alPulsar)
    }
  }, [isOpen])

  const etiqueta = t('navigation.language')

  // Una fila de la lista: bandera, nombre, y la marca del que esta puesto.
  const Fila = ({ code, oscuro = false }: { code: Language; oscuro?: boolean }) => {
    const activo = language === code
    return (
      <button
        key={code}
        onClick={() => handleLanguageChange(code)}
        lang={code}
        aria-current={activo ? 'true' : undefined}
        className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-3 text-sm ${
          oscuro ? 'hover:bg-white/10' : 'hover:bg-gray-50'
        } ${
          activo
            ? oscuro
              ? 'text-white font-medium'
              : 'text-blue-600 font-medium'
            : oscuro
              ? 'text-gray-300'
              : 'text-gray-700'
        }`}
      >
        <span className="text-lg leading-none">{languageFlags[code]}</span>
        <span className="flex-1">{languages[code]}</span>
        {activo && <Check className="w-4 h-4 shrink-0" />}
      </button>
    )
  }

  // En movil ya no son pestañas: ocho no caben en una fila. Es la misma lista
  // desplegable que en el resto de la pagina, a lo ancho del menu.
  if (variant === 'mobile') {
    return (
      <div className="w-full px-4" ref={contenedor}>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{etiqueta}</p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <span className="text-lg leading-none">{languageFlags[language]}</span>
          <span className="flex-1 text-left">{languages[language]}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-2 rounded-xl border border-gray-200 bg-white"
            >
              {languageCodes.map((code) => (
                <Fila key={code} code={code} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="relative" ref={contenedor}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={etiqueta}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Globe className="w-4 h-4" />
          <span>{languages[language]}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full left-0 mb-2 bg-slate-800 rounded-xl shadow-xl border border-white/10 py-2 min-w-[180px] max-h-[60vh] overflow-y-auto z-50"
            >
              {languageCodes.map((code) => (
                <Fila key={code} code={code} oscuro />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative" ref={contenedor}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={etiqueta}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages[language]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[190px] max-h-[70vh] overflow-y-auto z-50"
          >
            {languageCodes.map((code) => (
              <Fila key={code} code={code} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
