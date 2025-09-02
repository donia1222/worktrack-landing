"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function WorkingPhone() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const phoneScreens = [
    {
      image: "/phone/calendario.png",
      title: t("workingPhone.screens.calendar.title"),
      description: t("workingPhone.screens.calendar.description"),
    },
    {
      image: "/phone/mapaautotimmer.png", 
      title: t("workingPhone.screens.autoTimer.title"),
      description: t("workingPhone.screens.autoTimer.description"),
    },
    {
      image: "/phone/nofofccinpush.png",
      title: t("workingPhone.screens.notifications.title"), 
      description: t("workingPhone.screens.notifications.description"),
    },
    {
      image: "/phone/report.png",
      title: t("workingPhone.screens.reports.title"),
      description: t("workingPhone.screens.reports.description"),
    }
  ]



  return (
    <section
      id="working-phone"
      className="py-20 lg:py-28 bg-gradient-to-b from-blue-50/30 via-white to-slate-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e40af_1px,transparent_1px),linear-gradient(to_bottom,#1e40af_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)] opacity-15" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-slate-100 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/50">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            {t("workingPhone.badge")}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("workingPhone.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
              {t("workingPhone.titleAccent")}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("workingPhone.description")}
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Images Grid */}
          <div className="flex justify-center items-end gap-8 mb-16 max-w-6xl mx-auto flex-wrap">
            {phoneScreens.map((screen, index) => (
              <motion.div 
                key={index}
                className="relative cursor-pointer flex-shrink-0"
                onClick={() => setCurrentIndex(index)}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-b from-slate-100 to-slate-200">
                  <Image
                    src={screen.image}
                    alt={screen.title}
                    width={180}
                    height={360}
                    className="w-full h-auto rounded-3xl"
                    priority={index === 0}
                  />
                </div>
                <div className="text-center mt-4">
                  <h4 className={`text-sm font-semibold transition-colors ${
                    index === currentIndex ? "text-blue-600" : "text-slate-600"
                  }`}>
                    {screen.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Current Screen Description */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              {phoneScreens[currentIndex].title}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {phoneScreens[currentIndex].description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}