"use client"

import { useEffect, useState } from "react"

/**
 * Las capturas del cronómetro (3-timer-es/en/de.png) son fijas, pero el
 * "00:00:25" que se ve dentro no lo es de verdad: esto tapa ese trozo exacto
 * de la imagen (medido en píxeles sobre cada PNG) y pinta encima un
 * cronómetro que sí corre, con la misma tipografía y color, para que
 * parezca que el móvil está contando en directo. Se usa tanto en el Hero
 * como en el bloque de AutoTimer — misma captura, mismo overlay.
 *
 * También tapa la línea de debajo ("TIMER MANUAL · EMPEZÓ A LAS...") con un
 * banner "Estás trabajando" traducido — más claro que la hora de inicio para
 * entender de un vistazo por qué está corriendo el tiempo.
 */
function tiempoFormateado(segundos: number) {
  const h = Math.floor(segundos / 3600)
  const m = Math.floor((segundos % 3600) / 60)
  const s = segundos % 60
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":")
}

// Arranca en 7h 03min: se ve una jornada ya en marcha desde que aparece la
// imagen, en vez de un cronómetro a cero que parece recién empezado.
const SEGUNDOS_INICIALES = 7 * 3600 + 3 * 60

// La captura en inglés (3-timer-en.png) no es la misma imagen que la de
// es/de: mide 1206x2491 en vez de 1206x2622, y tanto el hueco del
// cronómetro como la línea de debajo caen en otra posición vertical.
const POSICION_POR_IDIOMA: Record<string, { numeros: { top: string; height: string }; banner: { top: string; height: string } }> = {
  es: { numeros: { top: "32.6%", height: "4.5%" }, banner: { top: "39%", height: "3%" } },
  de: { numeros: { top: "32.6%", height: "4.5%" }, banner: { top: "39.1%", height: "3%" } },
  en: { numeros: { top: "27.3%", height: "5.6%" }, banner: { top: "34.9%", height: "3%" } },
}

export default function LiveTimerOverlay({ idioma, texto }: { idioma: string; texto: string }) {
  const [segundos, setSegundos] = useState(SEGUNDOS_INICIALES)

  useEffect(() => {
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const posicion = POSICION_POR_IDIOMA[idioma] ?? POSICION_POR_IDIOMA.es

  return (
    <>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "22.3%",
          right: "22.2%",
          top: posicion.numeros.top,
          height: posicion.numeros.height,
          backgroundColor: "#f5f5f9",
        }}
      >
        <span
          className="text-[16px] font-bold tabular-nums tracking-tight sm:text-[17px]"
          style={{ color: "rgb(32, 40, 57)" }}
        >
          {tiempoFormateado(segundos)}
        </span>
      </div>

      <div
        className="absolute flex items-center justify-center px-2"
        style={{
          left: "8%",
          right: "8%",
          top: posicion.banner.top,
          height: posicion.banner.height,
          backgroundColor: "#f5f5f9",
        }}
      >
        <span
          className="text-[13px] font-bold uppercase tracking-tight sm:text-[14px]"
          style={{ color: "rgb(84, 182, 133)" }}
        >
          {texto}
        </span>
      </div>
    </>
  )
}
