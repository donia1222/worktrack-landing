'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, ChevronDown, Play } from 'lucide-react'
import Image from 'next/image'
import DemoModal from './DemoModal'
import { useLanguage } from '@/lib/language'

export default function Hero() {
  const { t } = useLanguage()
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50" />
      
      {/* Animated circles */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleAccent')}</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('hero.description')}
              <br />{t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.downloadButton')}
              </motion.button>

            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span><strong>{t('hero.features.autoTimer')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">🤖</span>
                <span><strong>{t('hero.features.aiChatbot')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📊</span>
                <span><strong>{t('hero.features.pdfReports')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">📱</span>
                <span><strong>{t('hero.features.platforms')}</strong></span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
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
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">WorkTrack</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <div className="text-2xl mb-1">💼</div>
                      <div className="text-2xl font-bold text-gray-900">1</div>
                      <div className="text-xs text-gray-600">Trabajos activos</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl">
                      <div className="text-2xl mb-1">⏰</div>
                      <div className="text-sm font-semibold text-gray-900">Auto-timer</div>
                    </div>
                  </div>
                  
                  {/* Calendar preview */}
                  <div className="bg-purple-50 p-4 rounded-2xl mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-xl">📅</div>
                      <span className="font-semibold text-gray-800">Agosto</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {['L','M','M','J','V','S','D'].map((day, i) => (
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
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  )
}