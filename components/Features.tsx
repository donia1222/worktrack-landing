"use client"
import { MapPin, BarChart3, MessageSquare, Shield, Briefcase, Bell, Globe, Smartphone, Zap, Layout } from "lucide-react"
import { useLanguage } from "@/lib/language"

const getFeatures = (t: (key: string) => string) => [
  {
    icon: MapPin,
    title: t("features.items.autoTimer.title"),
    description: t("features.items.autoTimer.description"),
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  {
    icon: Layout,
    title: t("features.items.widgets.title"),
    description: t("features.items.widgets.description"),
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Briefcase,
    title: t("features.items.jobs.title"),
    description: t("features.items.jobs.description"),
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: MessageSquare,
    title: t("features.items.ai.title"),
    description: t("features.items.ai.description"),
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  {
    icon: BarChart3,
    title: t("features.items.reports.title"),
    description: t("features.items.reports.description"),
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    icon: Bell,
    title: t("features.items.notifications.title"),
    description: t("features.items.notifications.description"),
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
]

export default function Features() {
  const { t } = useLanguage()
  const features = getFeatures(t)

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">
            {t("features.title")} <span className="text-blue-600">{t("features.titleAccent")}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            {t("features.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`${feature.bgColor} ${feature.borderColor} w-14 h-14 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 text-balance">{feature.title}</h3>

              <p className="text-slate-600 leading-relaxed text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-8 flex-wrap justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-slate-700 font-medium">{t("features.badges.localStorage")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-slate-700 font-medium">{t("features.badges.languages")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-slate-700 font-medium">{t("features.badges.tech")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-slate-700 font-medium">{t("features.badges.subscriptions")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
