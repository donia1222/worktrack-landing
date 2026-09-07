"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/language"
import { useSegundosTrabajados } from "@/lib/liveTimer"
import { tiempoFormateadoReloj, horaSistemaFormateada, useRelojDelSistema } from "./AppleWatchTeaser"

/**
 * El reloj entra pequeño, crece con el scroll hasta ocupar buena parte de
 * la pantalla, y mientras está grande y fijo (sticky) va pasando solo de
 * la pantalla del timer a la del calendario y luego a la de estadísticas —
 * las tres, tocadas por el mismo scroll. Al final, un overlay oscuro tapa
 * la esfera y aparece encima el título de la sección. Solo entonces se
 * suelta el scroll fijado y sigue la página con normalidad (la insignia,
 * la descripción y las funciones, en AppleWatchTeaser.tsx justo debajo).
 *
 * Todo el recorrido —escala y los cuatro cambios de opacidad— sale de un
 * único scrollYProgress (0 a 1) medido sobre esta sección; useTransform ya
 * deja el valor plano fuera del tramo que le toca, así que no hace falta
 * gestionar "fases" a mano.
 */
export default function AppleWatchScrollHero() {
  const { t, language } = useLanguage()
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"
  const segundos = useSegundosTrabajados()
  const ahora = useRelojDelSistema()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // En pantallas grandes hay más sitio, así que el reloj puede acabar más
  // grande sin comerse el overlay del final.
  const [escritorio, setEscritorio] = useState(false)
  useEffect(() => {
    const comprobar = () => setEscritorio(window.innerWidth >= 1024)
    comprobar()
    window.addEventListener("resize", comprobar)
    return () => window.removeEventListener("resize", comprobar)
  }, [])

  const escala = useTransform(scrollYProgress, [0, 0.22], [0.55, escritorio ? 2.1 : 1.6])

  // Timer (con el cronómetro en vivo) → calendario → estadísticas.
  const opacidadTimer = useTransform(scrollYProgress, [0, 0.2, 0.24], [1, 1, 0])
  const opacidadCalendario = useTransform(scrollYProgress, [0.2, 0.24, 0.43, 0.47], [0, 1, 1, 0])
  const opacidadEstadisticas = useTransform(scrollYProgress, [0.43, 0.47], [0, 1])

  // El overlay con el título, al final del recorrido.
  const opacidadOverlay = useTransform(scrollYProgress, [0.64, 0.76], [0, 1])
  const yOverlay = useTransform(scrollYProgress, [0.64, 0.76], [12, 0])

  return (
    <section
      id="apple-watch"
      ref={containerRef}
      className="relative bg-slate-50"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ scale: escala }} className="relative w-[220px] h-[268px]">
          <svg
            viewBox="0 0 220 268"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 18px 20px rgba(15, 23, 42, 0.28))" }}
          >
            <defs>
              <linearGradient id="wtc-caja-hero" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4B4F58" />
                <stop offset="0.5" stopColor="#2B2E34" />
                <stop offset="1" stopColor="#3A3E45" />
              </linearGradient>
              <linearGradient id="wtc-correa-hero" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2A2D33" />
                <stop offset="1" stopColor="#1B1D21" />
              </linearGradient>
            </defs>

            <rect x="76" y="0" width="68" height="42" rx="14" fill="url(#wtc-correa-hero)" />
            <rect x="76" y="226" width="68" height="42" rx="14" fill="url(#wtc-correa-hero)" />
            <rect x="12" y="20" width="196" height="228" rx="46" fill="url(#wtc-caja-hero)" />
            <rect x="209" y="102" width="6" height="24" rx="3" fill="#5A5F69" />
            <rect x="210" y="136" width="4" height="26" rx="2" fill="#4A4E57" />
            <rect x="24" y="31" width="172" height="206" rx="38" fill="#000000" />
          </svg>

          <div className="absolute left-[24px] top-[31px] h-[206px] w-[172px] overflow-hidden rounded-[38px] bg-black">
            <motion.img
              style={{ opacity: opacidadTimer }}
              src={`/reloj/${idioma}/corriendo.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.img
              style={{ opacity: opacidadCalendario }}
              src={`/reloj/${idioma}/2.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.img
              style={{ opacity: opacidadEstadisticas }}
              src={`/reloj/${idioma}/3.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* El cronómetro y el reloj del sistema en vivo, solo mientras
                se ve la pantalla del timer. */}
            <motion.div style={{ opacity: opacidadTimer }}>
              <div
                className="absolute flex items-center justify-center bg-black"
                style={{ left: "68%", right: "3%", top: "5%", height: "6%" }}
              >
                <span className="whitespace-nowrap text-[10.5px] font-semibold tabular-nums tracking-tight text-white">
                  {horaSistemaFormateada(idioma, ahora)}
                </span>
              </div>
              <div
                className="absolute flex items-center justify-center bg-black"
                style={{ left: "31.5%", right: "30.7%", top: "50%", height: "5.8%" }}
              >
                <span className="whitespace-nowrap text-[15px] font-bold tabular-nums tracking-tight text-white">
                  {tiempoFormateadoReloj(segundos)}
                </span>
              </div>
            </motion.div>

            {/* El overlay final, con el título de la sección encima del reloj. */}
            <motion.div
              style={{ opacity: opacidadOverlay }}
              className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 text-center"
            >
              <motion.p style={{ y: yOverlay }} className="text-base font-bold leading-snug text-white">
                {t("watch.title")} <span className="text-indigo-300">{t("watch.titleAccent")}</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
