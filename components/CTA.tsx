'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { useLanguage } from '@/lib/language'

export default function CTA() {
  const { t } = useLanguage()
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {t('cta.title')}{' '}
            <span className="text-yellow-300">{t('cta.titleAccent')}</span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>

          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-xs sm:text-sm text-blue-100">{t('cta.rating')}</span>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-medium sm:font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {t('cta.downloadButton')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
          </motion.div>

          <p className="mt-6 text-sm text-blue-200">
            {t('cta.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}