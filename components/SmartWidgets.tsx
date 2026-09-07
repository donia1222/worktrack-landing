"use client"

import Image from "next/image"
import { RefreshCw, Radio, Hand } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language"

/**
 * El widget de la pantalla de inicio.
 *
 * La seccion estaba escrita y traducida, pero se habia quedado fuera de
 * `page.tsx` —importada y sin usar— asi que no la veia nadie. Al recuperarla se
 * reescribio: prometia widgets de pantalla de bloqueo y arrancar el timer sin
 * desbloquear, y la app no hace ni una cosa ni la otra (solo declara
 * systemSmall, systemMedium y systemLarge, y la Live Activity unicamente sabe
 * terminar la jornada). Lo que se cuenta ahora es lo que hay.
 *
 * El aspecto sigue al de AppleWatchTeaser, que es el mas reciente: cristal
 * limpio sobre blanco, sin degradados de fondo ni discos de colores.
 */

const VENTAJAS = [
  { clave: "realTime", icono: RefreshCw, color: "bg-emerald-50 text-emerald-600" },
  { clave: "dynamicIsland", icono: Radio, color: "bg-slate-100 text-slate-700" },
  { clave: "oneTap", icono: Hand, color: "bg-amber-50 text-amber-600" },
] as const

export default function SmartWidgets() {
  const { t } = useLanguage()

  return (
    <section id="smart-widgets" className="py-20 pb-28 lg:pt-28 lg:pb-36 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* La captura del widget, tal cual: no es una pantalla de
              teléfono (no tiene el resto de la interfaz alrededor), así que
              meterla en un marco de móvil mentía sobre lo que es. Va sola,
              con esquinas redondeadas, sobre un halo del color de la app. */}
          <div className="relative order-2 flex justify-center">
            <div className="absolute h-[300px] w-[300px] rounded-full bg-gradient-to-br from-violet-200/50 to-transparent blur-2xl" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-[280px] overflow-hidden rounded-[20px] shadow-2xl"
            >
              <Image
                src="/new/widget.png"
                alt="Working Time Control"
                width={1206}
                height={1303}
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          <div className="order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-700">
              {t("smartWidgets.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {t("smartWidgets.title")}{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {t("smartWidgets.titleAccent")}
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {t("smartWidgets.description")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {VENTAJAS.map(({ clave, icono: Icono, color }) => (
                <div
                  key={clave}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur-sm"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icono className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-slate-900">
                      {t(`smartWidgets.features.${clave}.title`)}
                    </span>
                    <span className="mt-0.5 block leading-snug text-slate-600">
                      {t(`smartWidgets.features.${clave}.description`)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
