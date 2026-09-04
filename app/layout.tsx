import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import CookieNotice from '@/components/CookieNotice'
import MobileDownloadBanner from '@/components/MobileDownloadBanner'
import AppWrapper from '@/components/AppWrapper'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  // Corto a propósito: Google corta el título sobre los 60 caracteres, y
  // lo que sobraba («| App Móvil») no lo veía nadie.
  title: 'Working Time Control — Ficha solo, con GPS',
  description: 'La app detecta cuándo llegas al trabajo y cuándo te vas: tus horas se apuntan solas. Para quien cobra por horas y tiene más de un trabajo. Calendario, informes en PDF y Apple Watch. Gratis en iOS.',
  applicationName: 'Working Time Control',
  category: 'productivity',
  keywords: [
    'Working Time Control',
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
  authors: [{ name: 'Working Time Control Team' }],
  creator: 'Working Time Control',
  publisher: 'Working Time Control',
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
    siteName: 'Working Time Control',
    title: 'Working Time Control — Olvídate de fichar',
    description: 'La app detecta cuándo llegas al trabajo y cuándo te vas. Tus horas se apuntan solas, y al final del mes ya están sumadas.',
    url: 'https://www.vixtime.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Working Time Control - App para Controlar el Tiempo de Trabajo',
        type: 'image/png',
      }
    ],
    locale: 'es_ES',
    alternateLocale: ['en_US', 'de_DE'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Time Control — Olvídate de fichar',
    description: 'La app detecta cuándo llegas y cuándo te vas. Tus horas se apuntan solas.',
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