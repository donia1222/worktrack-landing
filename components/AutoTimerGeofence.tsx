"use client"

import { motion } from "framer-motion"
import { PlayCircle, StopCircle } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

export default function AutoTimerGeofence() {
  const { t, language } = useLanguage()

  // El teléfono con el cronómetro en vivo ya vive en el Hero: aquí, en
  // "Ubicación Inteligente", va la imagen del mapa con el geofencing —
  // la misma familia de capturas que antes estaba en el Hero — para no
  // repetir la misma captura dos veces seguidas en la página.
  const phoneImage =
    language === "es"
      ? "/new/1-autotimer-es.png"
      : language === "de"
        ? "/new/1-autotimer-de.png"
        : "/new/home-2026-3.webp"

  // El punto azul de ubicación, en el mapa, con su aro semitransparente: en
  // la captura está quieto. Centro medido a mano sobre cada imagen (varían
  // un poco entre idiomas porque no son exactamente la misma captura).
  const centroPunto =
    language === "es"
      ? { left: "50.5%", top: "38.8%" }
      : language === "de"
        ? { left: "49.9%", top: "38.9%" }
        : { left: "50.5%", top: "35.1%" }

  const points = [
    {
      icon: PlayCircle,
      title: t("autoTimerGeofence.points.arrive.title"),
      description: t("autoTimerGeofence.points.arrive.description"),
    },
    {
      icon: StopCircle,
      title: t("autoTimerGeofence.points.leave.title"),
      description: t("autoTimerGeofence.points.leave.description"),
    },
  ]

  return (
    <section id="autotimer" className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* La línea lila ondulada, fina y de punta a punta — como la de la
          referencia, no una cinta gruesa recortada en una esquina. Solo en
          escritorio: ahí el teléfono y el texto van en fila, así que el
          centro vertical de toda la sección coincide con el centro del
          teléfono. */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
        style={{ height: "380px" }}
        viewBox="0 0 1200 380"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -20 260 C 160 120, 340 340, 540 200 S 900 60, 1100 180 T 1220 140"
          stroke="#007AFF"
          strokeOpacity="0.35"
          strokeWidth="36"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* El título, centrado arriba y a todo el ancho, plano y sin
            insignia — como "How it works" de la referencia, no metido en
            la columna de la derecha con una etiqueta encima. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("autoTimerGeofence.title")}{" "}
            <span className="text-[#007AFF]">{t("autoTimerGeofence.titleAccent")}</span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t("autoTimerGeofence.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone Mockup, con la inclinación marcada en 3D de la
              referencia — ahí no es un detalle sutil, es la mitad de la
              composición. */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1 py-6"
          >
            {/* La misma línea, solo para móvil: aquí no vale la de arriba
                (esa se centra en toda la sección, y en móvil el texto va
                primero, así que ese centro cae sobre el texto, no sobre el
                teléfono). Esta va pegada al propio bloque del teléfono, y
                sangra a los dos lados hasta el borde de la pantalla con el
                truco del 50vw. */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -ml-[50vw] w-screen -translate-y-1/2 lg:hidden"
              style={{ height: "220px" }}
              viewBox="0 0 800 220"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M -20 150 C 110 70, 240 190, 400 120 S 660 40, 820 110"
                stroke="#007AFF"
                strokeOpacity="0.35"
                strokeWidth="28"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative w-[230px] sm:w-[260px] mx-auto [transform:perspective(1200px)_rotateY(-22deg)_rotateX(4deg)_rotateZ(-3deg)]">
              <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                <div className="relative w-full aspect-[9/19] rounded-[1.4rem] overflow-hidden">
                  <Image
                    src={phoneImage}
                    alt="AutoTimer GPS geofencing"
                    fill
                    className="object-cover object-top"
                  />

                  {/* El aro del punto de ubicación, animado encima de la
                      captura: en la imagen está quieto, aquí pulsa hacia
                      fuera y se desvanece, en bucle, como el "estoy aquí" de
                      Maps de verdad. */}
                  <div
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: centroPunto.left, top: centroPunto.top, width: "20%", aspectRatio: "1 / 1" }}
                  >
                    <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: la lista de puntos, con el icono grande y en su propia
              caja de color — como los pasos de "How it works", no un
              icono pequeño suelto dentro de la tarjeta. */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 order-1 lg:order-2"
          >
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-5 rounded-2xl bg-[#EFF6FF] p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#007AFF]/15">
                  <point.icon className="w-7 h-7 text-[#007AFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
