'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Shield,
  Briefcase,
  Bell,
  FileText,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react'
import { useLanguage } from '@/lib/language'

const getFeatures = (t: (key: string) => string) => [
  {
    icon: MapPin,
    title: t('features.items.autoTimer.title'),
    description: t('features.items.autoTimer.description'),
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
  },
  {
    icon: Briefcase,
    title: t('features.items.jobs.title'),
    description: t('features.items.jobs.description'),
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
  },
  {
    icon: Calendar,
    title: t('features.items.calendar.title'),
    description: t('features.items.calendar.description'),
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
  },
  {
    icon: BarChart3,
    title: t('features.items.reports.title'),
    description: t('features.items.reports.description'),
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
  },
  {
    icon: MessageSquare,
    title: t('features.items.ai.title'),
    description: t('features.items.ai.description'),
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
  },
  {
    icon: Bell,
    title: t('features.items.notifications.title'),
    description: t('features.items.notifications.description'),
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  const { t } = useLanguage()
  const features = getFeatures(t)
  
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('features.title')}{' '}
            <span className="gradient-text">{t('features.titleAccent')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`${feature.lightColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>
              
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-5 rounded-full filter blur-3xl group-hover:opacity-10 transition-opacity`} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-medium"><strong>{t('features.badges.localStorage')}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium"><strong>{t('features.badges.languages')}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 font-medium"><strong>{t('features.badges.tech')}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 font-medium"><strong>{t('features.badges.subscriptions')}</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}