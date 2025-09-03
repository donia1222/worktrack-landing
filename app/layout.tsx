import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import CookieNotice from '@/components/CookieNotice'
import AppWrapper from '@/components/AppWrapper'
import { LaunchModalProvider } from '@/contexts/LaunchModalContext'

export const metadata: Metadata = {
  title: 'VixTime - Control de Horas de Trabajo',
  description: 'La app definitiva para el seguimiento automático de tu tiempo laboral con geolocalización inteligente',
  keywords: 'control horario, geolocalización laboral, timer trabajo, app laboral',
  openGraph: {
    title: 'VixTime - Control de Horas de Trabajo',
    description: 'Seguimiento automático de tiempo laboral con geolocalización',
    images: ['/og-image.png'],
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
          <LaunchModalProvider>
            <AppWrapper>
              {children}
              <CookieNotice />
            </AppWrapper>
          </LaunchModalProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}