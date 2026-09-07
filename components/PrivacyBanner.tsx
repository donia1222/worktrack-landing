"use client"

import { motion } from "framer-motion"
import { Shield, Globe, WifiOff } from "lucide-react"
import { useLanguage } from "@/lib/language"

/**
 * La promesa de privacidad, en una franja.
 *
 * Sin reseñas todavía, esto es lo que convence a alguien de descargar: que
 * no hay cuenta, que no hay servidor y que lo que registra no sale de su
 * teléfono. Antes vivía como dos insignias grises al final de una sección
 * larga, donde no las leía nadie.
 *
 * El almacenamiento local manda —es el argumento— y los otros dos datos van
 * al lado, más pequeños, sin robarle sitio.
 */
export default function PrivacyBanner() {
  const { t } = useLanguage()

  const secundarias = [
    { icono: Globe, texto: t("privacyBanner.languages") },
    { icono: WifiOff, texto: t("privacyBanner.offline") },
  ]

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-9"
      >
        {/* Un resplandor verde detrás del escudo: el color de "esto está a
            salvo", sin tener que decirlo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl"
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
          {/* Lo que importa. */}
          <div className="flex flex-1 items-start gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-inset ring-emerald-400/25 sm:h-14 sm:w-14">
              <Shield className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" />
            </div>
            <div>
              <h2 className="text-pretty text-xl font-bold leading-snug text-white sm:text-2xl">
                {t("privacyBanner.title")}
              </h2>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
                {t("privacyBanner.description")}
              </p>
            </div>
          </div>

          {/* Los otros dos datos. Separados por una línea en escritorio, que
              es donde van al lado y no debajo. */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-slate-700/60 pt-1 lg:shrink-0 lg:flex-col lg:gap-4 lg:border-l lg:pl-10 lg:pt-0">
            {secundarias.map(({ icono: Icono, texto }) => (
              <div key={texto} className="flex items-center gap-2.5">
                <Icono className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="text-sm font-medium text-slate-200">{texto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
