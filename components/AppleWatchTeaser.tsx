"use client";

// Las traducciones salen del proveedor propio del proyecto, no de
// `next-intl` directamente: el resto de componentes usan este, y con
// `useTranslations` no se encuentra el contexto.
import { useLanguage } from "@/lib/language";
import { useSegundosTrabajados } from "@/lib/liveTimer";
import { Play, CalendarDays, BarChart3, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * El Apple Watch: la caja dibujada, la pantalla de verdad.
 *
 * La caja sigue siendo un SVG —así se escala sin pesar y encaja con el color de
 * la página— pero dentro va una captura real del reloj congelada en la
 * pantalla del timer corriendo, con el número tapado y repintado en vivo con
 * los mismos segundos que el teléfono (ver lib/liveTimer.ts): así reloj y
 * teléfono se ven contando exactamente lo mismo, a la vez.
 *
 * Antes había un carrusel de tres capturas (timer/calendario/estadísticas)
 * que iban rotando solas. Se quitó: si el reloj cambia de pantalla, deja de
 * verse el cronómetro y ya no tiene sentido decir que "va a la par" del
 * teléfono. Fijo en la del timer, siempre a juego.
 *
 * Se generan con el guion de `capturas-reloj/`: si cambia una pantalla del
 * reloj, se relanza y se vuelven a copiar aquí.
 */
// El "1:47:15" grande de la captura no es de verdad: se tapa ese hueco exacto
// (medido sobre el PNG de 368x448 del simulador) y se repinta con el
// cronómetro real. El formato de Apple Watch no rellena la hora con un cero
// ("9:03:15", no "09:03:15"), a diferencia del teléfono.
export function tiempoFormateadoReloj(segundos: number) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// El reloj del sistema, arriba a la derecha de la esfera ("14:24" en la
// captura original): tampoco es de verdad, así que se tapa y se repinta con
// la hora real de quien visita la página. En inglés con AM/PM, en
// español/alemán en 24h — igual que la hora de inicio del teléfono.
export function horaSistemaFormateada(idioma: string, fecha: Date) {
  if (idioma === "en") {
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(fecha);
  }
  return new Intl.DateTimeFormat(idioma === "de" ? "de-DE" : "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(fecha);
}

export function useRelojDelSistema() {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  return ahora;
}

/**
 * Se exporta también para el Hero: ahí se planta en miniatura junto al
 * teléfono, con la misma animación, solo que a escala reducida con un
 * transform CSS.
 */
export function WatchDrawing({ idioma }: { idioma: string }) {
  const segundos = useSegundosTrabajados();
  const ahora = useRelojDelSistema();

  return (
    <div className="relative w-[220px] h-[268px] mx-auto">
      <svg viewBox="0 0 220 268" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="wtc-caja" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4B4F58" />
            <stop offset="0.5" stopColor="#2B2E34" />
            <stop offset="1" stopColor="#3A3E45" />
          </linearGradient>
          <linearGradient id="wtc-correa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A2D33" />
            <stop offset="1" stopColor="#1B1D21" />
          </linearGradient>
        </defs>

        <rect x="76" y="0" width="68" height="42" rx="14" fill="url(#wtc-correa)" />
        <rect x="76" y="226" width="68" height="42" rx="14" fill="url(#wtc-correa)" />
        <rect x="12" y="20" width="196" height="228" rx="46" fill="url(#wtc-caja)" />
        <rect x="209" y="102" width="6" height="24" rx="3" fill="#5A5F69" />
        <rect x="210" y="136" width="4" height="26" rx="2" fill="#4A4E57" />
        <rect x="24" y="31" width="172" height="206" rx="38" fill="#000000" />
      </svg>

      {/* La pantalla, con la captura de verdad del reloj (timer corriendo) y
          el número tapado + repintado en vivo encima. */}
      <div className="absolute left-[24px] top-[31px] h-[206px] w-[172px] overflow-hidden rounded-[38px] bg-black">
        <img src={`/reloj/${idioma}/corriendo.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />

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
      </div>
    </div>
  );
}

const VENTAJAS = [
  { icono: Play, clave: "start", color: "text-emerald-600 bg-emerald-50" },
  { icono: CalendarDays, clave: "week", color: "text-indigo-600 bg-indigo-50" },
  { icono: BarChart3, clave: "stats", color: "text-purple-600 bg-purple-50" },
  { icono: RefreshCw, clave: "sync", color: "text-amber-600 bg-amber-50" },
];

/**
 * Debajo del héroe animado (AppleWatchScrollHero, que ya enseña el reloj
 * grande y el título "Tus horas, en la muñeca" como overlay durante el
 * scroll fijado), solo queda la insignia pequeña, la descripción y la
 * lista de funciones — repetir el título aquí sería redundante justo
 * después de haberlo visto en grande encima del reloj.
 */
export default function AppleWatchTeaser() {
  const { t } = useLanguage();

  return (
    <section className="pb-16 lg:pb-24 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
          {t("watch.badge")}
        </span>

        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          {t("watch.description")}
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {VENTAJAS.map(({ icono: Icono, clave, color }) => (
            <div
              key={clave}
              className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur-sm"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icono className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-slate-900">
                  {t(`watch.features.${clave}.title`)}
                </span>
                <span className="mt-0.5 block leading-snug text-slate-600">
                  {t(`watch.features.${clave}.body`)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
