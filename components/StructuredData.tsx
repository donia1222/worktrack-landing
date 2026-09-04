'use client'

import { useLanguage } from '@/lib/language'
import { useEffect, useState } from 'react'

export default function StructuredData() {
  // Always call hooks at the top level
  const { language, t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Return simple version during SSR
  if (!isClient) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Working Time Control",
          "url": "https://www.vixtime.com",
          "logo": "https://www.vixtime.com/logo.png",
          "description": "App para controlar y calcular el tiempo de trabajo automáticamente con geolocalización GPS"
        }) }}
      />
    )
  }
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Working Time Control",
    "url": "https://www.vixtime.com",
    "logo": "https://www.vixtime.com/logo.png",
    "description": "App para controlar el tiempo de trabajo y calcular tus horas automáticamente con geolocalización GPS",
    "foundingDate": "2024",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["iOS"],
    "sameAs": [
      "https://apps.apple.com/app/id6745336262"
    ]
  };

  const softwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Working Time Control",
    "description": "Controla y calcula tu tiempo de trabajo automáticamente con geolocalización GPS. Calendario visual, reportes PDF y facturación profesional.",
    "url": "https://www.vixtime.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["iOS"],
    "offers": [
      {
        "@type": "Offer",
        "name": t("pricing.free.name"),
        "price": "0",
        "priceCurrency": language === 'en' ? "USD" : language === 'de' ? "CHF" : "EUR",
        "description": t("pricing.free.description")
      },
      {
        "@type": "Offer",
        "name": `${t("pricing.premium.name")} - 3 ${language === 'en' ? 'months' : language === 'de' ? 'Monate' : 'meses'}`,
        "price": t("pricing.premium.plans.3months.price").replace(/[^0-9.,]/g, ''),
        "priceCurrency": language === 'en' ? "USD" : language === 'de' ? "CHF" : "EUR",
        "priceValidUntil": "2025-12-31",
        "billingDuration": "P3M",
        "description": t("pricing.premium.description")
      },
      {
        "@type": "Offer",
        "name": `${t("pricing.premium.name")} - 6 ${language === 'en' ? 'months' : language === 'de' ? 'Monate' : 'meses'}`,
        "price": t("pricing.premium.plans.6months.price").replace(/[^0-9.,]/g, ''),
        "priceCurrency": language === 'en' ? "USD" : language === 'de' ? "CHF" : "EUR",
        "priceValidUntil": "2025-12-31",
        "billingDuration": "P6M",
        "description": t("pricing.premium.description")
      },
      {
        "@type": "Offer",
        "name": `${t("pricing.premium.name")} - 1 ${language === 'en' ? 'year' : language === 'de' ? 'Jahr' : 'año'}`,
        "price": t("pricing.premium.plans.1year.price").replace(/[^0-9.,]/g, ''),
        "priceCurrency": language === 'en' ? "USD" : language === 'de' ? "CHF" : "EUR",
        "priceValidUntil": "2025-12-31",
        "billingDuration": "P1Y",
        "description": t("pricing.premium.description")
      }
    ],
    "featureList": [
      "Auto-Timer GPS",
      "Geofencing configurable",
      "Estadísticas de salario y horas",
      "Trabajos ilimitados",
      "Reportes PDF profesionales",
      "Sistema de facturación",
      "Almacenamiento local 100% privado",
      "Sincronización con calendario",
      "Notificaciones avanzadas"
    ],
    "screenshot": "https://www.vixtime.com/screenshot.png",
    "downloadUrl": [
      "https://apps.apple.com/app/id6745336262"
    ],
    "author": {
      "@type": "Organization",
      "name": "Working Time Control Team"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Working Time Control",
    "url": "https://www.vixtime.com",
    "description": "Página oficial de Working Time Control - Controla y calcula tu tiempo de trabajo con GPS",
    "inLanguage": ["es", "en", "de"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.vixtime.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es Working Time Control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Working Time Control es una aplicación móvil para controlar y calcular el tiempo de trabajo automáticamente con geolocalización GPS, detectando cuando llegas y sales del trabajo sin intervención manual."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funciona el Auto-Timer GPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El Auto-Timer GPS utiliza geofencing para crear un radio configurable de 50m a 500m alrededor de tu lugar de trabajo, iniciando y pausando automáticamente el cronómetro cuando entras o sales de esta zona."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta Working Time Control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Working Time Control tiene un plan gratuito con funciones básicas y un plan Premium con trabajos ilimitados, Auto-Timer GPS, reportes PDF y facturación completa, disponible por 3, 6 o 12 meses."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mis datos están seguros?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, Working Time Control utiliza almacenamiento local al 100%, lo que significa que todos tus datos permanecen únicamente en tu dispositivo, garantizando total privacidad."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}