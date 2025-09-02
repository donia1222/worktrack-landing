"use client"

import { motion } from "framer-motion"
import { Smartphone, Zap, Clock, Calendar, Eye, Apple } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function SmartWidgets() {
  const { t } = useLanguage()

  const widgetSizes = [
    {
      size: "Small",
      title: t("smartWidgets.sizes.small.title"),
      description: t("smartWidgets.sizes.small.description"),
      dimensions: "2x2",
      icon: Clock,
      color: "bg-blue-100 text-blue-600"
    },
    {
      size: "Medium", 
      title: t("smartWidgets.sizes.medium.title"),
      description: t("smartWidgets.sizes.medium.description"),
      dimensions: "4x2",
      icon: Calendar,
      color: "bg-green-100 text-green-600"
    },
    {
      size: "Large",
      title: t("smartWidgets.sizes.large.title"), 
      description: t("smartWidgets.sizes.large.description"),
      dimensions: "4x4",
      icon: Eye,
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: t("smartWidgets.features.realTime.title"),
      description: t("smartWidgets.features.realTime.description"),
      highlight: "Live Updates"
    },
    {
      icon: Apple,
      title: t("smartWidgets.features.dynamicIsland.title"), 
      description: t("smartWidgets.features.dynamicIsland.description"),
      highlight: "iPhone 14 Pro+"
    },
    {
      icon: Smartphone,
      title: t("smartWidgets.features.lockScreen.title"),
      description: t("smartWidgets.features.lockScreen.description"), 
      highlight: "iOS 16+"
    }
  ]

  return (
    <section
      id="smart-widgets"
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-blue-100 backdrop-blur-sm rounded-full text-slate-700 text-sm font-medium mb-6 border border-slate-200/50">
            <Apple className="w-4 h-4" />
            {t("smartWidgets.badge")}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("smartWidgets.title")}{" "}
            <span className="bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
              {t("smartWidgets.titleAccent")}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("smartWidgets.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: iPhone Mockup with Widgets */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Real iPhone with VixTime Widget */}
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-300/30 to-orange-300/30 blur-3xl opacity-50" />
                <div className="relative">
                  <Image
                    src="/widget.png"
                    alt="VixTime iOS Widget on iPhone"
                    width={400}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
              
            </div>
          </motion.div>

          {/* Right: Widget Sizes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                {t("smartWidgets.sizesTitle")}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t("smartWidgets.sizesDescription")}
              </p>
            </div>
            
            {widgetSizes.map((widget, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 group border border-transparent hover:border-slate-200/50"
              >
                <div className={`${widget.color} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <widget.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-slate-900">
                      {widget.title}
                    </h4>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                      {widget.dimensions}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {widget.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-xs font-medium text-blue-700 mb-4">
                {feature.highlight}
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
            <Smartphone className="w-5 h-5" />
            {t("smartWidgets.ctaButton")}
          </div>
        </div>
      </div>
    </section>
  )
}