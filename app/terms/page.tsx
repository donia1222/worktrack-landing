'use client'

import { Clock, ArrowLeft, FileText, Users, Shield, Zap, Bot, Ban, AlertTriangle, Scale } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language'

export default function TermsOfService() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('terms.backButton')}</span>
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">{t('terms.title')}</h1>
            </div>
            <p className="text-lg text-gray-600">{t('terms.lastUpdated')}</p>
          </div>

          {/* Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              {t('terms.acceptance.title')}
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                {t('terms.acceptance.description')}
              </p>
            </div>
          </section>

          {/* License */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              {t('terms.license.title')}
            </h2>
            <div className="bg-green-50 rounded-lg p-4 space-y-3">
              <p className="text-green-800">
                {t('terms.license.description')}
              </p>
              <p className="text-green-800">
                {t('terms.license.restrictions')}
              </p>
            </div>
          </section>

          {/* Subscriptions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              {t('terms.subscriptions.title')}
            </h2>
            <div className="bg-yellow-50 rounded-lg p-4 space-y-3">
              <p className="text-yellow-800">
                <strong>{t('terms.subscriptions.premium.title')}</strong> {t('terms.subscriptions.premium.description')}
              </p>
              <p className="text-yellow-800">
                <strong>{t('terms.subscriptions.billing.title')}</strong> {t('terms.subscriptions.billing.description')}
              </p>
              <p className="text-yellow-800">
                <strong>{t('terms.subscriptions.cancellation.title')}</strong> {t('terms.subscriptions.cancellation.description')}
              </p>
            </div>
          </section>

          {/* AI Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-500" />
              {t('terms.ai.title')}
            </h2>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-800">
                {t('terms.ai.description')}
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('terms.responsibilities.title')}
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-3">{t('terms.responsibilities.description')}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('terms.responsibilities.item1')}</li>
                <li>{t('terms.responsibilities.item2')}</li>
                <li>{t('terms.responsibilities.item3')}</li>
                <li>{t('terms.responsibilities.item4')}</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6 text-red-500" />
              {t('terms.prohibited.title')}
            </h2>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800 mb-3">{t('terms.prohibited.description')}</p>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>{t('terms.prohibited.item1')}</li>
                <li>{t('terms.prohibited.item2')}</li>
                <li>{t('terms.prohibited.item3')}</li>
                <li>{t('terms.prohibited.item4')}</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              {t('terms.disclaimer.title')}
            </h2>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-800 uppercase font-bold mb-2">
                {t('terms.disclaimer.warranty')}
              </p>
              <p className="text-orange-800">
                {t('terms.disclaimer.description')}
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-500" />
              {t('terms.liability.title')}
            </h2>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-indigo-800">
                {t('terms.liability.description')}
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('terms.indemnification.title')}
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                {t('terms.indemnification.description')}
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('terms.governing.title')}
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                {t('terms.governing.description')}
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('terms.changes.title')}
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                {t('terms.changes.description')}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('terms.contact.title')}
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                {t('terms.contact.description')}{' '}
                <a href="mailto:support@vixtime.com" className="font-semibold underline">
                  support@vixtime.com
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-500">
              {t('terms.footer')}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}