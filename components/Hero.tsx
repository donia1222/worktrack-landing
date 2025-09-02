"use client"

import { useState } from "react"
import { Sparkles, Zap, BarChart3, Bot } from "lucide-react"
import DemoModal from "./DemoModal"
import { useLanguage } from "@/lib/language"
import Image from "next/image"
import { useLaunchModal } from "@/contexts/LaunchModalContext"

export default function Hero() {
  const { t } = useLanguage()
  const { openModal } = useLaunchModal()
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-indigo-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg">
                {t("hero.description")}
                <br className="hidden sm:block" />
                <span className="text-slate-500">{t("hero.subtitle")}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openModal}
                className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-base"
              >
                <span className="relative z-10">{t("hero.downloadButton")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{t("hero.features.autoTimer")}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/50">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{t("hero.features.widgets")}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{t("hero.features.aiChatbot")}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/50">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{t("hero.features.pdfReports")}</span>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full" />

              <div className="relative bg-white p-2 rounded-3xl shadow-2xl shadow-slate-900/10">
                <Image
                  src="/screenshots/es/calendar.png"
                  alt="VixTime App"
                  width={600}
                  height={800}
                  className="rounded-2xl w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  )
}
