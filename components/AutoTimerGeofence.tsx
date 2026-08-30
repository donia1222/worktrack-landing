"use client"

import { motion } from "framer-motion"
import { MapPin, PlayCircle, StopCircle } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function AutoTimerGeofence() {
  const { t } = useLanguage()

  const points = [
    {
      icon: PlayCircle,
      title: t("autoTimerGeofence.points.arrive.title"),
      description: t("autoTimerGeofence.points.arrive.description"),
    },
    {
      icon: StopCircle,
      title: t("autoTimerGeofence.points.leave.title"),
      description: t("autoTimerGeofence.points.leave.description"),
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-[200px] sm:w-[220px] mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-br from-green-200/40 to-blue-200/30 rounded-[3rem] blur-2xl" />
              <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                <div className="relative w-full aspect-[9/19] rounded-[1.4rem] overflow-hidden">
                  <Image
                    src="/phone/autotimer-geofence.jpg"
                    alt="AutoTimer GPS geofencing"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                {t("autoTimerGeofence.badge")}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {t("autoTimerGeofence.title")}{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t("autoTimerGeofence.titleAccent")}
                </span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed">
                {t("autoTimerGeofence.description")}
              </p>
            </div>

            <div className="space-y-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-lg p-2 mt-1">
                    <point.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{point.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
