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

// El reloj de la barra de estado (arriba a la izquierda, "15:30" en la
// captura original): a diferencia de la hora de inicio, iOS nunca le pone
// AM/PM ahí, ni en región de EE. UU. — solo cambia entre 12h y 24h.
function horaStatusBar(idioma: string, fecha: Date) {
  if (idioma === "en") {
    const h = fecha.getHours() % 12 || 12
    return `${h}:${String(fecha.getMinutes()).padStart(2, "0")}`
  }
  return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`
}

// Las tres capturas (3-timer-es/en/de.png) comparten ya el mismo diseño y
// medidas, así que las tres zonas borradas caen en el mismo sitio.
const POSICION = {
  reloj: { top: "2.6%", height: "2.4%" },
  fecha: { top: "12.2%", height: "5.6%" },
  numeros: { top: "32.6%", height: "4.5%" },
  banner: { top: "38.7%", height: "6.4%" },
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

  return (
    <>
      <div
        className="absolute flex items-center justify-start px-2"
        style={{
          left: "3.5%",
          right: "70%",
          top: POSICION.reloj.top,
          height: POSICION.reloj.height,
        }}
      >
        <span
          className="whitespace-nowrap text-[9px] font-semibold tabular-nums tracking-tight sm:text-[11px]"
          style={{ color: "rgb(10, 10, 12)" }}
        >
          {horaStatusBar(idioma, hoy)}
        </span>
      </div>

      <div
        className="absolute flex items-center justify-start px-2"
        style={{
          left: "5.5%",
          right: "8%",
          top: POSICION.fecha.top,
          height: POSICION.fecha.height,
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
          top: POSICION.numeros.top,
          height: POSICION.numeros.height,
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
          top: POSICION.banner.top,
          height: POSICION.banner.height,
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
