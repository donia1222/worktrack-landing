'use client'

import { useState } from 'react'
import { Clock, MapPin, ChevronDown } from 'lucide-react'
import DemoModal from './DemoModal'
import { useLanguage } from '@/lib/language'

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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
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
            <div className="relative mx-auto w-80 h-[650px]">
              {/* Phone mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] shadow-2xl" />
              <div className="absolute inset-[3px] bg-black rounded-[2.8rem]" />
              <div className="absolute inset-[15px] bg-white rounded-[2.3rem] overflow-hidden">
                {/* Status bar */}
                <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs">
                  <span className="font-semibold">20:10</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                    <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                    <div className="w-4 h-3 bg-gray-300 rounded-sm" />
                  </div>
                </div>
                
                {/* App content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="font-semibold flex">
                      <span className="text-[#007AFF]" style={{ fontWeight: '800' }}>Vix</span>
                      <span className="text-[#5856D6]" style={{ fontWeight: '700' }}>Time</span>
                      <span className="text-[#34C759]" style={{ fontWeight: '800' }}>App</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <div className="text-2xl mb-1">💼</div>
                      <div className="text-2xl font-bold text-gray-900">1</div>
                      <div className="text-xs text-gray-600">{t('mockup.activeJobs')}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl">
                      <div className="text-2xl mb-1">⏰</div>
                      <div className="text-sm font-semibold text-gray-900">{t('mockup.autoTimer')}</div>
                    </div>
                  </div>
                  
                  {/* Calendar preview */}
                  <div className="bg-purple-50 p-4 rounded-2xl mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-xl">📅</div>
                      <span className="font-semibold text-gray-800">{t('mockup.august')}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {(t('mockup.weekDays') as any as string[]).map((day, i) => (
                        <div key={i} className="text-center text-gray-500 font-medium">{day}</div>
                      ))}
                      {[...Array(31)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square flex items-center justify-center rounded-lg text-xs
                            ${i === 3 ? 'bg-blue-500 text-white font-bold' : 
                              i === 4 ? 'bg-green-500 text-white' : 
                              'text-gray-600'}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
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