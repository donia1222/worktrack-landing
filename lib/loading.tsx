"use client"

import { createContext, useContext } from "react"

/**
 * Si el loading de arranque (AppWrapper) sigue tapando la página, cualquier
 * animación "al entrar en pantalla" (whileInView) ya se ha disparado y
 * terminado por debajo, invisible — el observer no sabe que hay una pantalla
 * de carga encima. Este contexto deja que un componente sepa si todavía se
 * está cargando, para no arrancar esas animaciones hasta que se vea de verdad.
 */
const LoadingContext = createContext(true)

export const LoadingProvider = LoadingContext.Provider

export function useAppLoading() {
  return useContext(LoadingContext)
}
