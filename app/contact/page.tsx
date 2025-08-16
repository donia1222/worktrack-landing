'use client'

import { useState } from 'react'
import { Clock, ArrowLeft, Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, AlertCircle, HelpCircle, Bug, Lightbulb, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language'

export default function ContactPage() {
  const { t } = useLanguage()
  
  const contactReasons = [
    { id: 'support', label: t('contact.reasons.support'), icon: HelpCircle, color: 'bg-blue-500' },
    { id: 'bug', label: t('contact.reasons.bug'), icon: Bug, color: 'bg-red-500' },
    { id: 'feature', label: t('contact.reasons.feature'), icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'business', label: t('contact.reasons.business'), icon: Mail, color: 'bg-green-500' },
    { id: 'feedback', label: t('contact.reasons.feedback'), icon: Star, color: 'bg-purple-500' },
  ]
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío (aquí iría la lógica real de envío)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', reason: '', subject: '', message: '' })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('contact.backButton')}</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">VixTimeApp</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('contact.info.email.title')}</h3>
                    <p className="text-gray-600 text-sm">support@vixtimeapp.com</p>
                    <p className="text-gray-500 text-xs mt-1">{t('contact.info.email.description')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('contact.info.response.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('contact.info.response.description')}</p>
                    <p className="text-gray-500 text-xs mt-1">{t('contact.info.response.schedule')}</p>
                    <p className="text-gray-500 text-xs">{t('contact.info.response.weekend')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('contact.info.location.title')}</h3>
                    <p className="text-gray-600 text-sm">Barcelona, España</p>
                    <p className="text-gray-500 text-xs mt-1">{t('contact.info.location.description')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">{t('contact.faqLink.title')}</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  {t('contact.faqLink.description')}
                </p>
                <Link 
                  href="/#faq"
                  className="inline-flex items-center gap-2 text-yellow-900 font-semibold text-sm hover:text-yellow-700 transition-colors"
                >
                  {t('contact.faqLink.button')} →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.form.title')}
              </h2>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('contact.form.success.description')}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {t('contact.form.success.button')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.name')}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.reason')} *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {contactReasons.map((reason) => (
                        <label
                          key={reason.id}
                          className={`relative flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                            formData.reason === reason.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={reason.id}
                            checked={formData.reason === reason.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`w-8 h-8 ${reason.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <reason.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {reason.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('contact.form.placeholders.subject')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder={t('contact.form.placeholders.message')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      * {t('contact.form.required')}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}