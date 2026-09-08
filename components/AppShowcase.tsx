"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language"

/**
 * Las cuatro pantallas de la app, juntas.
 *
 * Antes esto era un carrusel fijado (sticky) de cuatro pantallas de alto: una
 * captura de 190 px y tres líneas de texto en medio de un `h-screen`, así que
 * lo que se veía era sobre todo blanco, y había que hacer scroll cuatro veces
 * para ver cuatro imágenes.
 *
 * Ahora se ven las cuatro a la vez, escalonadas —cada una un poco más arriba o
 * más abajo que su vecina—, dentro de un contenedor que las agrupa. Ocupa una
 * pantalla en vez de cuatro y se entiende de un vistazo. En móvil, donde no
 * caben en fila, se deslizan de lado con imán.
 */
export default function AppShowcase() {
  const { t, language } = useLanguage()
  // Solo hay capturas de los tres idiomas que las tienen fotografiadas; el
  // resto ve las inglesas.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  const items = [
    { key: "dashboard", image: `/app/${idioma}/2-home.png` },
    { key: "register", image: `/app/${idioma}/4-calendario.png` },
    { key: "reports", image: `/app/${idioma}/5-informes.png` },
  ]

  // El escalón de cada columna: las de fuera caen y la del medio sube, que es
  // lo que da la curva sin que ninguna se despegue del grupo.
  const escalon = ["lg:translate-y-6", "lg:-translate-y-6", "lg:translate-y-6"]
  const giro = ["lg:-rotate-[2deg]", "lg:rotate-0", "lg:rotate-[2deg]"]

  const contenedor = useRef<HTMLDivElement>(null)
  const aLaVista = useInView(contenedor, { once: true, margin: "-80px" })

  return (
    <section id="app-showcase" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Un halo muy suave detrás del grupo, para que el contenedor no flote
          sobre blanco liso. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
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

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-slate-600 sm:text-lg">
            {t("appShowcase.description")}
          </p>
        </div>

        {/* El contenedor que agrupa las cuatro. En móvil no lleva marco: la
            fila se desliza de lado a lado y un borde la cortaría. */}
        <div
          ref={contenedor}
          className="mt-12 sm:mt-16 lg:rounded-[2.5rem] lg:border lg:border-slate-200/80 lg:bg-gradient-to-b lg:from-slate-50/80 lg:to-white lg:px-10 lg:py-16 lg:shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)]"
        >
          <div
            className="
              -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              sm:gap-7
              lg:mx-0 lg:grid lg:grid-cols-3 lg:justify-items-center lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0
            "
          >
            {items.map((item, i) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 26 }}
                animate={aLaVista ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className={`w-[58vw] max-w-[210px] shrink-0 snap-center sm:w-[44vw] lg:w-full lg:max-w-[220px] ${escalon[i]}`}
              >
                {/* La captura, con su marco. El giro solo en pantallas
                    grandes: en móvil, con las tarjetas casi tocándose, las
                    esquinas inclinadas se pisan entre ellas. */}
                <div className={`group relative mx-auto w-full ${giro[i]} transition-transform duration-500 ease-out lg:hover:rotate-0 lg:hover:-translate-y-1.5`}>
                  <div
                    aria-hidden
                    className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-200/45 to-indigo-200/30 blur-2xl transition-opacity duration-500 lg:opacity-70 lg:group-hover:opacity-100"
                  />
                  <div className="relative rounded-[1.9rem] bg-slate-900 p-1.5 shadow-xl ring-1 ring-slate-900/5">
                    <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.5rem] bg-slate-900">
                      <Image
                        src={item.image}
                        alt={t(`appShowcase.items.${item.key}.title`)}
                        fill
                        sizes="(max-width: 1024px) 60vw, 268px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* El texto, debajo de su captura y no al lado: así cada
                    pantalla se lee junto a lo que enseña. */}
                <div className="mt-6 text-center lg:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {t(`appShowcase.items.${item.key}.badge`)}
                  </p>
                  <h3 className="mt-2 text-pretty text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {t(`appShowcase.items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600">
                    {t(`appShowcase.items.${item.key}.description`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Solo en móvil: dice que la fila se desliza, que sin marco no se
              ve que hay más a la derecha. */}
          <p className="mt-1 text-center text-xs text-slate-400 lg:hidden">
            {t("appShowcase.swipe")}
          </p>
        </div>
      </div>
    </section>
  )
}
