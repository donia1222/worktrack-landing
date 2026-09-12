"use client"

import { Sparkles, Zap, BarChart3, CalendarCheck } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language"
import AppStoreBadge from "./AppStoreBadge"
import DisponiblePara from "./DisponiblePara"
import CajaDeReloj from "./CajaDeReloj"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useAppLoading } from "@/lib/loading"

// El orden en el que se enlazan los vídeos: salario primero, luego
// calendario, luego reportes.
const PANTALLAS_VIDEO = ["salary", "register", "reports"] as const

// Qué pantalla enseña el reloj de al lado según cuál de los tres vídeos del
// teléfono esté activa — para que no vaya a su aire mostrando siempre el
// timer, sino la que tiene más sentido junto a lo que se ve en el teléfono
// en ese momento. El reloj no tiene una captura de "salario", así que ahí
// se queda con el timer, que es su pantalla por defecto.
const RELOJ_POR_VIDEO: Record<(typeof PANTALLAS_VIDEO)[number], string> = {
  salary: "1-timer",
  register: "3-calendario",
  reports: "4-semana",
}

/**
 * El teléfono del hero, ahora con vídeo en vez de una foto fija: los tres
 * clips (home → calendario → estadísticas) se enlazan solos, en bucle, y
 * entre uno y el siguiente hay un *crossfade* en vez de un corte seco.
 *
 * Los tres vídeos están siempre montados y solo se les cambia la opacidad
 * (con `transition-opacity`) — así el que entra ya está listo, sin un
 * parpadeo en negro mientras carga. Solo se reproduce el activo; los otros
 * se pausan, para que no se desincronicen mientras están ocultos.
 *
 * El índice del activo vive en el padre (`Hero`) y no aquí dentro: el reloj
 * de al lado necesita saber cuál es para enseñar la captura a juego.
 */
function VideoDelHero({
  idioma,
  activo,
  onTerminarVideo,
}: {
  idioma: string
  activo: number
  onTerminarVideo: () => void
}) {
  const referencias = useRef<(HTMLVideoElement | null)[]>([])
  // Mientras dure el loading de arranque el teléfono está montado pero
  // tapado (opacidad 0): sin este freno el vídeo arrancaba igual ahí
  // detrás, y para cuando se veía ya llevaba varios segundos corridos —el
  // primero incluso podía haber terminado y pasado al siguiente sin que se
  // llegara a ver el primer fotograma.
  const cargando = useAppLoading()

  useEffect(() => {
    referencias.current.forEach((video, i) => {
      if (!video) return
      if (cargando) {
        video.pause()
        return
      }
      if (i === activo) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activo, idioma, cargando])

  return (
    <>
      {PANTALLAS_VIDEO.map((clave, i) => (
        <video
          key={clave}
          ref={(el) => {
            referencias.current[i] = el
          }}
          src={`/app-videos/${idioma}/${clave}.mp4`}
          muted
          playsInline
          onEnded={onTerminarVideo}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out ${
            i === activo ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  )
}

/**
 * El hero, con la composición de la landing de MIA que le gustó: todo
 * centrado en una sola columna (no a dos, texto e imagen), y el teléfono
 * grande y protagonista en el centro con el reloj superpuesto al lado —
 * sin más elementos flotando alrededor. El fondo es el mismo PNG de la
 * referencia (en lila en vez del naranja de MIA); el resto (textos,
 * capturas, componentes) sigue siendo el nuestro, solo cambia la maqueta.
 */

const taglineContenedor = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const taglinePalabra = {
  oculto: { opacity: 0, y: 18, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
}

const CARACTERISTICAS = [
  { icon: Zap, key: "autoTimer" },
  { icon: Sparkles, key: "widgets" },
  { icon: CalendarCheck, key: "calendarSync" },
  { icon: BarChart3, key: "pdfReports" },
] as const

export default function Hero() {
  const { t, language } = useLanguage()
  // Mientras dure el loading de arranque, el contenido está en el DOM con
  // opacidad 0: si el tagline animara "al entrar en pantalla" ya se
  // dispararía y acabaría ahí abajo, invisible. Se frena hasta que el
  // loading termine.
  const cargando = useAppLoading()
  // El reloj solo tiene capturas en es/en/de: fuera de esos, se enseña en
  // inglés antes que una imagen rota.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  const [isVisible, setIsVisible] = useState(false)
  const [videoActivo, setVideoActivo] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      style={{
        backgroundImage: "url(/hero-bg/hero-background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* El titular, centrado en una sola columna — antes iba a la
            izquierda con el teléfono al lado; ahora el teléfono baja debajo,
            grande y solo. */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t("hero.title")}
            <br />
            <span className="block text-3xl text-[#5B5FEF] sm:text-4xl lg:text-5xl">
              {t("hero.titleAccent")}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {t("hero.description")} {t("hero.subtitle")}
          </p>
        </div>

        {/* El teléfono, grande y centrado, con el reloj apoyado en su
            esquina inferior derecha — como en el anuncio real: el reloj
            monta encima del borde del teléfono, no al lado suelto. */}
        <div
          className={`relative mx-auto mt-16 max-w-[240px] transition-all duration-1000 delay-300 sm:max-w-[260px] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="absolute -inset-10 rounded-[3rem] bg-[#5B5FEF]/15 blur-3xl" />

          {/* El teléfono, con los tres vídeos enlazados dentro. La parte de
              abajo se difumina hasta desaparecer en vez de cortar en seco,
              como en la referencia. */}
          <div
            className="relative rounded-[2rem] bg-slate-900 p-2 shadow-2xl"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 92%)",
              maskImage: "linear-gradient(to bottom, black 55%, transparent 92%)",
            }}
          >
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.4rem]">
              <VideoDelHero
                idioma={idioma}
                activo={videoActivo}
                onTerminarVideo={() => setVideoActivo((a) => (a + 1) % PANTALLAS_VIDEO.length)}
              />
            </div>
          </div>

          {/* El reloj, montado en la esquina — grande, como en el anuncio,
              no un icono pequeño escondido en el borde. */}
          <div className="absolute -right-7 bottom-2 origin-bottom-right rotate-[-8deg] scale-[0.58] sm:-right-9 sm:bottom-3">
            <CajaDeReloj>
              <Image
                src={`/reloj-capturas/reloj-${idioma}/${RELOJ_POR_VIDEO[PANTALLAS_VIDEO[videoActivo]]}.png`}
                alt=""
                fill
                sizes="172px"
                className="object-cover"
              />
            </CajaDeReloj>
          </div>
        </div>

        {/* El lema, debajo del teléfono. */}
        <div className="mt-10 flex justify-center">
          <motion.div
            variants={taglineContenedor}
            initial="oculto"
            animate={cargando ? "oculto" : undefined}
            whileInView={!cargando ? "visible" : undefined}
            viewport={{ once: false, amount: 0.7 }}
            className="inline-flex items-center gap-3 rounded-full border-2 border-slate-200/50 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm"
          >
            <motion.span
              variants={taglinePalabra}
              className="border-b-2 border-[#5B5FEF] pb-0.5 text-base font-bold text-[#5B5FEF]"
            >
              {t("hero.tagline.work")}
            </motion.span>
            <span className="text-slate-400">•</span>
            <motion.span
              variants={taglinePalabra}
              className="border-b-2 border-[#5B5FEF] pb-0.5 text-base font-bold text-[#5B5FEF]"
            >
              {t("hero.tagline.hours")}
            </motion.span>
            <span className="text-slate-400">•</span>
            <motion.span
              variants={taglinePalabra}
              className="border-b-2 border-[#5B5FEF] pb-0.5 text-base font-bold text-[#5B5FEF]"
            >
              {t("hero.tagline.control")}
            </motion.span>
          </motion.div>
        </div>

        {/* La franja de datos, abajo del todo — como los números de la
            referencia, solo que aquí son las cuatro funciones en vez de
            estadísticas. */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slate-200/70 pt-10 sm:grid-cols-4">
          {CARACTERISTICAS.map((feature) => (
            <div key={feature.key} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B5FEF]/10">
                <feature.icon className="h-5 w-5 text-[#5B5FEF]" />
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {t(`hero.features.${feature.key}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <DisponiblePara />
        </div>

        {/* El botón de descarga y el "gratis, sin registro", ahora aquí
            abajo — cierran la página en vez de competir con el titular por
            la atención nada más entrar. */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <AppStoreBadge zona="hero" alto={58} />
          <p className="text-sm text-slate-500">{t("hero.gratis")}</p>
        </div>
      </div>
    </section>
  )
}
