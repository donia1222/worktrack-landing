"use client"

import { Sparkles, Zap, BarChart3, CalendarCheck, ArrowRight, Play, Watch } from "lucide-react"
import { useLanguage } from "@/lib/language"
import { WatchDrawing } from "./AppleWatchTeaser"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {
  const { t, language } = useLanguage()
  // El reloj solo tiene capturas en es/en/de: fuera de esos, se enseña en
  // inglés antes que una imagen rota.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en"

  // La captura del teléfono en el Hero: solo hay versión propia en es/de,
  // así que en inglés (y cualquier otro idioma) se enseña la de siempre.
  const heroImage =
    idioma === "es"
      ? "/new/1-autotimer-es.png"
      : idioma === "de"
        ? "/new/1-autotimer-de.png"
        : "/new/home-2026-3.webp"
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
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              {/* La frase que sostiene el titular. Estaba escrita en los
                  ficheros de idioma pero no se pintaba en ninguna parte, así
                  que el titular quedaba solo y sin explicar qué hace la app. */}
              <p className="max-w-xl text-lg sm:text-xl text-slate-600 leading-relaxed">
                {t("hero.description")}
              </p>

              <p className="text-sm font-medium text-slate-500">
                {t("hero.subtitle")}
              </p>

              {/* El reloj, en una línea y no en una sección: aquí lo ve todo el
                  mundo en dos segundos, y a quien tenga Apple Watch le salta a
                  la vista. Su sección viene después, cuando la página ya ha
                  demostrado lo que promete el titular. */}
              <p className="inline-flex items-center gap-2 self-start rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Watch className="h-4 w-4" />
                {t("hero.reloj")}
              </p>
            </div>

    
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
              {[
                { icon: Zap, color: "blue", key: "autoTimer" },
                { icon: Sparkles, color: "cyan", key: "widgets" },
                { icon: CalendarCheck, color: "green", key: "calendarSync" },
                { icon: BarChart3, color: "purple", key: "pdfReports" },
              ].map((feature, index) => (
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
                        <a
                href="https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex group relative items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("hero.downloadButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* La primera pregunta de quien llega desde un anuncio es cuanto
                  cuesta. Si no se responde aqui, una parte se va sin bajar. */}
              <p className="hidden lg:block mt-3 text-sm text-slate-500">
                {t("hero.gratis")}
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
                </div>
              </div>

              {/* Floating UI elements */}
              <div
                className="absolute top-[45%] -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-bounce ml-4"
                style={{ animationDuration: "2s" }}
              >
                <div className="flex items-center gap-2 ">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-slate-700">GPS Timer</span>
                </div>
              </div>

              <div
                className="absolute bottom-1/3 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-bounce mr-6"
                style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-slate-700">PDF Reports</span>
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border-2 border-slate-200/50 shadow-lg">
                <span className="text-base font-bold text-blue-600 border-b-2 border-blue-600 pb-0.5">
                  {t("hero.tagline.work")}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-base font-bold text-purple-600 border-b-2 border-purple-600 pb-0.5">
                  {t("hero.tagline.hours")}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-base font-bold text-green-600 border-b-2 border-green-600 pb-0.5">
                  {t("hero.tagline.control")}
                </span>
              </div>
            </div>

            {/* Botón de descarga — solo móvil, aquí abajo del todo */}
            <div className="mt-8 flex justify-center lg:hidden">
              <a
                href="https://apps.apple.com/app/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("hero.downloadButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
