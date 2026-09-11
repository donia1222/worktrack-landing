"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LayoutDashboard, CalendarDays, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

/** La captura del panel principal, una por idioma — sustituye al vídeo. */
const IMAGEN_DASHBOARD = {
  es: "/new/IMG_1454-es.jpeg",
  en: "/new/IMG_1455-en.jpeg",
  de: "/new/IMG_1453-de.jpeg",
} as const

/**
 * Mismo espíritu que la referencia que le gustó: tres tarjetas iguales,
 * cada una con su propio fondo lila suave, un icono arriba, título y
 * descripción centrados, y la captura del teléfono abajo, recta (sin el
 * escalonado ni el giro que tenía antes). Colores e imágenes son los
 * nuestros — solo cambia la maqueta.
 */
export default function AppShowcase() {
  const { t, language } = useLanguage()
  // Solo hay capturas de los tres idiomas que las tienen fotografiadas; el
  // resto ve las inglesas.
  const idioma = (["es", "en", "de"] as const).includes(language as "es" | "en" | "de")
    ? (language as "es" | "en" | "de")
    : "en"

  // Vídeo en vez de foto fija en las otras dos: se ve la app funcionando de
  // verdad, no solo una pantalla parada. El panel principal es la excepción
  // — va con una captura fija, una por idioma.
  const items = [
    { key: "dashboard", video: null, image: IMAGEN_DASHBOARD[idioma], Icono: LayoutDashboard },
    { key: "register", video: `/app-videos/${idioma}/register.mp4`, image: null, Icono: CalendarDays },
    { key: "reports", video: `/app-videos/${idioma}/reports.mp4`, image: null, Icono: BarChart3 },
  ]

  const contenedor = useRef<HTMLDivElement>(null)
  const aLaVista = useInView(contenedor, { once: true, margin: "-80px" })

  return (
    <section id="app-showcase" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-600" />
            {t("appShowcase.badge")}
          </div>

          <h2 className="text-balance text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t("appShowcase.title")}{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              {t("appShowcase.titleAccent")}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-slate-600 sm:text-lg">
            {t("appShowcase.description")}
          </p>
        </div>

        <div ref={contenedor} className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {items.map(({ key, video, image, Icono }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 26 }}
              animate={aLaVista ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center rounded-[2rem] border border-violet-100/70 bg-gradient-to-b from-violet-50/70 to-white px-6 pb-0 pt-8 sm:px-8 sm:pt-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                <Icono className="h-6 w-6 text-violet-600" />
              </span>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-violet-600">
                {t(`appShowcase.items.${key}.badge`)}
              </p>
              <h3 className="mt-1.5 text-balance text-center text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {t(`appShowcase.items.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-xs text-pretty text-center text-sm leading-relaxed text-slate-600">
                {t(`appShowcase.items.${key}.description`)}
              </p>

              {/* El vídeo, recto y completo — antes le faltaba el borde de
                  abajo (quería que "sangrara" fuera de la tarjeta) y el
                  teléfono se veía cortado a medias. Marco entero, como en
                  el resto de la web. */}
              <div className="relative mt-8 w-full max-w-[220px] pb-8">
                <div className="relative rounded-[1.9rem] bg-slate-900 p-1.5 shadow-xl ring-1 ring-slate-900/5">
                  <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.5rem] bg-slate-900">
                    {image ? (
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <video
                        src={video ?? undefined}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
