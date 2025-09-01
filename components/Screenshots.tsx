'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import Image from 'next/image'

const getScreenshots = (t: (key: string) => string) => [
  {
    title: t('screenshots.items.dashboard.title'),
    description: t('screenshots.items.dashboard.description'),
    mockup: {
      time: '20:10',
      content: (
        <div className="p-3 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-xl">
              <span className="text-[#007AFF]">Vix</span>
              <span className="text-[#5856D6]">Time</span>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-green-400">
              <span className="text-green-500 text-lg">⏰</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white">💼</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-gray-600">Trabajos activos</div>
                <div className="text-2xl font-bold text-blue-800">1</div>
                <div className="text-[10px] text-gray-500">Bbb</div>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">⏰</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-gray-600">Auto-timer</div>
                <div className="text-lg font-bold">00:00:00</div>
                <div className="text-[10px] text-gray-500">Auto-timer inactivo</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-100 p-3 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold">Mi Calendario</span>
                <span className="text-sm">📅</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div>
                  <div className="text-[10px] text-gray-500">L</div>
                  <div className="text-sm font-bold text-blue-500">18</div>
                  <div className="text-lg">💼</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">M</div>
                  <div className="text-sm font-bold">19</div>
                  <div className="text-lg">💼</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">M</div>
                  <div className="text-sm font-bold">20</div>
                  <div className="text-lg">🏠</div>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <div className="text-xs font-semibold mb-1">Horarios Estándar</div>
              <div className="text-sm font-bold text-purple-800">09:00 - 17:00</div>
              <div className="text-[10px] text-gray-600">5 días/semana</div>
              <div className="flex justify-end mt-1">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⏰</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white">✨</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Asistente IA</span>
                  <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full">NUEVO</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">¡Hola! Soy tu asistente...</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  {
    title: t('screenshots.items.reports.title'),
    description: t('screenshots.items.reports.description'),
    mockup: {
      time: '20:10',
      content: (
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-500 text-xl">📊</span>
              <span className="font-semibold">{t('mockup.reports')}</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl mb-3">
              <div className="text-xs text-gray-600 mb-1">{t('mockup.selectedJob')}</div>
              <div className="font-semibold">{t('mockup.test')}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold mb-2">{t('mockup.thisMonth')}</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-2xl font-bold">0.0h</div>
                  <div className="text-xs text-gray-600">{t('mockup.totalHours')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-gray-600">{t('mockup.workedDays')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0.0h</div>
                  <div className="text-xs text-gray-600">{t('mockup.averageDay')}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">{t('mockup.distributionByJob')}</div>
            <div className="bg-blue-100 h-8 rounded-lg flex items-center px-3">
              <span className="text-xs">Test - 100%</span>
            </div>
          </div>
        </div>
      )
    }
  },
  {
    title: t('screenshots.items.aiBot.title'),
    description: t('screenshots.items.aiBot.description'),
    mockup: {
      time: '20:10',
      content: (
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-purple-500 text-xl">🤖</span>
              <span className="font-semibold">Analyze-Bot</span>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl">
              <div className="font-semibold mb-2">{t('mockup.aiAssistant')}</div>
              <div className="text-sm text-gray-600 mb-3">
                {t('mockup.aiGreeting')}
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📄</span>
                  <span className="text-xs">{t('mockup.analyzeImages')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">🔍</span>
                  <span className="text-xs">{t('mockup.extractDays')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-xs">{t('mockup.identifyDays')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📤</span>
                  <span className="text-xs">{t('mockup.exportSchedules')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
            {t('mockup.typeMessage')}
          </div>
        </div>
      )
    }
  },
  {
    title: t('screenshots.items.settings.title'),
    description: t('screenshots.items.settings.description'),
    mockup: {
      time: '20:10', 
      content: (
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-500 text-xl">⚙️</span>
              <span className="font-semibold">{t('mockup.settings')}</span>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="font-semibold mb-1">{t('mockup.jobManagement')}</div>
                <div className="text-xs text-gray-600">{t('mockup.jobManagementDesc')}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-semibold text-sm">{t('mockup.myJobs')}</div>
                    <div className="text-xs text-gray-600">{t('mockup.myJobsDesc')}</div>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 mb-2">{t('mockup.appConfiguration')}</div>
                <div className="bg-white p-3 rounded-xl flex items-center justify-between border">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <div className="font-semibold text-sm">{t('mockup.generalPreferences')}</div>
                      <div className="text-xs text-gray-600">{t('mockup.generalPreferencesDesc')}</div>
                    </div>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
]

export default function Screenshots() {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const screenshots = [
    { 
      image: '/screenshots/es/cap4.png',
      title: t('screenshots.items.dashboard.title'), 
      description: t('screenshots.items.dashboard.description') 
    },
    { 
         image: '/screenshots/es/map.png',
      title: t('screenshots.items.reports.title'), 
      description: t('screenshots.items.reports.description') 
    },
    { 
       image: '/screenshots/es/botp.png',
      title: t('screenshots.items.aiBot.title'), 
      description: t('screenshots.items.aiBot.description') 
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section id="screenshots" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
   
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur rounded-full shadow-md hover:shadow-lg transition-all hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Screenshot */}
              <div className="mb-6 sm:mb-8">
                <div className="relative mx-auto" style={{ maxWidth: '350px' }}>
                  <Image
                    src={screenshots[currentIndex].image}
                    alt={screenshots[currentIndex].title}
                    width={350}
                    height={700}
                    className="rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-center max-w-md px-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  {screenshots[currentIndex].title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {screenshots[currentIndex].description}
                </p>
              </div>
            </motion.div>

            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-4 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur rounded-full shadow-md hover:shadow-lg transition-all hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-blue-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}