'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '@/lib/language'

export default function Testimonials() {
  const { t } = useLanguage()
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: t('testimonials.roles.freelancer'),
      rating: 5,
      text: t('testimonials.reviews.1'),
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: t('testimonials.roles.consultant'),
      rating: 5,
      text: t('testimonials.reviews.2'),
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: t('testimonials.roles.contractor'),
      rating: 5,
      text: t('testimonials.reviews.3'),
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: t('testimonials.roles.developer'),
      rating: 5,
      text: t('testimonials.reviews.4'),
      avatar: "DK"
    },
    {
      name: "Lisa Thompson",
      role: t('testimonials.roles.designer'),
      rating: 5,
      text: t('testimonials.reviews.5'),
      avatar: "LT"
    },
    {
      name: "James Wilson",
      role: t('testimonials.roles.manager'),
      rating: 5,
      text: t('testimonials.reviews.6'),
      avatar: "JW"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}{' '}
            <span className="gradient-text">{t('testimonials.titleAccent')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}