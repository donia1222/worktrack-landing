"use client"

import { useEffect, useState } from "react"

/**
 * El enlace a la App Store, con la campaña de la que viene la visita.
 *
 * Estaba escrito cuatro veces en cuatro ficheros, y sin manera de saber qué
 * descargas traía cada anuncio: Meta ve el clic a la web y ahí se le acaba la
 * vista, y sin el SDK dentro de la app —que no se quiere, por los permisos
 * que pide— no hay forma de que vea la instalación.
 *
 * Apple sí la ve. App Store Connect atribuye una descarga a una campaña si el
 * enlace lleva `pt` (el Provider ID de la cuenta) y `ct` (el nombre de la
 * campaña). Aquí `ct` sale de la URL con la que llegó la visita —el
 * `utm_campaign` que se pone en el anuncio— y se guarda en la sesión, para
 * que siga puesto aunque la persona pasee por la página antes de tocar el
 * botón. Sin campaña, `ct=web`: el tráfico que llega solo también cuenta.
 */

const APP_ID = "6745336262"
/** La página de producto personalizada, la misma de siempre. */
const PPID = "34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
/**
 * El Provider ID de App Store Connect (Analytics → Adquisición → Campañas →
 * «Crear enlace de campaña» lo enseña). Sin él Apple ignora `ct`; el enlace
 * sigue abriendo la app igual.
 */
const PROVIDER_ID = ""

const CLAVE_DE_SESION = "worktrack_ct"
const CAMPANA_POR_DEFECTO = "web"

/** Lo que Apple admite en `ct`: letras, números, guion y guion bajo, 40 como mucho. */
export function limpiarCampana(valor: string | null | undefined): string {
  const limpio = (valor || "").trim().replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 40)
  return limpio || CAMPANA_POR_DEFECTO
}

export function enlaceAppStore(campana: string = CAMPANA_POR_DEFECTO): string {
  const partes = [`ppid=${PPID}`]
  if (PROVIDER_ID) partes.push(`pt=${PROVIDER_ID}`)
  partes.push(`ct=${limpiarCampana(campana)}`, "mt=8")
  return `https://apps.apple.com/app/id${APP_ID}?${partes.join("&")}`
}

/** La campaña de esta visita: la de la URL si la trae, si no la guardada, si no ninguna. */
function campanaDeLaVisita(): string {
  try {
    const parametros = new URLSearchParams(window.location.search)
    const deLaUrl = parametros.get("utm_campaign") || parametros.get("ct")
    if (deLaUrl) {
      const limpia = limpiarCampana(deLaUrl)
      window.sessionStorage.setItem(CLAVE_DE_SESION, limpia)
      return limpia
    }
    return window.sessionStorage.getItem(CLAVE_DE_SESION) || CAMPANA_POR_DEFECTO
  } catch {
    return CAMPANA_POR_DEFECTO
  }
}

/**
 * El enlace para poner en un `href`. En el servidor y en el primer pintado
 * lleva la campaña por defecto —así el HTML del servidor y el del navegador
 * coinciden— y en cuanto la página está montada se cambia por la de verdad.
 */
export function useEnlaceAppStore(): string {
  const [enlace, setEnlace] = useState(() => enlaceAppStore())
  useEffect(() => {
    setEnlace(enlaceAppStore(campanaDeLaVisita()))
  }, [])
  return enlace
}
