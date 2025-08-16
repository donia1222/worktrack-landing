'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language'

const getScreenshots = (t: (key: string) => string) => [
  {
    title: t('screenshots.items.dashboard.title'),
    description: t('screenshots.items.dashboard.description'),
    mockup: {
      time: '20:10',
      content: (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm">⏰</span>
            </div>
            <div className="font-semibold flex">
              <span className="text-[#007AFF]" style={{ fontWeight: '800' }}>Vix</span>
              <span className="text-[#5856D6]" style={{ fontWeight: '700' }}>Time</span>
              <span className="text-[#34C759]" style={{ fontWeight: '800' }}>App</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <div className="text-xl mb-1">💼</div>
              <div className="text-lg font-bold">1</div>
              <div className="text-xs text-gray-600">Trabajos activos</div>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <div className="text-xl mb-1">⏰</div>
              <div className="text-sm font-semibold">Auto-timer</div>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl">
            <div className="text-lg mb-2">📅 Agosto</div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={`h-6 flex items-center justify-center rounded ${
                  i === 3 ? 'bg-blue-500 text-white' : 
                  i === 4 ? 'bg-green-500 text-white' : ''
                }`}>
                  {i + 1}
                </div>
              ))}
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
              <span className="font-semibold">Reportes</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl mb-3">
              <div className="text-xs text-gray-600 mb-1">Trabajo seleccionado</div>
              <div className="font-semibold">Test</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-lg font-bold mb-2">Este mes</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-2xl font-bold">0.0h</div>
                  <div className="text-xs text-gray-600">Total horas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-gray-600">Días trabajados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0.0h</div>
                  <div className="text-xs text-gray-600">Promedio/día</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Distribución por trabajo</div>
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
              <div className="font-semibold mb-2">Asistente IA de Planes de Trabajo</div>
              <div className="text-sm text-gray-600 mb-3">
                ¡Hola! Soy tu asistente especializado en análisis de horarios laborales.
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📄</span>
                  <span className="text-xs">Analizar imágenes y documentos PDF</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">🔍</span>
                  <span className="text-xs">Extraer días de trabajo y horarios</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-xs">Identificar días libres y vacaciones</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">📤</span>
                  <span className="text-xs">Exportar horarios al calendario</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
            Escribe tu mensaje aquí...
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
              <span className="font-semibold">Configuración</span>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="font-semibold mb-1">Gestión de Trabajos</div>
                <div className="text-xs text-gray-600">Configura tus trabajos con horarios, tarifas y facturación</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-semibold text-sm">Mis Trabajos</div>
                    <div className="text-xs text-gray-600">Agregar, editar y configurar</div>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 mb-2">Configuración de la App</div>
                <div className="bg-white p-3 rounded-xl flex items-center justify-between border">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <div className="font-semibold text-sm">Preferencias Generales</div>
                      <div className="text-xs text-gray-600">Notificaciones, idioma, tema</div>
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
  const { t } = useLanguage()
  const screenshots = getScreenshots(t)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section id="screenshots" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('screenshots.title')}{' '}
            <span className="gradient-text">{t('screenshots.titleAccent')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('screenshots.description')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Phone mockup */}
              <div className="relative mx-auto w-72 h-[580px] mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] shadow-2xl" />
                <div className="absolute inset-[3px] bg-black rounded-[2.8rem]" />
                <div className="absolute inset-[15px] bg-white rounded-[2.3rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs">
                    <span className="font-semibold">{screenshots[currentIndex].mockup.time}</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                      <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                      <div className="w-4 h-3 bg-gray-300 rounded-sm" />
                    </div>
                  </div>
                  
                  {/* App content */}
                  {screenshots[currentIndex].mockup.content}
                </div>
                
                {/* Notch */}
                <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl" />
              </div>

              {/* Description */}
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {screenshots[currentIndex].title}
                </h3>
                <p className="text-gray-600">
                  {screenshots[currentIndex].description}
                </p>
              </div>
            </motion.div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
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