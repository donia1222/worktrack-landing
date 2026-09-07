"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language"

// Un componente aparte para cada punto: useTransform no se puede llamar
// dentro de un .map() suelto (rompe las reglas de hooks), pero sí una vez
// por cada instancia de este componente.
function PuntoProgreso({ progreso, inicio, fin }: { progreso: MotionValue<number>; inicio: number; fin: number }) {
  const opacidad = useTransform(progreso, [inicio, (inicio + fin) / 2, fin], [0.3, 1, 0.3])
  return <motion.span style={{ opacity: opacidad }} className="h-1.5 w-6 rounded-full bg-blue-600" />
}

/**
 * Las cuatro capturas ya no van una debajo de otra: la sección se queda fija
 * en pantalla (sticky, gracias a que <main> usa overflow-x-clip y no rompe
 * sticky) mientras se hace scroll, y en ese tramo las capturas van pasando
 * en horizontal, una a una. Al llegar a la última, el scroll vuelve a
 * moverse en vertical con normalidad.
 */
export default function AppShowcase() {
  const { t, language } = useLanguage()
  // Solo hay capturas de los tres idiomas de la landing.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  const items = [
    { key: "dashboard", image: `/app/${idioma}/2-home.png`, rotate: "rotate-[-3deg]" },
    { key: "register", image: `/app/${idioma}/4-calendario.png`, rotate: "rotate-[3deg]" },
    { key: "reports", image: `/app/${idioma}/5-informes.png`, rotate: "rotate-[-3deg]" },
    { key: "salary", image: `/app/${idioma}/6-salario.png`, rotate: "rotate-[3deg]" },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(items.length - 1) * 100}%`])

  return (
    <section
      id="app-showcase"
      ref={containerRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 lg:pt-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            {t("appShowcase.badge")}
          </div>

          <h2 className="text-balance text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t("appShowcase.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t("appShowcase.titleAccent")}
            </span>
          </h2>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div style={{ x }} className="flex h-full">
            {items.map((item) => (
              <div key={item.key} className="flex h-full w-screen shrink-0 items-center justify-center px-6">
                <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="order-2 text-center lg:order-1 lg:text-left">
                    <div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {t(`appShowcase.items.${item.key}.badge`)}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
                      {t(`appShowcase.items.${item.key}.title`)}
                    </h3>
                    <p className="mx-auto max-w-md text-base text-slate-600 leading-relaxed sm:text-lg lg:mx-0">
                      {t(`appShowcase.items.${item.key}.description`)}
                    </p>
                  </div>

                  <div className="order-1 flex justify-center lg:order-2">
                    <div className={`relative w-[160px] sm:w-[190px] ${item.rotate} transition-transform duration-500 hover:rotate-0`}>
                      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-2xl" />
                      <div className="relative rounded-[2rem] bg-slate-900 p-2 shadow-2xl">
                        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.4rem]">
                          <Image
                            src={item.image}
                            alt={t(`appShowcase.items.${item.key}.title`)}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Puntos de progreso: qué captura toca según el scroll. */}
        <div className="flex justify-center gap-2 pb-8">
          {items.map((item, i) => (
            <PuntoProgreso
              key={item.key}
              progreso={scrollYProgress}
              inicio={i / items.length}
              fin={(i + 1) / items.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
