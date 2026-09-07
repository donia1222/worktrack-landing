"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language"

const APP_STORE_URL =
  "https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"

/** Proporción de public/appstore.png, para reservarle el hueco exacto. */
const PROPORCION = 576 / 198

/**
 * Dónde cae cada cosa dentro de la imagen, medido sobre el propio PNG.
 * El «App Store» que ya trae empieza al 25 % del ancho y al 43,6 % del alto,
 * así que la mitad de arriba está libre y ahí es donde entra la frase
 * traducida sin pisar nada.
 */
const TEXTO_IZQUIERDA = "26.5%"
const TEXTO_ARRIBA = "11%"
const TEXTO_CUERPO = 0.27

interface AppStoreBadgeProps {
  /** De dónde salió el toque, para el píxel. */
  zona: string
  /** Alto del distintivo en píxeles. El ancho y la letra salen de él. */
  alto?: number
  className?: string
}

/**
 * El distintivo de la App Store, con la frase de arriba en el idioma de
 * quien mira.
 *
 * La caja negra, la manzana y el «App Store» son la imagen —así las
 * proporciones son las de Apple y no unas dibujadas a ojo— y lo único que
 * se pone encima es el «Descárgalo en el», que es lo que cambia de un
 * idioma a otro. Va colocado en porcentajes y con la letra atada al alto,
 * de modo que el distintivo se puede pedir de cualquier tamaño y todo
 * acompaña.
 */
export default function AppStoreBadge({ zona, alto = 56, className = "" }: AppStoreBadgeProps) {
  const { t } = useLanguage()
  const ancho = Math.round(alto * PROPORCION)

  return (
    <a
      href={APP_STORE_URL}
      data-zona={zona}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={(() => {
        const arriba = t("appStore.download")
        return `${arriba}${/[’']$/.test(arriba) ? "" : " "}App Store`
      })()}
      style={{ width: ancho, height: alto }}
      className={`
        relative inline-block shrink-0 transition-transform duration-300 hover:-translate-y-0.5
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500
        ${className}
      `}
    >
      <Image
        src="/appstore.png"
        alt=""
        width={576}
        height={198}
        priority
        className="h-full w-full object-contain"
      />

      {/* La frase traducida, encima de la imagen y sin fondo propio: el negro
          que se ve detrás es el de la caja de la imagen. */}
      <span
        aria-hidden="true"
        style={{
          left: TEXTO_IZQUIERDA,
          top: TEXTO_ARRIBA,
          fontSize: alto * TEXTO_CUERPO,
        }}
        className="absolute whitespace-nowrap font-normal leading-none tracking-tight text-white"
      >
        {t("appStore.download")}
      </span>
    </a>
  )
}
