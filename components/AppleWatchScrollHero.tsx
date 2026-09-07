"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
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

  const grande = escritorio ? 2.1 : 1.6

  // El reloj: crece al llegar (0-22%), se queda grande mientras pasan las
  // tres pantallas y se ve el título, y en el último tramo (86-100%) se
  // encoge y se desvanece — el remate, cediendo el sitio al texto de fondo.
  const escala = useTransform(scrollYProgress, [0, 0.22, 0.86, 1], [0.55, grande, grande, 0.3])
  const opacidadReloj = useTransform(scrollYProgress, [0.86, 1], [1, 0])
  const desenfoqueReloj = useTransform(scrollYProgress, [0.86, 1], [0, 10])
  const filtroReloj = useMotionTemplate`blur(${desenfoqueReloj}px)`

  // El "Apple Watch" gigante de fondo: al llegar está muy desenfocado y
  // casi invisible; según el reloj crece se va aclarando y subiendo la
  // opacidad (así el blanco de detrás no se ve vacío durante el
  // crecimiento), y en el remate final vuelve a crecer, esta vez él,
  // sobreponiéndose al reloj que se encoge y se difumina detrás.
  const desenfoqueFondo = useTransform(scrollYProgress, [0, 0.22], [18, 0])
  // `none` en cuanto el desenfoque se acaba, en vez de un `blur(0px)`
  // perpetuo. Un filtro activo obliga al navegador a rasterizar el texto en
  // una capa aparte —y a dejarla ahi mientras exista—, asi que las letras se
  // veian con los bordes sucios justo cuando mas grandes estan. Ademas esa
  // capa se recorta al viewport y en movil dejaba una linea fina cruzando la
  // pantalla por encima del texto.
  const filtroFondo = useTransform(desenfoqueFondo, (px) =>
    px < 0.15 ? 'none' : `blur(${px}px)`,
  )
  const opacidadFondo = useTransform(scrollYProgress, [0, 0.1, 0.22], [0, 0.5, 1])

  // El texto se dibuja siempre al tamaño mas grande al que va a llegar, y la
  // escala lo *encoge* hasta que toca crecer. Al reves —dibujarlo pequeño y
  // agrandarlo— el navegador estira los pixeles que ya habia pintado y las
  // letras salen borrosas; encogiendo, el trazo se mantiene limpio.
  //
  // En movil el texto ya ocupa casi todo el ancho desde el principio
  // (13vw × 11 caracteres), asi que crece poco: 1.6x lo sacaria del viewport
  // y se cortaria por los lados.
  const CRECIMIENTO = escritorio ? 1.6 : 1.08
  const escalaFondo = useTransform(scrollYProgress, [0.86, 1], [1 / CRECIMIENTO, 1])

  // Timer (con el cronómetro en vivo) → calendario → estadísticas.
  const opacidadTimer = useTransform(scrollYProgress, [0, 0.2, 0.24], [1, 1, 0])
  const opacidadCalendario = useTransform(scrollYProgress, [0.2, 0.24, 0.43, 0.47], [0, 1, 1, 0])
  const opacidadEstadisticas = useTransform(scrollYProgress, [0.43, 0.47], [0, 1])

  // El overlay con el título, antes del remate.
  const opacidadOverlay = useTransform(scrollYProgress, [0.64, 0.76], [0, 1])
  const yOverlay = useTransform(scrollYProgress, [0.64, 0.76], [12, 0])

  return (
    <section
      id="apple-watch"
      ref={containerRef}
      className="relative bg-slate-50"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Detrás del reloj, un poco más abajo del centro exacto — así queda
            justo a la altura de la esfera. En el remate final crece y se
            queda sola en pantalla, cuando el reloj ya se ha encogido y
            difuminado detrás. */}
        <div className="pointer-events-none absolute inset-0 flex translate-y-[6%] items-center justify-center">
          <motion.p
            style={{ opacity: opacidadFondo, filter: filtroFondo, scale: escalaFondo }}
            className="select-none whitespace-nowrap text-center text-[14vw] font-black leading-none tracking-tight text-slate-300 antialiased [transform:translateZ(0)] sm:text-[16vw]"
          >
            Apple Watch
          </motion.p>
        </div>

        <motion.div
          style={{ scale: escala, opacity: opacidadReloj, filter: filtroReloj }}
          className="relative w-[220px] h-[268px]"
        >
          <svg viewBox="0 0 220 268" className="w-full h-full">
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
              <motion.p
                style={{ y: yOverlay }}
                className="text-balance text-[15px] font-bold leading-tight text-white sm:text-base"
              >
                {t("watch.title")} <span className="text-indigo-300">{t("watch.titleAccent")}</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
