"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Download } from "lucide-react"
import { useLanguage } from "@/lib/language"

export default function CTA() {
  const { t } = useLanguage()
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {t("cta.title")}{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
              {t("cta.titleAccent")}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto text-pretty">{t("cta.description")}</p>

          <div className="flex items-center justify-center gap-1 mb-8">
            <div className="flex items-center gap-1 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-blue-200/50">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-3 text-sm text-slate-700 font-medium">{t("cta.rating")}</span>
            </div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 text-base">
              <Download className="w-5 h-5" />
              {t("cta.downloadButton")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          <p className="text-sm text-slate-600 font-medium">{t("cta.footer")}</p>
        </motion.div>
      </div>
    </section>
  )
}
