"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Monitor, BarChart3, Bot } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function Screenshots() {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const screenshots = [
    {
      image: "/screenshots/es/cap4.png",
      title: t("screenshots.items.dashboard.title"),
      description: t("screenshots.items.dashboard.description"),
      icon: Monitor,
    },
    {
      image: "/screenshots/es/map.png",
      title: t("screenshots.items.reports.title"),
      description: t("screenshots.items.reports.description"),
      icon: BarChart3,
    },
    {
      image: "/screenshots/es/botp.png",
      title: t("screenshots.items.aiBot.title"),
      description: t("screenshots.items.aiBot.description"),
      icon: Bot,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section
      id="screenshots"
      className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 via-blue-25 to-blue-50/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af_1px,transparent_1px),linear-gradient(to_bottom,#1e40af_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-full text-slate-600 text-sm font-medium mb-6 border border-slate-200/50">
            <Monitor className="w-4 h-4" />
            {t("screenshots.badge")}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("screenshots.title")} <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">{t("screenshots.titleAccent")}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("screenshots.description")}
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white border border-slate-200/50 group hover:scale-105"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white border border-slate-200/50 group hover:scale-105"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-12 lg:mb-16">
              <div className="relative mx-auto max-w-sm lg:max-w-lg">
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-blue-200/40 rounded-[2.5rem] blur-xl opacity-60" />
                <div className="relative bg-gradient-to-b from-blue-50/95 to-blue-100/95 backdrop-blur-xl rounded-[2rem] p-4 shadow-2xl border border-blue-100/50 ring-1 ring-blue-200/20">
                  <div className="bg-gradient-to-b from-blue-50/50 to-blue-25/80 rounded-[1.5rem] p-2 shadow-inner ring-1 ring-blue-200/30">
                    <Image
                      src={screenshots[currentIndex].image || "/placeholder.svg"}
                      alt={screenshots[currentIndex].title}
                      width={450}
                      height={800}
                      className="rounded-2xl w-full h-auto shadow-lg ring-1 ring-blue-200/50"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-blue-50/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-blue-200/50 max-w-3xl mx-auto ring-1 ring-blue-200/20"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200/50 rounded-2xl shadow-inner">
                  {(() => {
                    const IconComponent = screenshots[currentIndex].icon
                    return IconComponent ? <IconComponent className="w-8 h-8 text-blue-700" /> : null
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-balance">
                    {screenshots[currentIndex].title}
                  </h3>
                </div>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                {screenshots[currentIndex].description}
              </p>
            </motion.div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-12 lg:mt-16">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full hover:scale-110 ${
                  index === currentIndex
                    ? "w-10 h-4 bg-slate-900 shadow-lg"
                    : "w-4 h-4 bg-slate-300 hover:bg-slate-400 shadow-md"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
