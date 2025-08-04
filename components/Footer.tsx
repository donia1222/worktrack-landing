'use client'

import { motion } from 'framer-motion'
import { Clock, Mail, Shield, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import LanguageSelector from './LanguageSelector'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">WorkTrack</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">{t('footer.links.features')}</a></li>
              <li><a href="#screenshots" className="hover:text-white transition-colors">{t('navigation.screenshots')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('footer.links.pricing')}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t('navigation.faq')}</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-white transition-colors">{t('footer.links.contact')}</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t('footer.badges.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{t('footer.badges.languages')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSelector variant="footer" />
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>© {currentYear} WorkTrack. {t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}