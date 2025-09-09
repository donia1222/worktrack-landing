import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import CookieNotice from '@/components/CookieNotice'
import AppWrapper from '@/components/AppWrapper'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'VixTime - Control Inteligente de Horas de Trabajo con GPS | App Móvil',
  description: 'VixTime: La app líder para control automático de horarios laborales con geolocalización GPS. Auto-Timer, IA, reportes PDF y facturación. Disponible iOS/Android. ¡Descarga gratis!',
  keywords: 'VixTime, vixtime app, control horario GPS, geolocalización laboral, timer trabajo automático, app control horas, seguimiento tiempo trabajo, horarios GPS, aplicación móvil trabajo, control asistencia GPS, auto timer laboral, app facturación horas, reportes PDF trabajo, inteligencia artificial horarios',
  authors: [{ name: 'VixTime Team' }],
  creator: 'VixTime',
  publisher: 'VixTime',
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
    siteName: 'VixTime',
    title: 'VixTime - Control Inteligente de Horas de Trabajo con GPS',
    description: 'App móvil líder para control automático de horarios laborales con geolocalización GPS, IA y reportes profesionales.',
    url: 'https://www.vixtime.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VixTime - App Control de Horas de Trabajo',
        type: 'image/png',
      }
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VixTime - Control Inteligente de Horas con GPS',
    description: 'App móvil para control automático de horarios laborales con geolocalización GPS, IA y reportes profesionales.',
    images: ['/og-image.png'],
    creator: '@VixTimeApp',
    site: '@VixTimeApp',
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
          </AppWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}