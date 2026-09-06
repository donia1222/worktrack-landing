"use client"
import { Bell, Shield, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language"

const getFeatures = (t: (key: string) => string) => [
  {
    image: "/new/icons/timer.png",
    title: t("features.items.autoTimer.title"),
    description: t("features.items.autoTimer.description"),
    accent: "from-blue-500 to-cyan-500",
    glow: "bg-blue-500/10",
    // La estrella de la app: ocupa el doble de ancho en el bento para que
    // se note que es la característica principal, no una más de seis.
    big: true,
  },
  {
    image: "/new/icons/jobs.png",
    title: t("features.items.jobs.title"),
    description: t("features.items.jobs.description"),
    accent: "from-emerald-500 to-teal-500",
    glow: "bg-emerald-500/10",
  },
  {
    image: "/new/icons/stats.png",
    title: t("features.items.salary.title"),
    description: t("features.items.salary.description"),
    accent: "from-violet-500 to-purple-500",
    glow: "bg-violet-500/10",
  },
  {
    image: "/new/icons/calendar.png",
    title: t("features.items.reports.title"),
    description: t("features.items.reports.description"),
    accent: "from-amber-500 to-orange-500",
    glow: "bg-amber-500/10",
  },
  {
    icon: Bell,
    title: t("features.items.notifications.title"),
    description: t("features.items.notifications.description"),
    accent: "from-rose-500 to-pink-500",
    glow: "bg-rose-500/10",
  },
]

export default function Features() {
  const { t } = useLanguage()
  const features = getFeatures(t)

  return (
    <section id="features" className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Rejilla de puntos de fondo, muy sutil: le da textura "de producto"
          sin competir con las tarjetas. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_10%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-balance text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {t("features.title")} <span className="text-blue-600">{t("features.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-slate-600">
            {t("features.description")}
          </p>
        </motion.div>

        {/* Bento grid: una tarjeta grande (la función estrella) más cinco
            normales, en vez de seis cajas idénticas — así se lee de un
            vistazo cuál es la diferencial de la app. */}
        {/* En el movil se pasa de lado en vez de apilarse: cinco tarjetas una
            debajo de otra son cinco pantallas de scroll antes de llegar a los
            precios. De tableta para arriba vuelve la rejilla, donde se ven
            todas a la vez y el bento tiene sentido. */}
        <div className="mb-16 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:auto-rows-[minmax(220px,auto)] sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              // Antes entraban con `amount: 0.3` —o sea, cuando ya se veia un
              // tercio de la tarjeta— y con el retraso calculado por columna:
              // en el movil, que es de una sola columna, eso daba tarjetas
              // apareciendo de golpe y con esperas que no seguian el orden.
              // Ahora arrancan un poco antes de entrar, en orden, y con la
              // curva de iOS en vez de un frenazo.
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1], delay: Math.min(index, 4) * 0.06 }}
              className={`group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/5 sm:w-auto sm:shrink ${
                feature.big ? "lg:col-span-2" : ""
              }`}
            >
              {/* Halo de color que aparece al pasar el ratón, del color de
                  la propia tarjeta — sustituye al icono plano de antes. */}
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${feature.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative flex h-full flex-col">
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {feature.image ? (
                    <Image
                      src={feature.image}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain brightness-0 invert"
                    />
                  ) : feature.icon ? (
                    <feature.icon className="h-7 w-7 text-white" />
                  ) : null}
                </div>

                <h3 className={`mb-3 font-semibold text-slate-900 ${feature.big ? "text-2xl" : "text-xl"}`}>
                  {feature.title}
                </h3>

                <p className={`text-pretty leading-relaxed text-slate-600 ${feature.big ? "max-w-xl text-base" : "text-sm"}`}>
                  {feature.description}
                </p>

                <ArrowUpRight className="mt-auto pt-4 h-5 w-5 text-slate-300 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="font-medium text-slate-700">{t("features.badges.localStorage")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium text-slate-700">{t("features.badges.languages")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
