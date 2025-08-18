'use client'

import { useState } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import DemoModal from './DemoModal'
import { useLanguage } from '@/lib/language'
import Image from 'next/image'

export default function Hero() {
  const { t } = useLanguage()
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  return (
    <section id="hero" className="relative min-h-[600px] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
      
      {/* Background circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full filter blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight mt-16">
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleAccent')}</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              {t('hero.description')}
              <br />{t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                {t('hero.downloadButton')}
              </button>

            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span><strong>{t('hero.features.autoTimer')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">📱</span>
                <span><strong>{t('hero.features.widgets')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">🤖</span>
                <span><strong>{t('hero.features.aiChatbot')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📊</span>
                <span><strong>{t('hero.features.pdfReports')}</strong></span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative mx-auto" style={{ maxWidth: '300px'}}>
              <Image
                src='/screenshots/es/calendar.png'
                alt="VixTime App"
                width={300}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  )
}