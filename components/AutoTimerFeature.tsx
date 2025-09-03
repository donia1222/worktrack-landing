"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Zap, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function AutoTimerFeature() {
  const { t } = useLanguage()

  const features = [
    {
      icon: MapPin,
      title: t("autoTimerFeature.features.geofence.title"),
      description: t("autoTimerFeature.features.geofence.description")
    },
    {
      icon: Clock,
      title: t("autoTimerFeature.features.automatic.title"),
      description: t("autoTimerFeature.features.automatic.description")
    },
    {
      icon: Zap,
      title: t("autoTimerFeature.features.background.title"),
      description: t("autoTimerFeature.features.background.description")
    }
  ]

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                {t("autoTimerFeature.badge")}
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {t("autoTimerFeature.title")}{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {t("autoTimerFeature.titleAccent")}
                </span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("autoTimerFeature.description")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-2 mt-1">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">50-500m</div>
                <div className="text-xs text-slate-500">{t("autoTimerFeature.stats.radius")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">2-10min</div>
                <div className="text-xs text-slate-500">{t("autoTimerFeature.stats.delays")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-xs text-slate-500">{t("autoTimerFeature.stats.monitoring")}</div>
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative">
            <div className="relative max-w-xs mx-auto">              
              <div className="relative bg-gradient-to-br from-blue-100/60 to-blue-200/40 rounded-3xl p-6">
                <Image
                  src="/phone/mapaautotimmer.png"
                  alt="AutoTimer GPS Interface"
                  width={280}
                  height={420}
                  className="w-full h-auto"
                  priority
                />
                
                {/* Floating Status Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-700">
                      {t("autoTimerFeature.status.active")}
                    </span>
                  </div>
                </div>
                
                {/* Floating Geofence Info */}
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-lg px-2 py-1 shadow-lg">
                  <div className="text-xs font-medium">150m</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}