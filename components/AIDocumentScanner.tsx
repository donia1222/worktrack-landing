"use client"

import { motion } from "framer-motion"
import { Camera, FileText, Brain, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function AIDocumentScanner() {
  const { t } = useLanguage()

  const capabilities = [
    {
      icon: FileText,
      title: t("aiScanner.capabilities.schedules.title"),
      description: t("aiScanner.capabilities.schedules.description"),
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Brain,
      title: t("aiScanner.capabilities.contracts.title"), 
      description: t("aiScanner.capabilities.contracts.description"),
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Zap,
      title: t("aiScanner.capabilities.invoices.title"),
      description: t("aiScanner.capabilities.invoices.description"),
      color: "text-green-600", 
      bgColor: "bg-green-100",
    }
  ]

  const steps = [
    {
      step: "01",
      title: t("aiScanner.steps.capture.title"),
      description: t("aiScanner.steps.capture.description")
    },
    {
      step: "02", 
      title: t("aiScanner.steps.analyze.title"),
      description: t("aiScanner.steps.analyze.description")
    },
    {
      step: "03",
      title: t("aiScanner.steps.export.title"), 
      description: t("aiScanner.steps.export.description")
    }
  ]

  return (
    <section
      id="ai-scanner" 
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/50">
            <Brain className="w-4 h-4" />
            {t("aiScanner.badge")}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("aiScanner.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("aiScanner.titleAccent")}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("aiScanner.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-300/20 to-purple-300/20 blur-3xl opacity-60" />
              <div className="relative">
                <Image
                  src="/bot.png"
                  alt="VixTime AI Document Scanner"
                  width={300}
                  height={400}
            
                  priority
                />
                <div className="absolute top-4 right-4 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            {/* Floating AI indicators */}
            <div className="absolute top-4 -left-2 bg-blue-500 rounded-full p-2 shadow-lg animate-pulse">
              <Brain className="w-4 h-4 text-white" />
            </div>
            
            <div className="absolute bottom-4 -right-2 bg-purple-500 rounded-full p-2 shadow-lg animate-pulse" style={{animationDelay: "1s"}}>
              <Zap className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Right: Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300 group"
              >
                <div className={`${capability.bgColor} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <capability.icon className={`w-6 h-6 ${capability.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-blue-200/50 shadow-xl"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-12">
            {t("aiScanner.processTitle")}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center relative"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                
                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                  {step.title}
                </h4>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-blue-400 absolute top-8 -right-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Camera className="w-5 h-5" />
              {t("aiScanner.tryButton")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}