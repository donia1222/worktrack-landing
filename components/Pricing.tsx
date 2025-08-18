'use client'

import { motion } from 'framer-motion'
import { Check, X, Zap } from 'lucide-react'
import { useLanguage } from '@/lib/language'

const getPlans = (t: (key: string) => string) => [
  {
    name: t('pricing.free.name'),
    price: t('pricing.free.price'),
    description: t('pricing.free.description'),
    features: [
      { text: t('pricing.free.features.oneJob'), included: true },
      { text: t('pricing.free.features.basicTimer'), included: true },
      { text: t('pricing.free.features.basicReports'), included: true },
      { text: t('pricing.free.features.basicCalendar'), included: true },
      { text: t('pricing.premium.features.autoTimer'), included: false },
      { text: t('pricing.premium.features.aiBot'), included: false },
      { text: t('pricing.premium.features.unlimitedJobs'), included: false },
      { text: t('pricing.premium.features.calendarSync'), included: false },
      { text: t('pricing.premium.features.billing'), included: false },
    ],
    cta: t('pricing.free.cta'),
    popular: false,
  },
  {
    name: t('pricing.premium.name'),
    price: t('pricing.premium.price'),
    duration: t('pricing.premium.duration'),
    description: t('pricing.premium.description'),
    features: [
      { text: t('pricing.premium.features.unlimitedJobs'), included: true },
      { text: t('pricing.premium.features.autoTimer'), included: true },
      { text: t('pricing.premium.features.aiBot'), included: true },
      { text: t('pricing.premium.features.geofencing'), included: true },
      { text: t('pricing.premium.features.pdfExport'), included: true },
      { text: t('pricing.premium.features.calendarSync'), included: true },
      { text: t('pricing.premium.features.billing'), included: true },
      { text: t('pricing.premium.features.notifications'), included: true },
      { text: t('pricing.premium.features.backups'), included: true },
      { text: t('pricing.premium.features.support'), included: true },
    ],
    cta: t('pricing.premium.cta'),
    popular: true,
  },
]

export default function Pricing() {
  const { t } = useLanguage()
  const plans = getPlans(t)
  
  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {t('pricing.title')}{' '}
            <span className="gradient-text">{t('pricing.titleAccent')}</span> {t('pricing.titleEnd')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('pricing.description')} <strong>{t('pricing.descriptionBold')}</strong>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative rounded-2xl p-6 sm:p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-400 shadow-2xl transform hover:scale-105 transition-transform' 
                  : 'bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Zap className="w-4 h-4" />
                    {t('pricing.premium.popular')}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">€{plan.price}</span>
                  <span className="text-gray-600">{plan.duration ? `/${plan.duration}` : '/mes'}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm sm:text-base ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            {t('pricing.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}