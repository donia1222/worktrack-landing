"use client"

import { motion } from "framer-motion"
import { CreditCard, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language"

export default function SalaryStats() {
  const { t, language } = useLanguage()
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  const points = [
    {
      icon: CreditCard,
      title: t("salaryStats.points.earnings.title"),
      description: t("salaryStats.points.earnings.description"),
    },
    {
      icon: BarChart3,
      title: t("salaryStats.points.weekly.title"),
      description: t("salaryStats.points.weekly.description"),
    },
  ]

  return (
    <section id="salary-stats" className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* La misma línea lila ondulada de fondo que en AutoTimer, para que no
          se quede en blanco liso — solo en escritorio, donde el teléfono y
          el texto van en fila y el centro de la sección coincide con el
          centro del teléfono. */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
        style={{ height: "380px" }}
        viewBox="0 0 1200 380"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -20 260 C 160 120, 340 340, 540 200 S 900 60, 1100 180 T 1220 140"
          stroke="#5B5FEF"
          strokeOpacity="0.35"
          strokeWidth="36"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center mb-12 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-4 py-2 text-sm font-medium text-[#5B5FEF]">
            <span className="h-2 w-2 rounded-full bg-[#5B5FEF]" />
            {t("salaryStats.badge")}
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("salaryStats.title")} <span className="text-[#5B5FEF]">{t("salaryStats.titleAccent")}</span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t("salaryStats.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1 py-6"
          >
            {/* La misma línea, solo para móvil: sangra a los dos lados hasta
                el borde de la pantalla con el truco del 50vw, pegada al
                propio bloque del teléfono. */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -ml-[50vw] w-screen -translate-y-1/2 lg:hidden"
              style={{ height: "220px" }}
              viewBox="0 0 800 220"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M -20 150 C 110 70, 240 190, 400 120 S 660 40, 820 110"
                stroke="#5B5FEF"
                strokeOpacity="0.35"
                strokeWidth="28"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute -inset-8 rounded-[3rem] bg-[#5B5FEF]/10 blur-3xl" />

            <div className="relative w-[230px] sm:w-[260px] mx-auto">
              <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                <div className="relative w-full aspect-[9/19] rounded-[1.4rem] overflow-hidden">
                  <video
                    src={`/app-videos/${idioma}/salary.mp4`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 order-1 lg:order-2"
          >
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-5 rounded-2xl bg-[#F7F6FE] p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#5B5FEF]/15">
                  <point.icon className="w-7 h-7 text-[#5B5FEF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
