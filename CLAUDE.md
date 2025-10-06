# WorkTi Landing Page - Claude Assistant Guide

## 📋 Información del Proyecto

**WorkTi** es una aplicación móvil para el control inteligente de horas de trabajo con geolocalización GPS. Esta landing page promociona la app y está construida con Next.js, TypeScript y Tailwind CSS.

### 🎯 Características Principales de la App
- **Auto-Timer GPS**: Detecta automáticamente cuando llegas/sales del trabajo
- **Geofencing**: Radio configurable de 50m a 500m con retrasos de 2-10 minutos
- **Analyze-Bot IA**: Chatbot con Gemini 1.5 Pro para analizar horarios laborales
- **Trabajos Ilimitados**: Gestión múltiple con horarios flexibles (Premium)
- **Reportes PDF**: Exportación profesional sin logo (Premium)
- **Sistema de Facturación**: Cálculo automático de ingresos
- **Almacenamiento Local**: 100% privacidad, datos en dispositivo
- **Sincronización Calendario**: iOS/Android nativo + exportación ICS
- **Notificaciones Avanzadas**: 2 canales Android especializados

### 💰 Modelo de Precios
- **Gratuito**: 1 trabajo, timer manual, reportes básicos
- **Premium**: €3.99 por 3 meses (no mensual)
  - Trabajos ilimitados + Auto-Timer GPS + IA + PDF + Facturación completa

---

## 🌍 Internacionalización (i18n)

### Idiomas Soportados
- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Traducción completa
- **Alemán (de)**: Traducción completa

### Sistema de Traducciones
- **Archivos**: `/messages/[lang].json`
- **Hook**: `useLanguage()` con función `t(key)`
- **Detección**: Automática por navegador con fallback a inglés
- **Persistencia**: localStorage para preferencias del usuario
- **Selectores**: Header y footer con banderas

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
/app
  /contact - Página de contacto
  /privacy - Política de privacidad
  /terms - Términos y condiciones
  layout.tsx - Layout principal con providers
  page.tsx - Homepage con todos los componentes

/components
  Navigation.tsx - Header sticky con navegación
  Hero.tsx - Sección principal con CTA
  Features.tsx - 6 características principales
  Screenshots.tsx - Carrusel de capturas de pantalla
  Pricing.tsx - Planes gratuito vs premium
  FAQ.tsx - 15 preguntas categorizadas
  CTA.tsx - Call to action final
  Footer.tsx - Footer limpio con enlaces funcionales
  CookieNotice.tsx - Aviso de cookies GDPR

/lib
  language.ts - Sistema de internacionalización

/messages
  es.json - Traducciones español
  en.json - Traducciones inglés  
  de.json - Traducciones alemán
```

### Stack Tecnológico
- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS v3**: Estilos utility-first
- **Framer Motion**: Animaciones y transiciones
- **Lucide React**: Iconos SVG

---

## 🎨 Componentes Principales

### Navigation.tsx
- **Sticky header** con fondo blanco semitransparente
- **Navegación responsive** con menú hamburguesa móvil
- **Selector de idiomas** integrado
- **Logo consistente** siempre visible
- **Enlaces funcionales** a secciones y páginas

### Hero.tsx
- **Título principal** con degradado azul
- **Características destacadas**: Auto-Timer GPS, IA, PDF, Multiplataforma
- **CTAs duales**: Descargar App + Ver Demo
- **Modal de demo** con mockup interactivo

### Features.tsx
- **6 características principales** con iconos y descripciones
- **Animaciones staggered** con Framer Motion
- **Badges informativos**: Almacenamiento local, 5 idiomas, React Native

### Screenshots.tsx  
- **Carrusel interactivo** con 4 pantallas simuladas
- **Mockups de iPhone** con contenido realista
- **Navegación con flechas** y indicadores de puntos

### Pricing.tsx
- **Dos planes**: Gratuito vs Premium €3.99/3 meses
- **Tabla comparativa** con características incluidas/excluidas
- **Badge "Más Popular"** en plan Premium
- **CTAs diferenciados** por plan

### FAQ.tsx
- **15 preguntas** organizadas en 4 categorías
- **Búsqueda en tiempo real** por texto
- **Acordeón animado** - solo una pregunta abierta
- **CTA de soporte** al final

### CookieNotice.tsx
- **Aviso GDPR** que aparece después de 2 segundos
- **Persistencia** en localStorage
- **Enlaces funcionales** a política de privacidad
- **Animación smooth** desde abajo

---

## ⚙️ Configuración y Comandos

### Scripts NPM
```bash
npm run dev        # Servidor desarrollo (puerto 3000/3002)
npm run build      # Build de producción
npm run start      # Servidor producción
npm run type-check # Verificación TypeScript
```

### Variables de Entorno
Actualmente no hay variables de entorno configuradas. Si se necesitan:
- Crear `.env.local` para desarrollo
- Añadir al `.gitignore` (ya está incluido)

---

## 🚀 Deploy y Hosting

### Recomendaciones
- **Vercel**: Deploy automático desde GitHub
- **Netlify**: Alternativa con edge functions
- **GitHub Pages**: Para hosting estático

### Build de Producción
```bash
npm run build
npm run start
```

---

## 📝 Tareas Pendientes

### ✅ Completadas
- [x] Sistema de internacionalización completo
- [x] Traducciones es/en/de para todos los componentes
- [x] Navegación sticky corregida (visibilidad)
- [x] Footer limpiado (solo enlaces funcionales)
- [x] Aviso de cookies GDPR implementado
- [x] Repositorio GitHub configurado

### ⏳ Pendientes
- [ ] Páginas legales (Contact, Privacy, Terms) con contenido real
- [ ] Integración con analytics (Google Analytics/Plausible)
- [ ] Optimización SEO (meta tags dinámicos por idioma)
- [ ] Sitemap.xml generado automáticamente
- [ ] Tests unitarios para componentes principales
- [ ] Lighthouse audit y optimizaciones de performance

---

## 🛠️ Instrucciones para Próximas Modificaciones

### Añadir Nuevas Traducciones
1. Actualizar `/messages/[lang].json` con nuevas claves
2. Usar `t('clave.anidada')` en componentes
3. Mantener consistencia en estructura de objetos JSON

### Modificar Precios
⚠️ **IMPORTANTE**: El precio es €3.99 por **3 MESES** (no mensual)
- Actualizar en `/messages/*/pricing.premium.price` y `duration`
- Verificar que todas las traducciones coincidan

### Añadir Nuevas Características
- Actualizar `/messages/*/features.items` para traducciones
- Añadir iconos de Lucide React consistentes
- Mantener máximo 6 características para diseño equilibrado

### Gestión de FAQ
- Máximo 20 preguntas para evitar sobrecarga
- Mantener 4 categorías: General, Tiempo, Facturación, Técnico
- Una sola pregunta abierta por defecto (mejorar UX)

### Cookies y GDPR
- El aviso se guarda en `localStorage.cookieAccepted`
- Enlaza automáticamente a `/privacy` para más información
- Cumple con normativas europeas básicas

---

## 🔍 Debugging y Troubleshooting

### Problemas Comunes
1. **Traducciones no aparecen**: Verificar estructura JSON y claves `t()`
2. **Navegación no visible**: Comprobar contraste de colores en Navigation.tsx
3. **Hydration errors**: Asegurar SSR compatibility en language detection
4. **Build failures**: Ejecutar `npm run type-check` antes del build

### Logs Útiles
```bash
# Verificar estructura de traducciones
console.log(t('navigation')) 

# Debug de idioma actual
console.log(language, setLanguage)

# Estado del aviso de cookies
console.log(localStorage.getItem('cookieAccepted'))
```

---

## 📞 Información de Contacto del Proyecto

**Repositorio**: https://github.com/donia1222/worktrack-landing.git
**Nombre de la aplicación**: WorkTi (anteriormente VixTimeApp)
**Tecnologías**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
**Idiomas**: Español (por defecto), Inglés, Alemán
**Estado**: Landing page funcional lista para producción

---

*Última actualización: Enero 2025*
*Para modificaciones futuras, seguir esta guía y mantener la consistencia del código.*