"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language"
import { useEsMac } from "@/lib/aparato"

/**
 * «También en tu Mac»: la sección que solo ven quienes abren la web desde un
 * Mac.
 *
 * Se enseña únicamente ahí a propósito. A quien entra desde el móvil no le
 * aporta nada ver capturas de escritorio —se descarga la app en el teléfono—
 * y además alarga una página que ya es larga. A quien entra desde un Mac sí:
 * es la duda que tiene en ese momento, «¿esto funciona en mi ordenador o es
 * solo para el móvil?».
 *
 * Hasta que el navegador contesta, `useEsMac()` vale `false` y la sección no
 * existe. Es lo correcto: aparecer tarde es mejor que ocupar sitio en el
 * móvil mientras se decide.
 */
const PANTALLAS = [
  { fichero: "trabajo", ancho: 1179, alto: 838 },
  { fichero: "calendario", ancho: 796, alto: 677 },
  { fichero: "informes", ancho: 1134, alto: 780 },
] as const

export default function EnElMac() {
  const { t } = useLanguage()
  const esMac = useEsMac()

  if (!esMac) return null

  return (
    <section id="mac" className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("mac.section_title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("mac.section_text")}
          </p>
        </div>

        {/* Las tres, una debajo de otra y a tamaño grande. En un Mac hay
            ancho de sobra: ponerlas en fila las dejaria tan pequeñas que no
            se leeria lo que enseñan, que es justamente el detalle. */}
        <div className="mt-14 space-y-10">
          {PANTALLAS.map((p) => (
            <div
              key={p.fichero}
              className="overflow-hidden rounded-xl shadow-xl shadow-slate-900/15 ring-1 ring-slate-900/5"
            >
              <Image
                src={`/mac/${p.fichero}.png`}
                alt=""
                width={p.ancho}
                height={p.alto}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">{t("mac.caption")}</p>
      </div>
    </section>
  )
}
