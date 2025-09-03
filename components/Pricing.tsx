"use client"

import { motion } from "framer-motion"
import { Check, X, Star } from "lucide-react"
import { useLanguage } from "@/lib/language"

const getPlans = (t: (key: string) => string) => [
  {
    name: t("pricing.free.name"),
    price: t("pricing.free.price"),
    description: t("pricing.free.description"),
    features: [
      { text: t("pricing.free.features.oneJob"), included: true },
      { text: t("pricing.free.features.basicTimer"), included: true },
      { text: t("pricing.free.features.basicReports"), included: true },
      { text: t("pricing.free.features.basicCalendar"), included: true },
      { text: t("pricing.premium.features.autoTimer"), included: false },
      { text: t("pricing.premium.features.aiBot"), included: false },
      { text: t("pricing.premium.features.unlimitedJobs"), included: false },
      { text: t("pricing.premium.features.calendarSync"), included: false },
      { text: t("pricing.premium.features.billing"), included: false },
    ],
    cta: t("pricing.free.cta"),
    popular: false,
  },
  {
    name: t("pricing.premium.name"),
    price: t("pricing.premium.price"),
    duration: t("pricing.premium.duration"),
    description: t("pricing.premium.description"),
    features: [
      { text: t("pricing.premium.features.unlimitedJobs"), included: true },
      { text: t("pricing.premium.features.autoTimer"), included: true },
      { text: t("pricing.premium.features.aiBot"), included: true },
      { text: t("pricing.premium.features.geofencing"), included: true },
      { text: t("pricing.premium.features.pdfExport"), included: true },
      { text: t("pricing.premium.features.calendarSync"), included: true },
      { text: t("pricing.premium.features.billing"), included: true },
      { text: t("pricing.premium.features.notifications"), included: true },
      { text: t("pricing.premium.features.backups"), included: true },
      { text: t("pricing.premium.features.support"), included: true },
    ],
    cta: t("pricing.premium.cta"),
    popular: true,
  },
]

export default function Pricing() {
  const { t } = useLanguage()
  const plans = getPlans(t)

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t("pricing.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t("pricing.titleAccent")}
            </span>{" "}
            {t("pricing.titleEnd")}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("pricing.description")}{" "}
            <span className="font-semibold text-slate-700">{t("pricing.descriptionBold")}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-blue-200 shadow-2xl shadow-blue-100/50 hover:shadow-3xl hover:shadow-blue-200/60 hover:-translate-y-1"
                  : "bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 hover:-translate-y-0.5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    {t("pricing.premium.popular")}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{plan.name}</h3>
                <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        : "text-slate-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-lg">{plan.duration ? `/${plan.duration}` : "/mes"}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                        <X className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                    <span
                      className={`text-base leading-relaxed ${
                        feature.included ? "text-slate-700" : "text-slate-400 line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 text-lg">{t("pricing.footer")}</p>
        </motion.div>
      </div>
    </section>
  )
}
