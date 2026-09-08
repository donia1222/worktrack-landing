"use client"

import { Sparkles, Zap, BarChart3, CalendarCheck, Play, Watch } from "lucide-react"
import { useLanguage } from "@/lib/language"
import AppStoreBadge from "./AppStoreBadge"
import DisponiblePara from "./DisponiblePara"
import { WatchDrawing } from "./AppleWatchTeaser"
import LiveTimerOverlay from "./LiveTimerOverlay"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAppLoading } from "@/lib/loading"

// El chip "tu trabajo · tus horas · tu control": en móvil hay que bajar un
// poco para verlo, así que en vez de estar siempre visible entra con un
// rebote suave palabra a palabra cada vez que aparece en pantalla, y se
// desvanece igual al subir — se siente vivo en lugar de estático.
const taglineContenedor = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const CARACTERISTICAS = [
  { icon: Zap, color: "blue", key: "autoTimer" },
  { icon: Sparkles, color: "cyan", key: "widgets" },
  { icon: CalendarCheck, color: "green", key: "calendarSync" },
  { icon: BarChart3, color: "purple", key: "pdfReports" },
] as const

const taglinePalabra = {
  oculto: { opacity: 0, y: 18, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
}

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

  // La captura del teléfono en el Hero: la misma que en el bloque de
  // AutoTimer (AutoTimerGeofence.tsx) — ahora que hay versión propia en los
  // tres idiomas, se enseña la que toque en cada uno.
  const heroImage =
    idioma === "es"
      ? "/new/3-timer-es.png"
      : idioma === "de"
        ? "/new/3-timer-de.png"
        : "/new/3-timer-en.png"
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: "10%",
            right: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse"
          style={{
            bottom: "20%",
            left: "15%",
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse"
          style={{
            top: "60%",
            right: "30%",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "2s",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-36">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div
            className={`space-y-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-8">
              {/* Enhanced title with gradient text and better typography */}
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                {t("hero.title")}
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              {/* La frase que sostiene el titular, y a quién va dirigida,
                  juntas en el mismo párrafo — antes iban en dos tamaños
                  distintos y quedaba como si fueran dos ideas sueltas. */}
              <p className="max-w-xl text-lg sm:text-xl text-slate-600 leading-relaxed">
                {t("hero.description")} {t("hero.subtitle")}
              </p>

            </div>

    
            {/* En escritorio se queda aquí, en rejilla 2x2. En móvil se
                oculta: baja entera debajo de "Disponible para", en fila con
                scroll lateral (ver más abajo, junto al DisponiblePara). */}
            <div className="hidden lg:grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
              {CARACTERISTICAS.map((feature, index) => (
                <div
                  key={feature.key}
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 hover:bg-white/80 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <div
                    className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors duration-200">
                    {t(`hero.features.${feature.key}`)}
                  </span>
                </div>
              ))}
            </div>
            <AppStoreBadge zona="hero_escritorio" alto={60} className="hidden lg:inline-flex" />

              {/* La primera pregunta de quien llega desde un anuncio es cuanto
                  cuesta. Si no se responde aqui, una parte se va sin bajar. */}
              <p className="hidden lg:block mt-3 text-sm text-slate-500">
                {t("hero.gratis")}
              </p>

              {/* El reloj, justo debajo de "Gratis": aquí lo ve todo el mundo
                  en dos segundos, y a quien tenga Apple Watch le salta a la
                  vista. Su sección viene después, cuando la página ya ha
                  demostrado lo que promete el titular. */}
              <p className="hidden lg:inline-flex mt-3 items-center gap-2 self-start rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Watch className="h-4 w-4" />
                {t("hero.reloj")}
              </p>
          </div>

          <div
            className={`relative lg:pl-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative mx-auto max-w-[220px] lg:max-w-[240px]">
              {/* Enhanced decorative elements */}
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-3xl animate-pulse" />

              {/* Floating elements */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-bounce"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />

              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-sm opacity-30 animate-pulse" />

              {/* Main image container */}
              <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                <div className="relative w-full aspect-[9/19] rounded-[1.4rem] overflow-hidden">
                  <Image
                    src={heroImage}
                    alt="Working Time Control App"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <LiveTimerOverlay
                    idioma={idioma}
                    texto={t("liveTimer.working")}
                    textoInicio={t("liveTimer.startedAt")}
                  />
                </div>
              </div>

              {/* El Apple Watch, en miniatura junto al teléfono: se aleja bien
                  a la derecha para no tapar la pantalla del teléfono, que es
                  la protagonista. Mismo dibujo animado que la sección
                  dedicada (AppleWatchTeaser), escalado con transform CSS. */}
              <div
                className={`absolute -right-8 top-[6%] z-20 h-[132px] w-[108px] transition-all duration-1000 delay-500 sm:-right-28 sm:top-[10%] sm:h-[210px] sm:w-[173px] lg:-right-32 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="origin-top-left scale-[0.49] sm:scale-[0.79]">
                  <WatchDrawing idioma={idioma} />
                </div>
              </div>
            </div>

            {/* Tagline below image */}
            <div className="mt-8 flex justify-center">
              <motion.div
                variants={taglineContenedor}
                initial="oculto"
                animate={cargando ? "oculto" : undefined}
                whileInView={!cargando ? "visible" : undefined}
                viewport={{ once: false, amount: 0.7 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border-2 border-slate-200/50 shadow-lg"
              >
                <motion.span
                  variants={taglinePalabra}
                  className="text-base font-bold text-blue-600 border-b-2 border-blue-600 pb-0.5"
                >
                  {t("hero.tagline.work")}
                </motion.span>
                <span className="text-slate-400">•</span>
                <motion.span
                  variants={taglinePalabra}
                  className="text-base font-bold text-purple-600 border-b-2 border-purple-600 pb-0.5"
                >
                  {t("hero.tagline.hours")}
                </motion.span>
                <span className="text-slate-400">•</span>
                <motion.span
                  variants={taglinePalabra}
                  className="text-base font-bold text-green-600 border-b-2 border-green-600 pb-0.5"
                >
                  {t("hero.tagline.control")}
                </motion.span>
              </motion.div>
            </div>

            {/* Botón de descarga — solo móvil, aquí abajo del todo */}
            <div className="mt-8 flex flex-col items-center gap-2 lg:hidden">
              <AppStoreBadge zona="hero_movil" alto={56} />
              <p className="text-sm text-slate-500">{t("hero.gratis")}</p>
              <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Watch className="h-4 w-4" />
                {t("hero.reloj")}
              </p>
            </div>
          </div>
        </div>

        {/* En qué aparatos corre. Va debajo de las dos columnas para que caiga
            bajo el botón de descarga en las dos maquetaciones: en el móvil el
            botón está al final de la columna derecha, y en el escritorio al
            final de la izquierda. */}
        <div className="mt-14">
          <DisponiblePara />
        </div>

        {/* Las 4 características, solo en móvil: aquí abajo, debajo de
            "Disponible para", en rejilla (la fila con scroll lateral se
            quitó: descuadraba la página en horizontal en algunos móviles).
            La rejilla 2x2 de escritorio se queda donde estaba, junto al
            título. */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
          {CARACTERISTICAS.map((feature) => (
            <div
              key={feature.key}
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/60 p-4 backdrop-blur-md"
            >
              <div
                className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center shrink-0`}
              >
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {t(`hero.features.${feature.key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
