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
 *
 * En móvil el icono pequeño de arriba desaparece y en su lugar el escudo
 * entero ocupa el fondo de la tarjeta, gigante y casi transparente — así no
 * compite con el texto, y todo (título, descripción y los dos datos de
 * abajo) queda centrado. En escritorio no cambia nada: icono pequeño a la
 * izquierda, texto a la izquierda, los otros dos datos en una columna aparte.
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
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 px-6 py-8 sm:px-10 sm:py-9"
      >
        {/* Un resplandor verde detrás del escudo: el color de "esto está a
            salvo", sin tener que decirlo. Solo en escritorio. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-200/40 blur-3xl lg:block"
        />

        {/* El escudo gigante de fondo, solo en móvil: sustituye al icono
            pequeño de arriba — muy tenue, para que se lea como una marca de
            agua y no tape el texto. */}
        <Shield
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-emerald-600/[0.07] lg:hidden"
          strokeWidth={1.2}
        />

        <div className="relative flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:gap-10">
          {/* Lo que importa. Centrado en móvil, a la izquierda con su icono
              en escritorio. */}
          <div className="flex flex-1 flex-col items-center gap-3 text-center sm:gap-4 lg:flex-row lg:items-start lg:gap-5 lg:text-left">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-inset ring-emerald-200 sm:h-14 sm:w-14 lg:flex">
              <Shield className="h-6 w-6 text-emerald-600 sm:h-7 sm:w-7" />
            </div>
            <div>
              <h2 className="text-pretty text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                {t("privacyBanner.title")}
              </h2>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                {t("privacyBanner.description")}
              </p>
            </div>
          </div>

          {/* Los otros dos datos. Centrados en móvil; en escritorio, en una
              columna aparte separada por una línea. */}
          <div className="flex flex-col items-center gap-3 border-slate-200 pt-1 lg:shrink-0 lg:flex-col lg:items-start lg:gap-4 lg:border-l lg:pl-10 lg:pt-0">
            {secundarias.map(({ icono: Icono, texto }) => (
              <div key={texto} className="flex items-center gap-2.5">
                <Icono className="h-4 w-4 shrink-0 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{texto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
