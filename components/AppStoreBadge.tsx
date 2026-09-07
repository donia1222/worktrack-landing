"use client"

import { useLanguage } from "@/lib/language"

const APP_STORE_URL =
  "https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"

interface AppStoreBadgeProps {
  /** De dónde salió el toque, para el píxel. */
  zona: string
  /** Alto del distintivo en píxeles. Todo lo demás se escala con él. */
  alto?: number
  className?: string
}

/**
 * El distintivo de la App Store, con el texto en el idioma de quien mira.
 *
 * Está dibujado con CSS y no es una imagen: el "App Store" del PNG va
 * centrado a lo alto, así que superponerle el "Descarga en el" lo pisaba.
 * Así además se ve nítido a cualquier tamaño y en cualquier pantalla, y
 * añadir un idioma es una línea en los ficheros de traducción.
 *
 * Las proporciones son las del distintivo de Apple: el logo ocupa poco más
 * de la mitad del alto, la línea de arriba es la mitad de la de abajo, y
 * todo se calcula desde `alto` para que no haya un solo número suelto.
 */
export default function AppStoreBadge({ zona, alto = 56, className = "" }: AppStoreBadgeProps) {
  const { t } = useLanguage()

  return (
    <a
      href={APP_STORE_URL}
      data-zona={zona}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={(() => {
        const arriba = t("appStore.download")
        const union = /[’']$/.test(arriba) ? "" : " "
        return `${arriba}${union}${t("appStore.name")}`
      })()}
      style={{
        height: alto,
        paddingInline: alto * 0.26,
        gap: alto * 0.2,
        borderRadius: alto * 0.17,
      }}
      className={`
        inline-flex items-center bg-black text-white shadow-lg ring-1 ring-white/10
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        ${className}
      `}
    >
      {/* La manzana. Va con el trazo original de Apple —no se redibuja— y
          escalada al alto del distintivo. El 0,46 no es capricho: el dibujo
          llena su lienzo de arriba abajo, sin margen propio, asi que a mas
          de eso la hoja se va contra el borde de la caja. */}
      <svg
        viewBox="0 0 305 305"
        aria-hidden="true"
        style={{ height: alto * 0.46, width: "auto" }}
        fill="currentColor"
      >
        <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.22 22.45-5.98 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94 12.56-18.35 18.86-36.17 20.99-42.99l.09-.27a2.5 2.5 0 0 0-1.31-3.06l-.18-.08c-3.29-1.35-32.11-13.97-32.42-48.76-.29-28.28 21.5-43.28 25.87-46.03l.2-.13a2.5 2.5 0 0 0 .69-3.51c-14.99-21.94-38-25.24-47.27-25.64a35.1 35.1 0 0 0-3.34-.17c-10.9 0-21.34 4.11-29.72 7.42-5.79 2.28-10.79 4.25-14.24 4.25-3.87 0-8.9-1.99-14.72-4.3-7.78-3.08-16.6-6.57-25.94-6.57l-.58.01c-21.71.32-42.22 12.74-52.8 31.28Z" />
        <path d="M212.1 0c-13.13.54-28.88 8.62-38.27 19.66-7.98 9.29-15.78 24.79-13.72 40.42a2.5 2.5 0 0 0 2.29 2.17c.89.07 1.79.1 2.7.1 12.84 0 26.69-7.1 36.14-18.55 9.95-12.09 14.99-27.61 13.48-41.51A2.51 2.51 0 0 0 212.1 0Z" />
      </svg>

      {/* «Descarga en el» arriba, pequeño, y el nombre debajo, grande: el
          orden y los tamaños del distintivo original. */}
      <span className="flex flex-col justify-center leading-none">
        <span
          style={{ fontSize: alto * 0.2, marginBottom: alto * 0.06 }}
          className="whitespace-nowrap font-normal tracking-tight"
        >
          {t("appStore.download")}
        </span>
        <span
          style={{ fontSize: alto * 0.36 }}
          className="whitespace-nowrap font-semibold tracking-[-0.01em]"
        >
          {t("appStore.name")}
        </span>
      </span>
    </a>
  )
}
