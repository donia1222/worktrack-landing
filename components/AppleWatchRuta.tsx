"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language"
import CajaDeReloj, { CAJA_ALTO, CAJA_ANCHO } from "./CajaDeReloj"

/**
 * Las cuatro pantallas del Apple Watch, colgadas de un hilo que serpentea.
 *
 * El bloque se "engancha" a la pantalla al llegar hasta él: el scroll deja
 * de mover la página y en su lugar desliza el hilo hacia la izquierda,
 * enseñando las cuatro capturas una detrás de otra. Solo cuando ya se ve la
 * última, seguir bajando vuelve a mover la página — igual en el teléfono
 * que en el escritorio, porque el hilo mide más que cualquiera de los dos.
 *
 * Mismo truco que `ScrollTextReveal`: nada de `position: sticky` (rompía
 * contra el `overflow-x-hidden` que tenía `<main>` en su momento) sino
 * `position: fixed` calculado a mano según en qué tramo del scroll estamos.
 * Ahora `<main>` ya usa `overflow-x-clip`, pero se mantiene el mismo patrón
 * por consistencia con el resto de la web y porque ya está probado que
 * funciona.
 */

/**
 * La geometría, toda en píxeles y toda aquí.
 *
 * El hilo es un SVG con `preserveAspectRatio="none"`: se estira a lo ancho
 * —da igual, es una curva— pero a lo alto no, porque la caja mide
 * exactamente lo que dice el `viewBox`. Así una `y` de aquí es la misma `y`
 * en pantalla, y los puntos del hilo caen donde tienen que caer sin
 * depender del ancho.
 */
const ALTO = 620
const ANCHO_VIRTUAL = 1000
/** El ancho real del carril: más que cualquier viewport (incluso con
 *  `max-w-7xl` a pantalla completa), para que siempre haya tramo que
 *  recorrer deslizando, tanto en el teléfono como en escritorio. */
const ANCHO_PISTA = 1600
/** Lo que ocupa el nombre de la pantalla, con su aire. */
const ALTO_DEL_NOMBRE = 28 + 12
/** Del borde de arriba de la tarjeta al de abajo del reloj. */
const HASTA_EL_MARCO = ALTO_DEL_NOMBRE + CAJA_ALTO
/** Lo que baja el punto respecto al reloj, para no pisarlo. */
const CAIDA_DEL_PUNTO = 10

const PARADAS = [
  { x: 14, arriba: true },
  { x: 38, arriba: false },
  { x: 62, arriba: true },
  { x: 86, arriba: false },
] as const

/** Arriba y abajo del hilo, alternando: es lo que lo hace un recorrido. */
const TOPE_ARRIBA = 10
const TOPE_ABAJO = 190
const NUDO_ARRIBA = TOPE_ARRIBA + HASTA_EL_MARCO + CAIDA_DEL_PUNTO
const NUDO_ABAJO = TOPE_ABAJO + HASTA_EL_MARCO + CAIDA_DEL_PUNTO

const topeDe = (arriba: boolean) => (arriba ? TOPE_ARRIBA : TOPE_ABAJO)
const nudoDe = (arriba: boolean) => (arriba ? NUDO_ARRIBA : NUDO_ABAJO)

/** La curva, pasando por los cuatro nudos y saliéndose por los dos lados. */
const HILO = (() => {
  const x = (p: number) => (p / 100) * ANCHO_VIRTUAL
  const puntos = PARADAS.map((p) => ({ x: x(p.x), y: nudoDe(p.arriba) }))
  const tiron = 90
  let d = `M ${-tiron} ${NUDO_ABAJO} C ${x(2)} ${NUDO_ABAJO}, ${puntos[0].x - tiron} ${puntos[0].y}, ${puntos[0].x} ${puntos[0].y}`
  for (let i = 0; i < puntos.length - 1; i++) {
    const a = puntos[i]
    const b = puntos[i + 1]
    d += ` C ${a.x + tiron} ${a.y}, ${b.x - tiron} ${b.y}, ${b.x} ${b.y}`
  }
  const ultimo = puntos[puntos.length - 1]
  d += ` C ${ultimo.x + tiron} ${ultimo.y}, ${ANCHO_VIRTUAL - 20} ${NUDO_ARRIBA}, ${ANCHO_VIRTUAL + tiron} ${NUDO_ARRIBA}`
  return d
})()

const PANTALLAS = ["timer", "registrar", "calendario", "semana"] as const
const FICHEROS = ["1-timer", "2-registrar", "3-calendario", "4-semana"] as const

type Fase = "antes" | "fijo" | "despues"

export default function AppleWatchRuta() {
  const { t, language } = useLanguage()
  // Las capturas solo están en los tres idiomas fotografiados; el resto las ve
  // en inglés, que es mejor que una imagen rota.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [anchoViewport, setAnchoViewport] = useState(0)
  const [fase, setFase] = useState<Fase>("antes")
  const [progreso, setProgreso] = useState(0)

  const distanciaHorizontal = Math.max(0, ANCHO_PISTA - anchoViewport)
  // Hace falta más scroll vertical que horizontal recorrido, para que el
  // deslizamiento se sienta pausado y no un tirón. El +400 es un suelo:
  // sin él, si el viewport llegara a medir casi lo mismo que la pista, el
  // "enganche" duraría un instante y se notaría como un tropiezo.
  const distanciaVertical = distanciaHorizontal * 1.3 + 400

  useEffect(() => {
    function medir() {
      if (viewportRef.current) setAnchoViewport(viewportRef.current.clientWidth)
    }
    medir()
    window.addEventListener("resize", medir)
    return () => window.removeEventListener("resize", medir)
  }, [])

  useEffect(() => {
    let ticking = false

    const actualizar = () => {
      ticking = false
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const alturaVentana = window.innerHeight

      if (rect.top > 0) {
        setFase("antes")
        setProgreso(0)
      } else if (rect.bottom <= alturaVentana) {
        setFase("despues")
        setProgreso(1)
      } else {
        setFase("fijo")
        setProgreso(Math.min(1, Math.max(0, -rect.top / distanciaVertical)))
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(actualizar)
      }
    }

    actualizar()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [distanciaVertical])

  const posicionCarril =
    fase === "fijo"
      ? "fixed inset-x-0 top-0"
      : fase === "despues"
        ? "absolute inset-x-0 bottom-0"
        : "absolute inset-x-0 top-0"

  return (
    <section id="apple-watch" className="relative overflow-hidden bg-white pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* El mismo halo lila que el resto de secciones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-600" />
            {t("watch.badge")}
          </div>

          <h2 className="text-balance text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t("watch.title")}{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              {t("watch.titleAccent")}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-slate-600 sm:text-lg">
            {t("watch.description")}
          </p>
        </div>
      </div>

      {/* El carril: se "engancha" a pantalla completa mientras dura el
          deslizamiento, y solo entonces libera el scroll de la página. */}
      <div
        ref={containerRef}
        className="relative mt-12 sm:mt-14"
        style={{ height: `calc(100vh + ${distanciaVertical}px)` }}
      >
        <div className={`${posicionCarril} z-10 flex h-screen items-center overflow-hidden`}>
          <div ref={viewportRef} className="mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
            <div
              className="relative"
              style={{
                height: ALTO,
                width: ANCHO_PISTA,
                transform: `translateX(${-progreso * distanciaHorizontal}px)`,
              }}
            >
              <svg
                aria-hidden
                viewBox={`0 0 ${ANCHO_VIRTUAL} ${ALTO}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <path
                  d={HILO}
                  fill="none"
                  stroke="rgb(196 181 253)"
                  strokeWidth="3"
                  strokeDasharray="12 12"
                  strokeLinecap="round"
                  // Sin esto, el trazo se estiraría a lo ancho con el resto
                  // del dibujo y saldría un guion gordo y otro fino.
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Los puntos van en HTML y no dentro del SVG: ahí, con el
                  dibujo estirado a lo ancho, un círculo saldría ovalado. */}
              {PARADAS.map((parada, i) => (
                <span
                  key={`punto-${i}`}
                  aria-hidden
                  className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500 ring-8 ring-violet-500/15"
                  style={{ left: `${parada.x}%`, top: nudoDe(parada.arriba) }}
                />
              ))}

              {PANTALLAS.map((clave, i) => {
                const parada = PARADAS[i]
                return (
                  <div
                    key={clave}
                    className="absolute flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${parada.x}%`, top: topeDe(parada.arriba), width: CAJA_ANCHO }}
                  >
                    <p className="mb-3 h-7 text-center text-lg font-bold leading-7 text-violet-600">
                      {t(`watch.shots.${clave}.label`)}
                    </p>

                    {/* Dentro de un Apple Watch de verdad, no en un
                        rectángulo negro: son pantallas de reloj, y en una
                        caja cualquiera se leen como recortes sueltos. */}
                    <CajaDeReloj>
                      <Image
                        src={`/reloj-capturas/reloj-${idioma}/${FICHEROS[i]}.png`}
                        alt={t(`watch.shots.${clave}.label`)}
                        fill
                        sizes="172px"
                        className="object-cover"
                      />
                    </CajaDeReloj>

                    <p className="mt-6 text-balance text-center text-[13.5px] leading-snug text-slate-600">
                      {t(`watch.shots.${clave}.body`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
