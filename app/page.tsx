'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AppShowcase from '@/components/AppShowcase'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import AutoTimerFeature from '@/components/AutoTimerFeature'
import AutoTimerGeofence from '@/components/AutoTimerGeofence'
import ExportReports from '@/components/ExportReports'
import SmartWidgets from '@/components/SmartWidgets'
import WorkingPhone from '@/components/WorkingPhone'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AppleWatchTeaser from '@/components/AppleWatchTeaser'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <AppShowcase />
        <AutoTimerGeofence />

        <Features />
        {/* El reloj va justo después del AutoTimer: es su continuación
            natural, y así la novedad aparece en la primera mitad. */}
        <AppleWatchTeaser />
        <AutoTimerFeature />
        <ExportReports />

        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  )
}