"use client";

// Las traducciones salen del proveedor propio del proyecto, no de
// `next-intl` directamente: el resto de componentes usan este, y con
// `useTranslations` no se encuentra el contexto.
import { useLanguage } from "@/lib/language";
import { useEffect, useState } from "react";
import { Play, CalendarDays, BarChart3, RefreshCw } from "lucide-react";

/**
 * El Apple Watch: la caja dibujada, la pantalla de verdad.
 *
 * La caja sigue siendo un SVG —así se escala sin pesar y encaja con el color de
 * la página— pero dentro va una captura real del reloj, en carrusel de tres.
 *
 * Antes la pantalla también se dibujaba, repintando el texto para que se
 * tradujera solo. Tenía sentido cuando no había capturas; ahora las hay, y
 * justo en los tres idiomas que tiene la landing. Enseñar el producto de verdad
 * convence más que enseñar un dibujo de él, sobre todo si la visita ha llegado
 * pagando un clic.
 *
 * Se generan con el guion de `capturas-reloj/`: si cambia una pantalla del
 * reloj, se relanza y se vuelven a copiar aquí.
 */
function WatchDrawing({ idioma }: { idioma: string }) {
  const [actual, setActual] = useState(0);

  // Pasa sola cada cuatro segundos, y se puede tocar un punto para ir a una.
  useEffect(() => {
    const t = setInterval(() => setActual((n) => (n + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

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

      {/* La pantalla, con la captura de verdad del reloj.
          Antes era el dibujo repintado con texto: se traducia solo, pero
          ensenaba un dibujo. Ahora son capturas reales del simulador, y
          existen justo en los tres idiomas que tiene la landing. */}
      <div className="absolute left-[24px] top-[31px] h-[206px] w-[172px] overflow-hidden rounded-[38px] bg-black">
        {[1, 2, 3].map((n) => (
          <img
            key={n}
            src={`/reloj/${idioma}/${n}.png`}
            alt=""
            aria-hidden={n !== actual + 1}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              n === actual + 1 ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Los puntos, fuera de la pantalla y encima de la caja: dentro taparian
          la captura, que ya trae los suyos. */}
      <div className="absolute bottom-[30px] left-0 right-0 flex justify-center gap-[5px]">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}`}
            onClick={() => setActual(i)}
            className={`h-[5px] rounded-full transition-all duration-300 ${
              i === actual ? "w-[14px] bg-white" : "w-[5px] bg-white/35"
            }`}
          />
        ))}
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

export default function AppleWatchTeaser() {
  const { t, language } = useLanguage();
  // Solo hay capturas de los tres idiomas de la landing; si algun dia hay
  // un idioma mas, se le ensena el ingles antes que una imagen rota.
  const idioma = ["es", "en", "de"].includes(language) ? language : "en";

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* El reloj, sobre un halo del color de la app */}
          <div className="relative flex justify-center">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-br from-indigo-200/50 to-transparent blur-2xl" />
            <div className="relative">
              <WatchDrawing idioma={idioma} />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
              {t("watch.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {t("watch.title")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t("watch.titleAccent")}
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {t("watch.description")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}
