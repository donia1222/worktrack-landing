'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Menu, X, Download } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import LanguageSelector from './LanguageSelector'

const getNavItems = (t: (key: string) => string) => [
  { label: t('navigation.features'), href: '#features' },

  { label: t('navigation.pricing'), href: '#pricing' },
  { label: t('navigation.faq'), href: '#faq' },
  { label: t('navigation.contact'), href: '/contact' },
]

export default function Navigation() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = getNavItems(t)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determinar si el header está scrolled (para cambiar estilos)
      setIsScrolled(currentScrollY > 20)
      
      // Mostrar/ocultar header basado en dirección del scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed 100px threshold
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      // Es una ruta, navegar normalmente
      window.location.href = href
      return
    }
    
    // Es un ancla, hacer scroll suave
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/99 backdrop-blur-lg shadow-md border-b border-gray-100' 
          : 'bg-white/99 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold flex">
              <span className="text-[#007AFF]" style={{ fontWeight: '800' }}>Vix</span>
              <span className="text-[#5856D6]" style={{ fontWeight: '700' }}>Time</span>
        
            </h3>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-all text-gray-800 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all`}
              >
                {item.label}
              </button>
            ))}
            
            <LanguageSelector variant="header" />
            
            <a
              href="https://apps.apple.com/us/app/vixtime/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg text-sm`}
            >
              <Download className="w-3.5 h-3.5" />
              {t('navigation.download')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2.5 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-all text-sm"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t my-4 pt-4">
                <LanguageSelector variant="mobile" />
              </div>
              
              <a 
                href="https://apps.apple.com/us/app/vixtime/id6745336262?ppid=34eaaf1a-b1e3-40ab-bc3a-af4ec7c78431"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg text-sm">
                <Download className="w-3.5 h-3.5" />
                {t('navigation.download')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}