"use client"

import Image from "next/image"
import { useState } from "react"
import { useLanguage } from "@/lib/language"

const APP_STORE_URL =
  "https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"

/** Proporción del distintivo, para que no dé un salto al cargar. */
const ANCHO = 580
const ALTO = 200

interface AppStoreBadgeProps {
  /** De dónde salió el toque, para el píxel. */
  zona: string
  /** Alto en píxeles. El ancho sale solo. */
  alto?: number
  className?: string
}

/**
 * El distintivo de la App Store, en el idioma de quien mira.
 *
 * Apple publica este distintivo traducido a unos cuarenta idiomas y sus
 * normas piden usarlo tal cual, sin retocarlo. Así que el componente busca
 * primero `/appstore/<idioma>.png`; si ese idioma todavía no está puesto,
 * cae en el distintivo que ya había —"App Store" a secas, sin el "Descarga
 * en el", que se entiende en cualquier idioma— y le pone encima la frase
 * traducida como texto de la propia página.
 *
 * Añadir un idioma es dejar el fichero de Apple en `public/appstore/`. No
 * hay que tocar esto.
 */
export default function AppStoreBadge({ zona, alto = 56, className = "" }: AppStoreBadgeProps) {
  const { t, language } = useLanguage()
  const [sinTraducir, setSinTraducir] = useState(false)

  const ancho = Math.round((alto * ANCHO) / ALTO)

  return (
    <a
      href={APP_STORE_URL}
      data-zona={zona}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("hero.downloadButton")}
      className={`group inline-flex flex-col items-center gap-1.5 transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <Image
        src={sinTraducir ? "/appstore.png" : `/appstore/${language}.png`}
        // Apple lo pide traducido, y en el que hace de respaldo el texto va
        // debajo, así que en los dos casos el nombre lo da el aria-label.
        alt=""
        width={ancho}
        height={alto}
        style={{ height: alto, width: "auto" }}
        className="rounded-lg shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
        onError={() => setSinTraducir(true)}
        priority
      />

      {/* Solo mientras no esté el distintivo de Apple en este idioma: la
          frase va debajo, como texto de la página, y no pintada encima del
          distintivo —retocarlo va contra sus normas—. */}
      {sinTraducir && (
        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700">
          {t("hero.downloadButton")}
        </span>
      )}
    </a>
  )
}
