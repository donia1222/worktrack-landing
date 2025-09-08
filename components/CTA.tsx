"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

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

          <div className="flex flex-col items-center gap-4 mb-8">
            <a
              href="https://apps.apple.com/us/app/vixtime/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block bg-black rounded-xl p-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src="/Download_on_the_App_Store_Badge.svg.png"
                alt={t("cta.downloadButton")}
                width={200}
                height={65}
                className="h-16 w-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <p className="text-sm text-slate-600 font-medium text-center">
              {t("cta.iosAvailability")}
            </p>
          </div>


        </motion.div>
      </div>
    </section>
  )
}
