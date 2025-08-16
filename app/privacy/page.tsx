'use client'

import { Clock, ArrowLeft, Shield, Database, Bot, Lock, Eye, Users } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language'

export default function PrivacyPolicy() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>{t('privacy.backButton')}</span>
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
              <Shield className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">{t('privacy.title')}</h1>
            </div>
            <p className="text-lg text-gray-600">{t('privacy.lastUpdated')}</p>
          </div>

          {/* Priority Section */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              {t('privacy.priority.title')}
            </h2>
            <p className="text-blue-800">
              {t('privacy.priority.description')}
            </p>
          </div>

          {/* Local Storage Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-green-500" />
              {t('privacy.storage.title')}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">🏠 {t('privacy.storage.local.title')}</h3>
                <p className="text-green-800">
                  {t('privacy.storage.local.description')}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">☁️ {t('privacy.storage.cloud.title')}</h3>
                <p className="text-gray-700">
                  {t('privacy.storage.cloud.description')}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">👤 {t('privacy.storage.accounts.title')}</h3>
                <p className="text-gray-700">
                  {t('privacy.storage.accounts.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Data Backup */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-500" />
              {t('privacy.backup.title')}
            </h2>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-800">
                {t('privacy.backup.description')}
              </p>
            </div>
          </section>

          {/* AI Chat */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-pink-500" />
              {t('privacy.ai.title')}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">🤖 {t('privacy.ai.anonymous.title')}</h3>
                <p className="text-pink-800">
                  {t('privacy.ai.anonymous.description')}
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">💬 {t('privacy.ai.chat.title')}</h3>
                <p className="text-pink-800">
                  {t('privacy.ai.chat.description')}
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">📸 {t('privacy.ai.images.title')}</h3>
                <p className="text-pink-800">
                  {t('privacy.ai.images.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Subscriptions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 {t('privacy.subscriptions.title')}</h2>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800">
                {t('privacy.subscriptions.description')}
              </p>
            </div>
          </section>

          {/* Location Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 {t('privacy.location.title')}</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                {t('privacy.location.description')}
              </p>
            </div>
          </section>

          {/* Third Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 {t('privacy.thirdParty.title')}</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-3">{t('privacy.thirdParty.description')}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>{t('privacy.thirdParty.gemini')}</strong></li>
                <li><strong>{t('privacy.thirdParty.revenueCat')}</strong></li>
                <li><strong>{t('privacy.thirdParty.stores')}</strong></li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 {t('privacy.security.title')}</h2>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800">
                {t('privacy.security.description')}
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" />
              {t('privacy.children.title')}
            </h2>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-indigo-800">
                {t('privacy.children.description')}
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 {t('privacy.changes.title')}</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                {t('privacy.changes.description')}
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📧 {t('privacy.contact.title')}</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                {t('privacy.contact.description')}{' '}
                <a href="mailto:support@vixtimeapp.com" className="font-semibold underline">
                  support@vixtimeapp.com
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-500">
              {t('privacy.footer')}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}