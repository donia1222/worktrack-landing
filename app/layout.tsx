import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import CookieNotice from '@/components/CookieNotice'
import MobileDownloadBanner from '@/components/MobileDownloadBanner'
import AppWrapper from '@/components/AppWrapper'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'WorkTime Control - Controla tu Tiempo de Trabajo con GPS | App Móvil',
  description: 'WorkTime Control: la app para controlar el tiempo de trabajo y calcular tus horas automáticamente con geolocalización GPS. Auto-Timer, calendario, reportes PDF y facturación. Disponible en iOS. ¡Descarga gratis!',
  applicationName: 'WorkTime Control',
  category: 'productivity',
  keywords: [
    'WorkTime Control',
    'worktime control app',
    'controlar tiempo de trabajo',
    'control de tiempo en el trabajo',
    'calcular tiempo de trabajo',
    'calcular horas de trabajo',
    'aplicación control de horario',
    'app tiempo de trabajo',
    'control horario GPS',
    'fichar con el móvil',
    'registro de jornada laboral',
    'geolocalización laboral',
    'timer trabajo automático',
    'app control horas',
    'seguimiento tiempo trabajo',
    'horarios GPS',
    'aplicación móvil trabajo',
    'control asistencia GPS',
    'auto timer laboral',
    'app facturación horas',
    'reportes PDF trabajo',
    'calculadora de horas trabajadas',
    'control horario freelance',
    'work time tracker app',
    'time tracking app GPS',
  ].join(', '),
  authors: [{ name: 'WorkTime Control Team' }],
  creator: 'WorkTime Control',
  publisher: 'WorkTime Control',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.vixtime.com'),
  alternates: {
    canonical: 'https://www.vixtime.com',
    languages: {
      'es': 'https://www.vixtime.com',
      'en': 'https://www.vixtime.com/en',
      'de': 'https://www.vixtime.com/de',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'WorkTime Control',
    title: 'WorkTime Control - Controla tu Tiempo de Trabajo con GPS',
    description: 'Controla y calcula tu tiempo de trabajo automáticamente con geolocalización GPS. Calendario visual, reportes PDF y facturación, todo en una app.',
    url: 'https://www.vixtime.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WorkTime Control - App para Controlar el Tiempo de Trabajo',
        type: 'image/png',
      }
    ],
    locale: 'es_ES',
    alternateLocale: ['en_US', 'de_DE'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorkTime Control - Controla tu Tiempo de Trabajo con GPS',
    description: 'Controla y calcula tu tiempo de trabajo automáticamente con geolocalización GPS. Calendario, reportes PDF y facturación.',
    images: ['/og-image.png'],
    creator: '@WorkTimeControlApp',
    site: '@WorkTimeControlApp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <LanguageProvider>
          <StructuredData />
          <AppWrapper>
            {children}
            <CookieNotice />
            <MobileDownloadBanner />
          </AppWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}