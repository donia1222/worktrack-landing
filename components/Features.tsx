'use client'
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
  Zap,
  Layout
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
    icon: Layout,
    title: t('features.items.widgets.title'),
    description: t('features.items.widgets.description'),
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
  },
  {
    icon: Briefcase,
    title: t('features.items.jobs.title'),
    description: t('features.items.jobs.description'),
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
  },
  {
    icon: MessageSquare,
    title: t('features.items.ai.title'),
    description: t('features.items.ai.description'),
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
  },
  {
    icon: BarChart3,
    title: t('features.items.reports.title'),
    description: t('features.items.reports.description'),
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
  },
  {
    icon: Bell,
    title: t('features.items.notifications.title'),
    description: t('features.items.notifications.description'),
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
  },
]

export default function Features() {
  const { t } = useLanguage()
  const features = getFeatures(t)
  
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {t('features.title')}{' '}
            <span className="gradient-text">{t('features.titleAccent')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('features.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl p-5 shadow-md border border-gray-100"
            >
              <div className={`${feature.lightColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                <feature.icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
              
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-5 rounded-full filter blur-3xl`} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
        </div>
      </div>
    </section>
  )
}