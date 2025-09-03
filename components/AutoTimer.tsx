"use client"

import { motion } from "framer-motion"
import { MapPin, Zap, Clock, Brain, CheckCircle, ArrowRight, Smartphone, Wifi, Battery, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function AutoTimer() {
  const { t } = useLanguage()

  const features = [
    {
      icon: MapPin,
      title: t("autoTimer.features.geofencing.title"),
      description: t("autoTimer.features.geofencing.description"),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      details: ["50-500m radio configurable", "Detección automática entrada/salida", "Delays personalizables 2-10 min"]
    },
    {
      icon: Smartphone,
      title: t("autoTimer.features.background.title"),
      description: t("autoTimer.features.background.description"),
      color: "text-green-600",
      bgColor: "bg-green-100",
      details: ["Funciona app cerrada", "APIs nativas iOS/Android", "Recuperación automática"]
    },
    {
      icon: Brain,
      title: t("autoTimer.features.intelligence.title"),
      description: t("autoTimer.features.intelligence.description"),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      details: ["Múltiples trabajos", "Estados visuales claros", "Reconciliación automática"]
    }
  ]

  const technicalSpecs = [
    {
      icon: Zap,
      title: t("autoTimer.specs.performance.title"),
      value: "3,000+",
      unit: t("autoTimer.specs.performance.unit"),
      description: t("autoTimer.specs.performance.description")
    },
    {
      icon: Shield,
      title: t("autoTimer.specs.reliability.title"),
      value: "99.2%",
      unit: t("autoTimer.specs.reliability.unit"),
      description: t("autoTimer.specs.reliability.description")
    },
    {
      icon: Battery,
      title: t("autoTimer.specs.efficiency.title"),
      value: "8+",
      unit: t("autoTimer.specs.efficiency.unit"),
      description: t("autoTimer.specs.efficiency.description")
    }
  ]

  const states = [
    { state: "inactive", color: "bg-slate-400", label: t("autoTimer.states.inactive") },
    { state: "entering", color: "bg-orange-400", label: t("autoTimer.states.entering") },
    { state: "active", color: "bg-green-500", label: t("autoTimer.states.active") },
    { state: "leaving", color: "bg-yellow-400", label: t("autoTimer.states.leaving") },
    { state: "manual", color: "bg-blue-500", label: t("autoTimer.states.manual") }
  ]

  return (
    <section
      id="auto-timer"
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/50">
            <Zap className="w-4 h-4" />
            {t("autoTimer.badge")}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("autoTimer.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t("autoTimer.titleAccent")}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("autoTimer.description")}
          </p>
        </motion.div>

        {/* Technical Specs */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {technicalSpecs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-full p-3 w-fit mx-auto mb-4">
                <spec.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {spec.value}
                <span className="text-sm font-normal text-slate-500 ml-1">{spec.unit}</span>
              </div>
              
              <h3 className="font-semibold text-slate-900 mb-2">{spec.title}</h3>
              <p className="text-sm text-slate-600">{spec.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-300/20 to-green-300/20 blur-3xl opacity-60" />
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-600 ml-auto">AutoTimer</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Oficina Central - Activo</span>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500">Radio de detección</span>
                      <span className="text-xs font-medium text-slate-700">150m</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: "75%"}}></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">02:34:12</div>
                    <div className="text-xs text-slate-500">Tiempo trabajado hoy</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating indicators */}
            <div className="absolute top-4 -left-2 bg-blue-500 rounded-full p-2 shadow-lg animate-pulse">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            
            <div className="absolute bottom-4 -right-2 bg-green-500 rounded-full p-2 shadow-lg animate-pulse" style={{animationDelay: "1s"}}>
              <Zap className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${feature.bgColor} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* State Machine Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-200/50 shadow-xl mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-8">
            {t("autoTimer.statesTitle")}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {states.map((state, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
                <div className={`w-3 h-3 rounded-full ${state.color}`}></div>
                <span className="text-sm font-medium text-slate-700">{state.label}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-slate-600 mb-6">
              {t("autoTimer.statesDescription")}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Clock className="w-5 h-5" />
              {t("autoTimer.tryButton")}
            </div>
          </div>
        </motion.div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {t("autoTimer.architectureTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">AutoTimerService.ts</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">GeofenceService.ts</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">BackgroundTask.ts</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">LiveActivityService.ts</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">8+ servicios más...</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}