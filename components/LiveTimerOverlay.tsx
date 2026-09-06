"use client"

import { useState } from "react"
import { horaInicioTrabajo, tiempoFormateado, useSegundosTrabajados } from "@/lib/liveTimer"

/**
 * Las capturas del cronómetro (3-timer-es/en/de.png) son fijas, pero varias
 * cosas que se ven dentro no lo son de verdad: aquí se tapan esos trozos
 * exactos de la imagen (medidos en píxeles sobre cada PNG, que ya vienen con
 * esas zonas borradas de fábrica) y se pinta encima contenido real —
 * fecha de hoy, cronómetro corriendo, hora de inicio — para que parezca que
 * el móvil está mostrando la jornada en directo. Se usa tanto en el Hero
 * como en el bloque de AutoTimer — misma captura, mismo overlay.
 */
// La fecha real de hoy, con el mismo formato que traía la captura original
// en cada idioma ("Viernes, 4 de septiembre" / "Freitag, 4. September" /
// "Friday, September 4"). El español la necesita con la mayúscula inicial a
// mano porque el locale es-ES devuelve el día de la semana en minúscula.
function fechaFormateada(idioma: string, hoy: Date) {
  if (idioma === "en") {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(hoy)
  }
  if (idioma === "de") {
    return new Intl.DateTimeFormat("de-DE", { weekday: "long", month: "long", day: "numeric" }).format(hoy)
  }
  const texto = new Intl.DateTimeFormat("es-ES", { weekday: "long", month: "long", day: "numeric" }).format(hoy)
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// La hora de inicio de la jornada: en inglés con AM/PM (como es habitual en
// EE. UU.), en español/alemán en formato 24h.
function horaFormateada(idioma: string, fecha: Date) {
  if (idioma === "en") {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(fecha)
  }
  return new Intl.DateTimeFormat(idioma === "de" ? "de-DE" : "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(fecha)
}

// La captura en inglés (3-timer-en.png) no es la misma imagen que la de
// es/de: mide 1206x2491 en vez de 1206x2622, y las tres zonas borradas
// (fecha, cronómetro, línea de estado) caen en otra posición vertical.
const POSICION_POR_IDIOMA: Record<
  string,
  { fecha: { top: string; height: string }; numeros: { top: string; height: string }; banner: { top: string; height: string } }
> = {
  es: {
    fecha: { top: "12.2%", height: "5.6%" },
    numeros: { top: "32.6%", height: "4.5%" },
    banner: { top: "38.7%", height: "6.4%" },
  },
  de: {
    fecha: { top: "12.2%", height: "5.6%" },
    numeros: { top: "32.6%", height: "4.5%" },
    banner: { top: "38.7%", height: "6.4%" },
  },
  en: {
    fecha: { top: "6.7%", height: "5.6%" },
    numeros: { top: "27.3%", height: "5.6%" },
    banner: { top: "34.5%", height: "7%" },
  },
}

export default function LiveTimerOverlay({
  idioma,
  texto,
  textoInicio,
}: {
  idioma: string
  texto: string
  textoInicio: string
}) {
  // Mismo punto de partida que el reloj (lib/liveTimer.ts): los dos cuentan
  // exactamente lo mismo, no cada uno por su cuenta desde que se monta.
  const segundos = useSegundosTrabajados()
  const [hoy] = useState(() => new Date())
  const [horaInicio] = useState(horaInicioTrabajo)

  const posicion = POSICION_POR_IDIOMA[idioma] ?? POSICION_POR_IDIOMA.es

  return (
    <>
      <div
        className="absolute flex items-center justify-start px-2"
        style={{
          left: "5.5%",
          right: "8%",
          top: posicion.fecha.top,
          height: posicion.fecha.height,
        }}
      >
        <span
          className="whitespace-nowrap text-[9px] font-bold tracking-tight sm:text-[14px]"
          style={{ color: "rgb(32, 40, 57)" }}
        >
          {fechaFormateada(idioma, hoy)}
        </span>
      </div>

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
        className="absolute flex flex-col items-center justify-center gap-1 px-2"
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
        <span className="text-[10.5px] font-medium tracking-tight sm:text-[11.5px]" style={{ color: "rgb(100, 116, 139)" }}>
          {textoInicio} {horaFormateada(idioma, horaInicio)}
        </span>
      </div>
    </>
  )
}
