"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language"

export default function AppShowcase() {
  const { t } = useLanguage()

  const items = [
    {
      key: "dashboard",
      image: "/new/showcase-dashboard.png",
      rotate: "rotate-[-4deg]",
      side: "right" as const,
    },
    {
      key: "widget",
      image: "/new/showcase-widget.jpg",
      rotate: "rotate-[4deg]",
      side: "left" as const,
    },
    {
      key: "register",
      image: "/new/showcase-register.jpg",
      rotate: "rotate-[-4deg]",
      side: "right" as const,
    },
    {
      key: "live",
      image: "/new/home-2026.jpg",
      rotate: "rotate-[4deg]",
      side: "left" as const,
    },
  ]

  return (
    <section
      id="app-showcase"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/60">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            {t("appShowcase.badge")}
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("appShowcase.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t("appShowcase.titleAccent")}
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("appShowcase.description")}
          </p>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          {items.map((item, index) => (
            <div
              key={item.key}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                item.side === "left" ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: item.side === "left" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-semibold uppercase tracking-wide mb-5">
                  {t(`appShowcase.items.${item.key}.badge`)}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  {t(`appShowcase.items.${item.key}.title`)}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {t(`appShowcase.items.${item.key}.description`)}
                </p>
              </motion.div>

              {/* Phone mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div className={`relative w-[220px] sm:w-[240px] ${item.rotate} transition-transform hover:rotate-0 duration-500`}>
                  <div className="absolute -inset-6 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 rounded-[3rem] blur-2xl" />
                  <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                    <div className="relative w-full aspect-[9/19] rounded-[1.4rem] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={t(`appShowcase.items.${item.key}.title`)}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
