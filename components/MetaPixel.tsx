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
 * Un id unico por evento, para la deduplicacion.
 *
 * `crypto.randomUUID` no esta en Safari viejo ni en `http://`, de ahi el
 * `?.` y el respaldo con timestamp + numero al azar.
 */
function idDeEvento() {
  return crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Lee una cookie por nombre, o nada si no existe. */
function leerCookie(nombre: string) {
  const fila = document.cookie.split('; ').find((c) => c.startsWith(`${nombre}=`))
  return fila?.split('=')[1]
}

/**
 * Manda el evento por las dos vias a la vez, con el mismo `eventID`.
 *
 * Meta avisaba de cobertura de "event ID" baja (73%, pide 75%): el pixel del
 * navegador mandaba cada evento sin `eventID` y sin nada del lado del
 * servidor con quien emparejarlo. Ahora cada evento sale dos veces con el
 * mismo id — una vez de aqui (fbq) y otra de `/api/meta-events` (la
 * Conversions API, en el servidor) — y Meta los cuenta como uno solo.
 *
 * El envio al servidor va con `keepalive`: en el click del Lead, la pagina
 * puede estar navegando ya hacia la App Store cuando el fetch todavia no ha
 * salido, y sin eso el navegador lo corta a medias.
 */
export function disparar(eventName: string, params: Record<string, unknown> = {}) {
  const eventID = idDeEvento()
  window.fbq?.('track', eventName, params, { eventID })

  fetch('/api/meta-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      eventName,
      eventID,
      eventSourceUrl: window.location.href,
      fbp: leerCookie('_fbp'),
      fbc: leerCookie('_fbc'),
      customData: params,
    }),
  }).catch(() => {
    // Si falla el envio al servidor, el del navegador ya salio: no es un
    // fallo que deba notarse en la pagina.
  })
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
    // El PageView vive aqui y no en el script de arranque: asi puede
    // mandarse tambien al servidor con el mismo id, como los demas.
    disparar('PageView')

    let contado = false

    const alBajar = () => {
      if (contado) return
      const alto = document.documentElement.scrollHeight - window.innerHeight
      if (alto <= 0) return
      if (window.scrollY / alto < PROFUNDIDAD) return
      contado = true
      disparar('ViewContent', { content_name: 'landing' })
      window.removeEventListener('scroll', alBajar)
    }

    const alTocar = (evento: MouseEvent) => {
      const enlace = (evento.target as HTMLElement | null)?.closest?.('a')
      if (!enlace) return
      const destino = enlace.getAttribute('href') || ''
      if (!destino.includes('apps.apple.com')) return
      // De donde salio el toque. Saber que dos personas descargaron no dice
      // nada; saber si lo hicieron desde el hero o despues de leerse la pagina
      // entera dice donde esta el trabajo. `data-zona` va en cada enlace y, si
      // alguno se queda sin poner, cae en la seccion que lo contiene.
      const zona =
        enlace.closest<HTMLElement>('[data-zona]')?.dataset.zona ||
        enlace.closest('section')?.id ||
        'sin_marcar'
      disparar('Lead', { content_name: `app_store_${zona}`, content_category: zona })
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
