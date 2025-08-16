'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Clock, MapPin, BarChart3, Calendar, MessageSquare } from 'lucide-react'

interface DemoStep {
  id: number
  title: string
  description: string
  icon: any
  mockup: React.ReactNode
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Configura tu trabajo',
    description: 'Añade tu lugar de trabajo con dirección, horarios y tarifa por hora',
    icon: MapPin,
    mockup: (
      <div className="p-4 bg-white rounded-2xl">
        <h3 className="font-semibold mb-3">Nuevo Trabajo</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Empresa</label>
            <div className="bg-gray-100 rounded-lg p-2 text-sm">Mi Empresa S.L.</div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Dirección</label>
            <div className="bg-gray-100 rounded-lg p-2 text-sm">Calle Mayor 123, Madrid</div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Tarifa por hora</label>
            <div className="bg-gray-100 rounded-lg p-2 text-sm">15.00 €/hora</div>
          </div>
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-semibold">
            Guardar Trabajo
          </button>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Auto-Timer GPS',
    description: 'Al llegar a tu trabajo, el timer se inicia automáticamente',
    icon: Clock,
    mockup: (
      <div className="p-4 bg-white rounded-2xl">
        <div className="bg-green-50 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Auto-Timer Activado</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="text-xs text-gray-600">Detectando ubicación...</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">00:15:32</div>
            <div className="text-sm text-gray-600">Timer activo</div>
            <div className="text-xs text-gray-500 mt-2">📍 Mi Empresa S.L.</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Calendario visual',
    description: 'Visualiza todos tus días trabajados con colores por trabajo',
    icon: Calendar,
    mockup: (
      <div className="p-4 bg-white rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Agosto 2025</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">156h totales</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['L','M','M','J','V','S','D'].map((day, i) => (
            <div key={i} className="text-center text-gray-500 font-medium">{day}</div>
          ))}
          {[...Array(31)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square flex items-center justify-center rounded text-xs
                ${[3,4,5,10,11,12,17,18,19].includes(i) ? 'bg-blue-500 text-white font-bold' : 
                  [6,13,20,27].includes(i) ? 'bg-red-100 text-red-600' : 
                  'text-gray-600'}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Reportes detallados',
    description: 'Genera reportes profesionales con estadísticas y exporta en PDF',
    icon: BarChart3,
    mockup: (
      <div className="p-4 bg-white rounded-2xl">
        <h3 className="font-semibold mb-3">Resumen Mensual</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">156h</div>
            <div className="text-xs text-gray-600">Total horas</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">2,340€</div>
            <div className="text-xs text-gray-600">Ingresos</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Mi Empresa S.L.</span>
            <span className="font-semibold">132h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Freelance</span>
            <span className="font-semibold">24h</span>
          </div>
        </div>
        <button className="w-full mt-3 bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-semibold">
          Exportar PDF
        </button>
      </div>
    )
  },
  {
    id: 5,
    title: 'Chatbot IA',
    description: 'Analiza documentos laborales y extrae información automáticamente',
    icon: MessageSquare,
    mockup: (
      <div className="p-4 bg-white rounded-2xl">
        <h3 className="font-semibold mb-3">Asistente IA</h3>
        <div className="space-y-3">
          <div className="bg-gray-100 rounded-lg p-3 text-sm">
            <div className="text-xs text-gray-500 mb-1">Tú:</div>
            <div>Analiza mi horario de agosto</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-sm">
            <div className="text-xs text-blue-600 mb-1">VixTimeApp IA:</div>
            <div>He detectado:</div>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• 20 días laborables</li>
              <li>• Turno: 9:00 - 17:00</li>
              <li>• Total: 160 horas</li>
              <li>• 2 días de vacaciones</li>
            </ul>
            <button className="mt-2 text-xs text-blue-600 font-semibold">
              Añadir al calendario →
            </button>
          </div>
        </div>
      </div>
    )
  }
]

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                Demo Interactiva de VixTimeApp
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Steps */}
                <div>
                  <div className="space-y-4">
                    {demoSteps.map((step, index) => {
                      const Icon = step.icon
                      const isActive = index === currentStep
                      const isPast = index < currentStep
                      
                      return (
                        <motion.div
                          key={step.id}
                          className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                            isActive ? 'bg-blue-50 border-2 border-blue-500' : 
                            isPast ? 'bg-gray-50' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentStep(index)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-blue-500 text-white' : 
                            isPast ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold mb-1 ${
                              isActive ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {step.title}
                            </h3>
                            <p className={`text-sm ${
                              isActive ? 'text-blue-700' : 'text-gray-600'
                            }`}>
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        currentStep === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Anterior
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={currentStep === demoSteps.length - 1}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        currentStep === demoSteps.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>

                {/* Right: Phone mockup */}
                <div className="flex items-center justify-center">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-72 h-[580px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] shadow-2xl" />
                    <div className="absolute inset-[3px] bg-black rounded-[2.8rem]" />
                    <div className="absolute inset-[15px] bg-gray-50 rounded-[2.3rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="h-8 bg-white flex items-center justify-between px-6 text-xs">
                        <span className="font-semibold">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                          <div className="w-4 h-3 bg-gray-800 rounded-sm" />
                          <div className="w-4 h-3 bg-gray-300 rounded-sm" />
                        </div>
                      </div>
                      
                      {/* App content */}
                      <div className="p-4">
                        {demoSteps[currentStep].mockup}
                      </div>
                    </div>
                    
                    {/* Notch */}
                    <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Paso {currentStep + 1} de {demoSteps.length}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
                >
                  Descargar VixTimeApp
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}