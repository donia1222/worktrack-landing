'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language'

const APP_STORE_URL =
  'https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431'

type Platform = 'ios' | 'android' | null

export default function MobileDownloadBanner() {
  const { t } = useLanguage()
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

  const handleScroll = useCallback(() => {
    if (isDismissed) return

    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0

    setIsVisible(scrollPercent >= 0.25)
  }, [isDismissed])

  useEffect(() => {
    if (!platform) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [platform, handleScroll])

  const dismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleClick = () => {
    if (platform === 'ios') {
      window.location.href = APP_STORE_URL
    }
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
              <p className="font-bold text-slate-900 text-[15px] leading-tight truncate">
                {t('mobileBanner.name')}
              </p>
              <p className="text-slate-500 text-xs truncate">{t('mobileBanner.subtitle')}</p>
            </div>

            {platform === 'ios' ? (
              <span className="flex-shrink-0 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                {t('mobileBanner.download')}
              </span>
            ) : (
              <span className="flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-400 text-sm font-semibold rounded-full">
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
