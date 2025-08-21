'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import Screenshots from '@/components/Screenshots'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { LaunchModal } from '@/components/LaunchModal'
import { useLaunchModal } from '@/contexts/LaunchModalContext'

export default function Home() {
  const { isOpen, closeModal } = useLaunchModal()
  
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />

        <Features />
        <Screenshots />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
      <LaunchModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}