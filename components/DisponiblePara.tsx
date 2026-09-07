"use client"

import { useLanguage } from "@/lib/language"

/**
 * «Disponible para»: la franja del hero que dice en qué aparatos corre la app.
 *
 * Los dibujos van a mano y no como iconos de librería por una razón práctica:
 * un iPhone y un iPad de una librería genérica son el mismo rectángulo con
 * distinta proporción, y aquí lo que tiene que leerse de un vistazo es
 * justamente la diferencia entre uno y otro. Cada uno lleva su detalle —la
 * isla del teléfono, la cámara del iPad, la corona del reloj— y todos comparten
 * grosor de línea, así que juntos parecen una familia y no un pegote.
 *
 * El Mac entra el 07/09/2026, despues de probarlo: la app corre en Apple
 * Silicon y desde el ancho de 1100pt aprovecha la ventana en vez de quedarse
 * en una columna de telefono en medio de la pantalla. Se nombra ahora porque
 * esta comprobado, no porque sea compatible sobre el papel.
 */

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function IPhone() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <g {...trazo}>
        <rect x="13" y="5" width="14" height="30" rx="4" />
        <rect x="17" y="8" width="6" height="1.6" rx="0.8" fill="currentColor" stroke="none" />
        <line x1="17" y1="32" x2="23" y2="32" />
      </g>
    </svg>
  )
}

function IPad() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <g {...trazo}>
        <rect x="9" y="6" width="22" height="28" rx="3" />
        <rect x="12" y="10" width="16" height="20" rx="1" />
        <circle cx="20" cy="8" r="0.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

function AppleWatch() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <g {...trazo}>
        <rect x="13" y="13" width="14" height="16" rx="4.5" />
        <path d="M15.5 13V9.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2V13" />
        <path d="M15.5 29v3.5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V29" />
        <path d="M27 18.5v3" />
      </g>
    </svg>
  )
}

function Mac() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <g {...trazo}>
        <rect x="8" y="9" width="24" height="16" rx="2" />
        <path d="M5 29h30l-2-4H7l-2 4Z" />
        <line x1="17" y1="27" x2="23" y2="27" />
      </g>
    </svg>
  )
}

const aparatos = [
  { clave: "iphone", nombre: "iPhone", Dibujo: IPhone },
  { clave: "ipad", nombre: "iPad", Dibujo: IPad },
  { clave: "watch", nombre: "Apple Watch", Dibujo: AppleWatch },
  { clave: "mac", nombre: "Mac", Dibujo: Mac },
]

export default function DisponiblePara({ className = "" }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <div
      className={`mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl border border-white/60 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-md sm:flex-row sm:justify-center sm:gap-8 ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {t("hero.disponible")}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
        {aparatos.map(({ clave, nombre, Dibujo }) => (
          <div key={clave} className="flex flex-col items-center gap-1 text-slate-700">
            <Dibujo />
            <span className="text-xs font-medium text-slate-600">{nombre}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
