"use client"

import { useEffect, useState } from "react"

/**
 * EN QUE APARATO SE ESTA MIRANDO LA WEB
 *
 * Hace falta para enseñar contenido distinto en el Mac —capturas de la
 * ventana del escritorio— y lo de siempre en el telefono y el iPad.
 *
 * LA TRAMPA, Y NO ES MENOR
 * ------------------------
 * Un iPad con «Solicitar sitio web para ordenador» —que viene puesto por
 * defecto en Safari de iPadOS— **dice que es un Macintosh**. El userAgent es
 * literalmente el de un Mac. Si se mira solo esa cadena, medio trafico de
 * iPad acaba viendo la version de escritorio, con capturas de una ventana
 * que esa persona no va a ver nunca.
 *
 * Lo que los distingue es el TACTO: un iPad reporta `maxTouchPoints` 5, y un
 * Mac reporta 0. Un MacBook con pantalla tactil no existe, asi que la regla
 * aguanta. Por eso aqui «es un Mac» es: dice ser Mac **y** no tiene dedos.
 *
 * SE DECIDE EN EL NAVEGADOR, NO EN EL SERVIDOR
 * --------------------------------------------
 * Durante el primer pintado vale `null`, a proposito: el servidor no sabe en
 * que aparato esta nadie y pintar una cosa y cambiarla a otra al hidratar da
 * un parpadeo feo. Quien use esto debe tratar `null` como «todavia no se» y
 * enseñar lo de siempre mientras tanto.
 */
export type Aparato = "mac" | "ios" | "android" | "otro" | null

export function useAparato(): Aparato {
  const [aparato, setAparato] = useState<Aparato>(null)

  useEffect(() => {
    const ua = navigator.userAgent || ""
    const dedos = navigator.maxTouchPoints ?? 0

    // El iPad primero, antes de preguntar por el Mac: si va disfrazado, la
    // cadena dice «Macintosh» y solo los dedos lo delatan.
    const esIPadDisfrazado = /Macintosh/i.test(ua) && dedos > 1
    const esIOS = /iPhone|iPad|iPod/i.test(ua) || esIPadDisfrazado

    if (esIOS) {
      setAparato("ios")
      return
    }
    if (/Android/i.test(ua)) {
      setAparato("android")
      return
    }
    if (/Macintosh|Mac OS X/i.test(ua)) {
      setAparato("mac")
      return
    }
    setAparato("otro")
  }, [])

  return aparato
}

/** Atajo para el caso de uso de la landing: ¿enseño la version de Mac? */
export function useEsMac(): boolean {
  return useAparato() === "mac"
}
