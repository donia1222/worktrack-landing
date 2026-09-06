'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AppShowcase from '@/components/AppShowcase'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import AutoTimerGeofence from '@/components/AutoTimerGeofence'
import ExportReports from '@/components/ExportReports'
import SmartWidgets from '@/components/SmartWidgets'
import WorkingPhone from '@/components/WorkingPhone'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AppleWatchTeaser from '@/components/AppleWatchTeaser'
import ScrollTextReveal from '@/components/ScrollTextReveal'

export default function Home() {
  return (
    <>
      <Navigation />
      {/* overflow-x-clip, no overflow-x-hidden: hidden fuerza overflow-y a
          "auto" en cuanto un eje deja de ser "visible", y eso rompe
          position:sticky en cualquier hijo (deja de anclarse al viewport).
          clip da el mismo recorte horizontal sin ese efecto secundario. */}
      <main className="overflow-x-clip">
        <Hero />
        <ScrollTextReveal />
        <AppShowcase />
        <AutoTimerGeofence />

        {/* El reloj sube al cuarto puesto: es la novedad y lo que casi ningún
            competidor tiene. Pero no va justo bajo el hero — la mayoría de
            quien llega no tiene Apple Watch, así que primero la página
            demuestra lo que promete el titular, y el reloj es el empujón. */}
        <AppleWatchTeaser />
        <Features />
        <ExportReports />

        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  )
}