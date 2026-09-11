'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language'
import { disparar } from './MetaPixel'
import { useEnlaceAppStore } from '@/lib/appStore'

type Platform = 'ios' | 'android' | null

export default function MobileDownloadBanner() {
  const { t } = useLanguage()
  const enlaceAppStore = useEnlaceAppStore()
  const [platform, setPlatform] = useState<Platform>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
    const isAndroid = /Android/i.test(ua)
    const isMobile = isIOS || isAndroid

    if (!isMobile) return

    setPlatform(isIOS ? 'ios' : 'android')
  }, [])

  // Antes aparecía a un 25% fijo de scroll de toda la página: cómodo hasta
  // que el bloque de capturas se hizo alto de verdad (scroll horizontal
  // fijado, varias pantallas de alto) y ese 25% caía justo encima de su
  // texto, tapándolo. Ahora se ancla al final de la sección del reloj —
  // aparece justo al dejarla atrás, se mueva lo que se mueva el resto de
  // secciones por encima.
  const handleScroll = useCallback(() => {
    if (isDismissed) return

    const reloj = document.getElementById('apple-watch')
    if (!reloj) return

    const finReloj = window.scrollY + reloj.getBoundingClientRect().bottom
    // Y se esconde otra vez al llegar al final del todo: fijo como está,
    // si no se quita tapa el footer (los enlaces legales, el selector de
    // idioma...) en vez de dejarlo leer.
    const faltaParaElFinal = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
    const cercaDelFinal = faltaParaElFinal < 350
    setIsVisible(window.scrollY >= finReloj && !cercaDelFinal)
  }, [isDismissed])

  useEffect(() => {
    if (!platform) return

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [platform, handleScroll])

  const dismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleClick = () => {
    if (platform !== 'ios') return
    // A mano, porque esto no es un enlace: el pixel escucha clics en <a> y este
    // banner es un div que navega por JS, asi que se le escapaba entero. Y es
    // el boton de descarga que ve la mayoria del trafico de anuncios, que llega
    // por movil.
    disparar('Lead', { content_name: 'app_store_banner_movil', content_category: 'banner_movil' })
    window.location.href = enlaceAppStore
  }

  if (!platform) return null

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
        >
          <div
            onClick={handleClick}
            role={platform === 'ios' ? 'button' : undefined}
            className={`flex items-center gap-3 bg-white/95 backdrop-blur-md border border-blue-100 rounded-2xl shadow-2xl shadow-blue-900/10 p-3 ${platform === 'ios' ? 'cursor-pointer active:scale-[0.98]' : ''} transition-transform`}
          >
            <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
              <Image src="/new/app-icono.png" alt={t('mobileBanner.name')} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-[13px] leading-tight truncate">
                {t('mobileBanner.name')}
              </p>
              <p className="text-slate-500 text-xs truncate">
                {t('mobileBanner.free')} · {t('mobileBanner.subtitle')}
              </p>
            </div>

            {platform === 'ios' ? (
              <span className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[13px] font-semibold rounded-full shadow-lg">
                {t('mobileBanner.download')}
              </span>
            ) : (
              <span className="flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-400 text-[13px] font-semibold rounded-full">
                {t('mobileBanner.comingSoon')}
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                dismiss()
              }}
              className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
