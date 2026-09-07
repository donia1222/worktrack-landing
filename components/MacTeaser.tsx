"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language"

/**
 * El monitor: antes era un bloque oscuro con un cuello rectangular — se
 * parecía a cualquier monitor de oficina, no a un Mac. Un iMac o un Studio
 * Display de verdad es: bisel fino de aluminio claro (no un marco negro
 * grueso), y un pie con forma de pala fina que se abre hacia una base
 * ovalada y plana — no un bloque rectangular. El pie va dibujado a mano en
 * SVG para poder darle esa forma; en CSS puro (con rectángulos) no sale.
 */
function PeanaIMac() {
  return (
    <svg viewBox="0 0 200 100" className="mx-auto -mt-px block h-16 w-32 sm:h-20 sm:w-36" aria-hidden="true">
      <defs>
        {/* El cuello, con luz de un lado y sombra del otro: sin ese
            contraste se lee plano, como una pegatina en vez de metal. */}
        <linearGradient id="mac-pata" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f5f6" />
          <stop offset="0.45" stopColor="#dadde1" />
          <stop offset="1" stopColor="#aab0b7" />
        </linearGradient>
        <linearGradient id="mac-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7e9ec" />
          <stop offset="0.5" stopColor="#c7cbd0" />
          <stop offset="1" stopColor="#9198a0" />
        </linearGradient>
        <radialGradient id="mac-sombra" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0f172a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sombra de contacto en la mesa, separada de la base física —
          sin ella la peana parece flotar. */}
      <ellipse cx="100" cy="94" rx="92" ry="8" fill="url(#mac-sombra)" />

      {/* El cuello: una pala fina que se va abriendo hacia la base,
          con un filo central más oscuro que marca el pliegue del metal. */}
      <path d="M90 0 H110 L123 62 H77 Z" fill="url(#mac-pata)" />
      <path d="M99 0 H101 L100.5 62 H99.5 Z" fill="#8f96a0" opacity="0.5" />

      {/* La base: ovalada y casi plana, con un filo superior más claro
          que simula el canto pulido del aluminio. */}
      <ellipse cx="100" cy="76" rx="78" ry="15" fill="url(#mac-base)" />
      <ellipse cx="100" cy="70.5" rx="78" ry="13" fill="#f1f2f4" />
      <ellipse cx="100" cy="72" rx="70" ry="10.5" fill="url(#mac-base)" />
    </svg>
  )
}

export default function MacTeaser() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-8 text-lg font-medium text-slate-600">{t("mac.caption")}</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto w-full max-w-3xl"
        >
          {/* El bisel: fino y de aluminio claro, como el de un iMac o un
              Studio Display — no un marco negro grueso. El filo de arriba
              va un punto más claro que el resto, como si le diera la luz;
              sin eso el aluminio se lee plano, casi de plástico. */}
          <div className="relative rounded-[26px] bg-gradient-to-b from-[#f6f7f8] via-[#e7e9eb] to-[#c9cdd2] p-2 shadow-[0_35px_70px_-20px_rgba(15,23,42,0.4)] ring-1 ring-black/5 sm:p-2.5">
            <div className="pointer-events-none absolute inset-x-3 top-1 h-px rounded-full bg-white/80" />
            <div className="overflow-hidden rounded-[18px] bg-black ring-1 ring-black/50">
              <Image
                src="/new/macos.png"
                alt="Working Time Control en Mac"
                width={1134}
                height={599}
                className="h-auto w-full"
                priority={false}
              />
            </div>
          </div>

          <PeanaIMac />
        </motion.div>
      </div>
    </section>
  )
}
