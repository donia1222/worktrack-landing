'use client'

import { Mail, Shield, Globe } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language'
import LanguageSelector from './LanguageSelector'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/new/app-icon.png" alt="Working Time Control" width={40} height={40} className="w-10 h-10 rounded-xl" />
              <h3 className="text-xl font-bold flex">
                <span className="text-[#007AFF]" style={{ fontWeight: '800' }}>Work</span>
                <span className="text-[#5856D6]" style={{ fontWeight: '700' }}>Time Control</span>
              </h3>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">{t('footer.product')}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><a href="#app-showcase" className="hover:text-blue-400 transition-colors">{t('footer.links.features')}</a></li>
              <li><a href="#apple-watch" className="hover:text-blue-400 transition-colors">{t('navigation.watch')}</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">{t('footer.links.pricing')}</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">{t('navigation.faq')}</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">{t('footer.company')}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">{t('footer.links.contact')}</a></li>
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">{t('footer.legal.privacy')}</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition-colors">{t('footer.legal.terms')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700/50 pt-6 sm:pt-8">
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
            <p>© {currentYear} Working Time Control. {t('footer.copyright')}</p>

            {/* Quien hay detras de la app.
            
                Abajo del todo y sin traducir: un nombre de empresa, un numero
                de registro y un correo dicen lo mismo en los ocho idiomas, y
                traducirlos solo abriria la puerta a que en alguno acabe mal
                escrito el UID. */}
            <p className="mt-2 text-xs text-gray-500">
              Lweb Schweiz · UID CHE-449.145.794 ·{" "}
              <a
                href="https://lweb.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400"
              >
                lweb.ch
              </a>{" "}
              ·{" "}
              <a href="mailto:info@lweb.ch" className="transition-colors hover:text-blue-400">
                info@lweb.ch
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}