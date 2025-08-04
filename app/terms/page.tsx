import { Clock, ArrowLeft, FileText, Users, Shield, Zap, Bot, Ban, AlertTriangle, Scale } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a WorkTrack</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">WorkTrack</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">Términos de Servicio</h1>
            </div>
            <p className="text-lg text-gray-600">Última actualización: Agosto 2025</p>
          </div>

          {/* Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Aceptación de Términos
            </h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Al descargar, instalar o usar WorkTrack, aceptas estar sujeto a estos Términos de Servicio. 
                Si no estás de acuerdo con estos términos, por favor no uses la app.
              </p>
            </div>
          </section>

          {/* App Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-500" />
              Descripción de la App
            </h2>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 mb-3">
                WorkTrack es una aplicación de seguimiento de tiempo de trabajo que te ayuda a:
              </p>
              <ul className="list-disc list-inside space-y-1 text-green-800">
                <li>Monitorear y gestionar tus horas de trabajo con <strong>Auto-Timer GPS</strong></li>
                <li>Crear horarios flexibles y calendarios visuales</li>
                <li>Generar reportes profesionales en PDF</li>
                <li>Usar <strong>Analyze-Bot IA</strong> para analizar documentos laborales</li>
                <li>Sincronizar con calendarios nativos iOS/Android</li>
              </ul>
              <p className="text-green-800 mt-3">
                <strong>Todos los datos se almacenan localmente en tu dispositivo.</strong>
              </p>
            </div>
          </section>

          {/* License */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-500" />
              Licencia
            </h2>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-800">
                Te otorgamos una licencia limitada, no exclusiva, no transferible para usar WorkTrack 
                con fines personales o comerciales de acuerdo con estos términos.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Responsabilidades del Usuario</h2>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800 mb-3">Eres responsable de:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li><strong>(a)</strong> Mantener la seguridad de tu dispositivo y datos de la app</li>
                <li><strong>(b)</strong> Crear respaldos regulares de tus datos</li>
                <li><strong>(c)</strong> Usar la app en cumplimiento con las leyes aplicables</li>
                <li><strong>(d)</strong> Proporcionar permisos necesarios (ubicación, calendario, notificaciones)</li>
              </ul>
            </div>
          </section>

          {/* Data Ownership */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🏠 Propiedad de Datos</h2>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Mantienes la propiedad completa</strong> de todos los datos que creas o almacenas en la app. 
                No reclamamos ningún derecho sobre tus datos de trabajo, horarios o reportes.
              </p>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6 text-red-500" />
              Usos Prohibidos
            </h2>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800 mb-3">No puedes:</p>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li><strong>(a)</strong> Realizar ingeniería inversa o intentar extraer código fuente</li>
                <li><strong>(b)</strong> Usar la app para actividades ilegales</li>
                <li><strong>(c)</strong> Intentar eludir medidas de seguridad</li>
                <li><strong>(d)</strong> Redistribuir o revender la aplicación</li>
              </ul>
            </div>
          </section>

          {/* Premium Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Funciones Premium
            </h2>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800 mb-3">
                Algunas funciones requieren una <strong>suscripción premium</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li>Auto-Timer GPS con geofencing personalizable</li>
                <li>Analyze-Bot IA con Gemini 1.5 Pro</li>
                <li>Trabajos ilimitados y horarios flexibles</li>
                <li>Sistema completo de facturación profesional</li>
                <li>Sincronización con calendarios nativos</li>
              </ul>
              <p className="text-yellow-800 mt-3">
                Los términos de suscripción se rigen por las políticas de <strong>RevenueCat</strong>, 
                App Store o Google Play Store. Las suscripciones se renuevan automáticamente a menos que se cancelen.
              </p>
            </div>
          </section>

          {/* AI Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-pink-500" />
              Funciones de IA
            </h2>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-pink-800">
                Las funciones de <strong>Analyze-Bot con Gemini 1.5 Pro</strong> se proporcionan 'tal como están' 
                y pueden no ser siempre precisas. Debes verificar cualquier información proporcionada por las 
                funciones de IA antes de tomar decisiones comerciales importantes.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              Descargos de Responsabilidad
            </h2>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-800">
                La app se proporciona <strong>'tal como está'</strong> sin garantías. No somos responsables por 
                pérdida de datos, horas de trabajo perdidas o decisiones comerciales basadas en datos de la app.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Limitación de Responsabilidad</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Nuestra responsabilidad se limita al monto que pagaste por la app o suscripción. 
                No somos responsables por daños indirectos, incidentales o consecuenciales.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔚 Terminación</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Puedes dejar de usar la app en cualquier momento. Podemos terminar tu acceso si violas estos términos. 
                Al terminar, tu licencia para usar la app finaliza, pero conservas todos tus datos locales.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Cambios a los Términos</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Podemos modificar estos términos en cualquier momento. El uso continuado de la app después de 
                los cambios constituye aceptación de los nuevos términos.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-500" />
              Ley Aplicable
            </h2>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-indigo-800">
                Estos términos se rigen por las leyes de España, donde se encuentra ubicado el desarrollador de la app.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📧 Información de Contacto</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Para preguntas sobre estos Términos de Servicio, contáctanos en{' '}
                <a href="mailto:support@worktrack-app.com" className="font-semibold underline">
                  support@worktrack-app.com
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-500">
              Estos términos son efectivos desde agosto de 2025 y se aplican a todas las versiones de WorkTrack.
            </p>
            <p className="text-gray-500 mt-2">
              WorkTrack - Desarrollado con React Native + Expo SDK 52
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}