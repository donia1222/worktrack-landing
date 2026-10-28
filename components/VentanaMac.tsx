"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/**
 * LA VENTANA DEL MAC, para el hero y para la sección de escritorio.
 *
 * Las capturas vienen tal cual del Mac y **ya traen la ventana con sus tres
 * botones de colores**, así que aquí no se dibuja ningún marco: solo las
 * esquinas redondeadas y una sombra para despegarla del fondo. Ponerle otro
 * marco encima daría dos ventanas, una dentro de otra.
 *
 * Van rotando como los vídeos del teléfono, por lo mismo: en un vistazo se
 * enseña que la app tiene tres pantallas y no una.
 */
const PANTALLAS = [
  { fichero: "trabajo", ancho: 1179, alto: 838 },
  { fichero: "calendario", ancho: 796, alto: 677 },
  { fichero: "informes", ancho: 1134, alto: 780 },
] as const

export default function VentanaMac({
  intervalo = 4200,
  prioridad = false,
}: {
  /** Milisegundos por pantalla. 0 deja la primera fija. */
  intervalo?: number
  prioridad?: boolean
}) {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (!intervalo) return
    const id = setInterval(() => setActual((a) => (a + 1) % PANTALLAS.length), intervalo)
    return () => clearInterval(id)
  }, [intervalo])

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* El halo lila de debajo, el mismo recurso que lleva el teléfono. */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-[#7A2FF8]/12 blur-3xl" />

      <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/5">
        {/* Todas apiladas y solo una visible: así el navegador ya las tiene
            descargadas cuando toca cambiar y no parpadea en blanco. La
            primera manda el alto de la caja; las demás van encima. */}
        {PANTALLAS.map((p, i) => (
          <Image
            key={p.fichero}
            src={`/mac/${p.fichero}.png`}
            alt=""
            width={p.ancho}
            height={p.alto}
            priority={prioridad && i === 0}
            className={`w-full transition-opacity duration-700 ${
              i === actual ? "opacity-100" : "opacity-0"
            } ${i === 0 ? "relative" : "absolute inset-0 h-full object-cover object-top"}`}
          />
        ))}
      </div>
    </div>
  )
}
