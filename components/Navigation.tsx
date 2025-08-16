'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Menu, X, Download } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import LanguageSelector from './LanguageSelector'

const getNavItems = (t: (key: string) => string) => [
  { label: t('navigation.features'), href: '#features' },
  { label: t('navigation.screenshots'), href: '#screenshots' },
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
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#hero')}
          >
            <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center`}>
              <Clock className={`w-5 h-5 text-white`} />
            </div>
            <div className={`text-xl font-bold flex`}>
              <span className="text-[#007AFF]" style={{ fontWeight: '800' }}>Vix</span>
              <span className="text-[#5856D6]" style={{ fontWeight: '700' }}>Time</span>
              <span className="text-[#34C759]" style={{ fontWeight: '800' }}>App</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors text-gray-700 hover:text-blue-500`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            <LanguageSelector variant="header" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600`}
            >
              <Download className="w-4 h-4" />
              {t('navigation.download')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg text-gray-700`}
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
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              <button className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                {t('navigation.download')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}