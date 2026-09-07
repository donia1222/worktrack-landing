"use client"

import { useEffect, useState } from "react"

/**
 * Un único punto de partida para "la jornada que está en marcha" en toda la
 * landing: el teléfono (LiveTimerOverlay) y el Apple Watch (WatchDrawing)
 * muestran el mismo cronómetro corriendo, y para que se vean sincronizados
 * de verdad —no cada uno contando por su cuenta desde que se monta— los dos
 * calculan los segundos transcurridos desde este mismo instante fijo, en
 * vez de llevar cada uno su propio contador independiente.
 */

// Arranca en 4h 32min antes de cargar la página: se ve una jornada ya en
// marcha en vez de un cronómetro a cero que parece recién empezado, pero sin
// llegar a las 9h que resultaban demasiadas horas para una demo.
export const SEGUNDOS_INICIALES = 4 * 3600 + 32 * 60

// Momento fijo (una vez por carga de página) del que se descuentan los
// segundos transcurridos. Todo lo que use este módulo parte del mismo punto.
const INICIO_TRABAJO = Date.now() - SEGUNDOS_INICIALES * 1000

export function segundosTranscurridos() {
  return Math.floor((Date.now() - INICIO_TRABAJO) / 1000)
}

export function horaInicioTrabajo() {
  return new Date(INICIO_TRABAJO)
}

export function useSegundosTrabajados() {
  const [segundos, setSegundos] = useState(segundosTranscurridos)

  useEffect(() => {
    const id = setInterval(() => setSegundos(segundosTranscurridos()), 1000)
    return () => clearInterval(id)
  }, [])

  return segundos
}

export function tiempoFormateado(segundos: number) {
  const h = Math.floor(segundos / 3600)
  const m = Math.floor((segundos % 3600) / 60)
  const s = segundos % 60
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":")
}
