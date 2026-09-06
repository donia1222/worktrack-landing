"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language"

/**
 * El efecto tipo opalapp.com: al llegar aquí, el scroll se "congela" — la
 * página dentro de esta sección deja de avanzar visualmente y en su lugar
 * el texto se va iluminando palabra por palabra. Solo cuando la frase entera
 * se ha revelado, seguir haciendo scroll vuelve a mover la página.
 *
 * No se usa `position: sticky` porque `<main>` lleva `overflow-x-hidden`, y
 * eso rompe sticky (el navegador fuerza overflow-y a `auto` en cuanto un eje
 * dejar de ser `visible`, y sticky deja de anclarse contra el viewport).
 * En su lugar se calcula a mano en qué tramo del scroll estamos y se usa
 * `position: fixed` mientras dura ese tramo — inmune a ese problema.
 */

// Cuánto scroll (en píxeles) hace falta por palabra para que se revele.
const PX_POR_PALABRA = 55

type Fase = "antes" | "fijo" | "despues"

// Colores de la palabra sin revelar y revelada, para interpolar entre ambos.
const COLOR_APAGADO: [number, number, number] = [148, 163, 184] // slate-400
const COLOR_VIVO: [number, number, number] = [15, 23, 42] // slate-900

// El nombre de la app, al revelarse, no se queda en el mismo gris oscuro que
// el resto de la frase: coge los dos colores del logo de la cabecera
// (Navigation.tsx), "Work" en azul y "TimeControl." en índigo.
const COLOR_WORK: [number, number, number] = [0, 122, 255] // #007AFF
const COLOR_TIMECONTROL: [number, number, number] = [88, 86, 214] // #5856D6

function mezclarColor(t: number, destino: [number, number, number] = COLOR_VIVO): string {
  const [r1, g1, b1] = COLOR_APAGADO
  const [r2, g2, b2] = destino
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export default function ScrollTextReveal() {
  const { t } = useLanguage()

  // Las líneas del texto (separadas con "\n" en el JSON de traducciones) se
  // fuerzan con <br/>: así "WorkTimeControl" siempre cae en su propia línea
  // en vez de partirse donde toque según el ancho de pantalla.
  const words = t("scrollReveal.text")
    .split("\n")
    .flatMap((linea, li) =>
      linea
        .trim()
        .split(" ")
        .map((texto, wi) => ({ texto, saltoAntes: li > 0 && wi === 0 }))
    )

  const containerRef = useRef<HTMLDivElement>(null)
  const [progreso, setProgreso] = useState(0)
  const [fase, setFase] = useState<Fase>("antes")

  const distanciaRevelado = words.length * PX_POR_PALABRA

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
        setProgreso(Math.min(1, Math.max(0, -rect.top / distanciaRevelado)))
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
  }, [distanciaRevelado])

  const posicionTexto =
    fase === "fijo"
      ? "fixed inset-x-0 top-0"
      : fase === "despues"
        ? "absolute inset-x-0 bottom-0"
        : "absolute inset-x-0 top-0"

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"
      style={{ height: `calc(100vh + ${distanciaRevelado}px)` }}
    >
      <div className={`${posicionTexto} z-10 flex h-screen items-center justify-center px-6`}>
        <p className="max-w-4xl text-center text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
          {words.map(({ texto, saltoAntes }, i) => {
            const inicio = i / words.length
            const fin = inicio + 1 / words.length
            const progresoPalabra = Math.min(1, Math.max(0, (progreso - inicio) / (fin - inicio)))

            // El nombre de la app va partido en dos colores, como en la
            // cabecera: "Work" + "TimeControl." — el resto de palabras se
            // pintan normal, en un solo tramo.
            const esNombreApp = texto === "WorkTimeControl."

            return (
              <span key={i}>
                {saltoAntes && <br />}
                <span className="mr-[0.28em] inline-block">
                  {esNombreApp ? (
                    <>
                      <span style={{ color: mezclarColor(progresoPalabra, COLOR_WORK) }}>Work</span>
                      <span style={{ color: mezclarColor(progresoPalabra, COLOR_TIMECONTROL) }}>TimeControl.</span>
                    </>
                  ) : (
                    <span style={{ color: mezclarColor(progresoPalabra) }}>{texto}</span>
                  )}
                </span>
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
