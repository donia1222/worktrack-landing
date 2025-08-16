'use client'

import { motion } from 'framer-motion'
import { Users, Clock, TrendingUp, Award } from 'lucide-react'
import { useLanguage } from '@/lib/language'

export default function Stats() {
  const { t } = useLanguage()
  
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: t('stats.items.users'),
      color: "bg-blue-500"
    },
    {
      icon: Clock,
      value: "10+ hrs",
      label: t('stats.items.timeSaved'),
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: t('stats.items.accuracy'),
      color: "bg-purple-500"
    },
    {
      icon: Award,
      value: "4.9★",
      label: t('stats.items.rating'),
      color: "bg-orange-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('stats.title')}{' '}
            <span className="text-blue-200">{t('stats.titleAccent')}</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('stats.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}