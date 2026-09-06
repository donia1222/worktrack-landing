'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const PIXEL_ID = '2356934595046175'

/** Hasta donde hay que bajar para contar que la pagina se ha leido. */
const PROFUNDIDAD = 0.5

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

/**
 * El pixel de Meta.
 *
 * Ademas de la visita, manda las dos senales que de verdad dicen algo cuando se
 * paga por el trafico:
 *
 * - **ViewContent**, al pasar de la mitad de la pagina. Quien entra y se va en
 *   dos segundos y quien lee hasta los precios valen lo mismo para `PageView`,
 *   y no son la misma persona. Esta es la que separa un clic accidental de un
 *   interes real.
 * - **Lead**, al tocar cualquier enlace a la App Store. Es lo mas cerca de una
 *   conversion que se puede medir desde aqui: la descarga ocurre ya dentro de
 *   la App Store, donde el pixel no llega.
 *
 * Los enlaces se escuchan en el documento y no uno a uno: hay seis repartidos
 * por la pagina —cabecera, hero, CTA, banner del movil— y los que se anadan
 * despues quedan cubiertos sin tocar nada.
 */
export default function MetaPixel() {
  useEffect(() => {
    let contado = false

    const alBajar = () => {
      if (contado) return
      const alto = document.documentElement.scrollHeight - window.innerHeight
      if (alto <= 0) return
      if (window.scrollY / alto < PROFUNDIDAD) return
      contado = true
      window.fbq?.('track', 'ViewContent', { content_name: 'landing' })
      window.removeEventListener('scroll', alBajar)
    }

    const alTocar = (evento: MouseEvent) => {
      const enlace = (evento.target as HTMLElement | null)?.closest?.('a')
      if (!enlace) return
      const destino = enlace.getAttribute('href') || ''
      if (!destino.includes('apps.apple.com')) return
      window.fbq?.('track', 'Lead', { content_name: 'app_store' })
    }

    window.addEventListener('scroll', alBajar, { passive: true })
    document.addEventListener('click', alTocar)
    return () => {
      window.removeEventListener('scroll', alBajar)
      document.removeEventListener('click', alTocar)
    }
  }, [])

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
