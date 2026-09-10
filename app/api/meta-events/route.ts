import { NextRequest, NextResponse } from 'next/server'

const PIXEL_ID = '2356934595046175'
const GRAPH_VERSION = 'v21.0'

/**
 * El lado servidor del Pixel, para la Conversions API.
 *
 * MetaPixel.tsx manda cada evento por el navegador con un `eventID`; esta
 * ruta manda el *mismo* evento, con el *mismo* `eventID`, desde el servidor.
 * Meta empareja los dos por ese id y los cuenta como uno solo — eso es la
 * "deduplicacion" que pedia el diagnostico (cobertura al 73%, pedia 75%).
 * Sin este segundo envio, el `eventID` del navegador no tiene con que
 * emparejarse y no sirve de nada.
 *
 * El token vive en `META_CAPI_ACCESS_TOKEN` (`.env.local`, fuera de git) y
 * no se usa en ningun sitio del lado del cliente.
 */

interface CuerpoEvento {
  eventName: string
  eventID: string
  eventSourceUrl: string
  fbp?: string
  fbc?: string
  customData?: Record<string, unknown>
}

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!token) {
    // Sin token no hay nada que mandar: se responde 204 en vez de romper la
    // navegacion del visitante por un fallo de configuracion nuestro.
    return NextResponse.json({ skipped: true }, { status: 204 })
  }

  let cuerpo: CuerpoEvento
  try {
    cuerpo = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 })
  }

  const { eventName, eventID, eventSourceUrl, fbp, fbc, customData } = cuerpo
  if (!eventName || !eventID || !eventSourceUrl) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  // La IP y el user-agent de verdad, no los que diga el navegador — son la
  // otra mitad de lo que Meta usa para casar este envio con el del pixel.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined
  const userAgent = req.headers.get('user-agent') || undefined

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventID,
        event_source_url: eventSourceUrl,
        action_source: 'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: userAgent,
          fbp: fbp || undefined,
          fbc: fbc || undefined,
        },
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
  }

  try {
    const respuesta = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (!respuesta.ok) {
      const texto = await respuesta.text()
      console.error('Meta CAPI', respuesta.status, texto)
      return NextResponse.json({ error: 'Meta rechazo el evento' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Meta CAPI', error)
    return NextResponse.json({ error: 'Fallo de red hacia Meta' }, { status: 502 })
  }
}
