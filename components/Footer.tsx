"use client"

import { Clock, Shield, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language"
import LanguageSelector from "./LanguageSelector"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="relative bg-slate-950 text-white py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold flex">
                <span className="text-blue-400" style={{ fontWeight: "800" }}>
                  Vix
                </span>
                <span className="text-indigo-400" style={{ fontWeight: "700" }}>
                  Time
                </span>
                <span className="text-emerald-400" style={{ fontWeight: "800" }}>
                  App
                </span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">{t("footer.description")}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Active Development</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-6 text-slate-200 text-lg">{t("footer.product")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer.links.features")}
                </a>
              </li>
              <li>
                <a
                  href="#screenshots"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("navigation.screenshots")}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer.links.pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("navigation.faq")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-slate-200 text-lg">{t("footer.company")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/contact"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer.links.contact")}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer.legal.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-slate-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {t("footer.legal.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800/60 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2.5 text-slate-400">
                <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <span>{t("footer.badges.secure")}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <span>{t("footer.badges.languages")}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector variant="footer" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
            <p className="text-sm text-slate-500">
              © {currentYear} <span className="text-slate-400 font-medium">VixTimeApp</span>. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
