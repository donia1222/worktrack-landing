/**
 * La caja del Apple Watch, dibujada, con un hueco para la pantalla.
 *
 * El dibujo es el mismo que ya tenía `AppleWatchTeaser`: un SVG y no una
 * imagen, para que escale sin pesar y tome los grises de la página. Aquí sale
 * a su propio fichero porque lo usa más de un sitio, y con el dibujo escrito
 * dos veces basta tocar un radio en uno para que los dos dejen de parecerse.
 *
 * Las medidas del hueco —dónde empieza la pantalla y cuánto mide— salen del
 * mismo `viewBox` que la caja, así que quien meta algo dentro no tiene que
 * saber nada del dibujo.
 */

export const CAJA_ANCHO = 220
export const CAJA_ALTO = 268

/** El hueco de la pantalla dentro de la caja. */
const PANTALLA = { left: 24, top: 31, ancho: 172, alto: 206, radio: 38 }

export default function CajaDeReloj({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: CAJA_ANCHO, height: CAJA_ALTO }}>
      <svg viewBox={`0 0 ${CAJA_ANCHO} ${CAJA_ALTO}`} className="h-full w-full drop-shadow-2xl">
        <defs>
          <linearGradient id="caja-reloj-cuerpo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4B4F58" />
            <stop offset="0.5" stopColor="#2B2E34" />
            <stop offset="1" stopColor="#3A3E45" />
          </linearGradient>
          <linearGradient id="caja-reloj-correa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A2D33" />
            <stop offset="1" stopColor="#1B1D21" />
          </linearGradient>
        </defs>

        {/* Los dos trozos de correa, la caja, la corona y el botón lateral. */}
        <rect x="76" y="0" width="68" height="42" rx="14" fill="url(#caja-reloj-correa)" />
        <rect x="76" y="226" width="68" height="42" rx="14" fill="url(#caja-reloj-correa)" />
        <rect x="12" y="20" width="196" height="228" rx="46" fill="url(#caja-reloj-cuerpo)" />
        <rect x="209" y="102" width="6" height="24" rx="3" fill="#5A5F69" />
        <rect x="210" y="136" width="4" height="26" rx="2" fill="#4A4E57" />
        <rect
          x={PANTALLA.left}
          y={PANTALLA.top}
          width={PANTALLA.ancho}
          height={PANTALLA.alto}
          rx={PANTALLA.radio}
          fill="#000000"
        />
      </svg>

      <div
        className="absolute overflow-hidden bg-black"
        style={{
          left: PANTALLA.left,
          top: PANTALLA.top,
          width: PANTALLA.ancho,
          height: PANTALLA.alto,
          borderRadius: PANTALLA.radio,
        }}
      >
        {children}
      </div>
    </div>
  )
}
