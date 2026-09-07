"""Genera messages/<idioma>.json a partir del ingles y un diccionario plano.

El ingles manda la estructura: asi ningun idioma se queda con una clave menos
—que en la pagina se veria como una frase en ingles suelta— ni con una de mas
que ya no usa nadie. Si falta o sobra algo, esto lo dice y no escribe nada.
"""
import json, sys, collections

# Lo que no se traduce: precios, booleanos, la marca y las direcciones web.
INTACTAS = {
    'pricing.free.price',
    'pricing.premium.plans.3months.price',
    'pricing.premium.plans.6months.price',
    'pricing.premium.plans.1year.price',
    'pricing.premium.plans.3months.popular',
    'pricing.premium.plans.6months.popular',
    'pricing.premium.plans.1year.popular',
    'mobileBanner.name',
    'launchModal.date',
    'launchModal.year',
}


def aplanar(o, pre=''):
    for k, v in o.items():
        if isinstance(v, dict):
            yield from aplanar(v, pre + k + '.')
        else:
            yield pre + k, v


def construir(idioma, traducciones):
    base = json.load(open('messages/en.json', encoding='utf-8'),
                     object_pairs_hook=collections.OrderedDict)
    rutas = [r for r, _ in aplanar(base)]

    faltan = [r for r in rutas if r not in traducciones and r not in INTACTAS]
    sobran = [r for r in traducciones if r not in rutas]
    if faltan or sobran:
        for r in faltan:
            print(f'  FALTA  {r}', file=sys.stderr)
        for r in sobran:
            print(f'  SOBRA  {r}', file=sys.stderr)
        raise SystemExit(f'{idioma}: {len(faltan)} faltan, {len(sobran)} sobran')

    def poner(o, pre=''):
        for k, v in o.items():
            ruta = pre + k
            if isinstance(v, dict):
                poner(v, ruta + '.')
            elif ruta in traducciones:
                o[k] = traducciones[ruta]

    poner(base)
    with open(f'messages/{idioma}.json', 'w', encoding='utf-8') as f:
        json.dump(base, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'messages/{idioma}.json — {len(rutas)} claves')
