import { Clock, ArrowLeft, Shield, Database, Bot, Lock, Eye, Users } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
              <Shield className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold text-gray-900">Política de Privacidad</h1>
            </div>
            <p className="text-lg text-gray-600">Última actualización: Agosto 2025</p>
          </div>

          {/* Priority Section */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Tu Privacidad es Nuestra Prioridad
            </h2>
            <p className="text-blue-800">
              En WorkTrack, nos tomamos tu privacidad en serio. Esta Política de Privacidad explica cómo recopilamos, 
              usamos y protegemos tu información cuando usas nuestra aplicación de seguimiento de tiempo de trabajo.
            </p>
          </div>

          {/* Local Storage Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-green-500" />
              Almacenamiento de Datos
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">🏠 100% Almacenamiento Local</h3>
                <p className="text-green-800">
                  Todos tus datos de trabajo, incluyendo información de empleos, registros de tiempo, horarios y 
                  configuraciones se almacenan exclusivamente en tu dispositivo. No tenemos acceso a esta información.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">☁️ Sin Servidores en la Nube</h3>
                <p className="text-gray-700">
                  No tenemos bases de datos ni servidores en la nube que almacenen tu información personal. 
                  Tus datos nunca salen de tu dispositivo a menos que elijas explícitamente exportarlos o compartirlos.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">👤 Sin Cuentas de Usuario</h3>
                <p className="text-gray-700">
                  La app funciona sin crear cuentas de usuario, lo que significa que no recopilamos ni almacenamos 
                  información de identificación personal como nombres, direcciones de correo electrónico o números de teléfono.
                </p>
              </div>
            </div>
          </section>

          {/* Data Backup */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-500" />
              Respaldo de Datos
            </h2>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-800">
                Dado que todos los datos se almacenan localmente en tu dispositivo, eres responsable de crear 
                respaldos regulares. La app proporciona funcionalidad de exportación para ayudarte a guardar 
                tus datos de forma segura.
              </p>
            </div>
          </section>

          {/* AI Chat */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6 text-pink-500" />
              Funciones de Chat con IA
            </h2>
            
            <div className="space-y-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">🤖 Procesamiento Anónimo</h3>
                <p className="text-pink-800">
                  Los mensajes enviados al chatbot de IA se procesan de forma anónima a través de la API de Gemini de Google. 
                  No se incluye información personal en estas solicitudes.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">💬 Sin Almacenamiento de Chat</h3>
                <p className="text-pink-800">
                  No almacenamos el historial de chat ni las conversaciones en nuestros servidores. 
                  Todos los datos del chat permanecen en tu dispositivo.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-semibold text-pink-900 mb-2">📸 Análisis de Imágenes</h3>
                <p className="text-pink-800">
                  Las imágenes analizadas por la IA se procesan temporalmente y no se almacenan en servidores externos.
                </p>
              </div>
            </div>
          </section>

          {/* Subscriptions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Suscripciones</h2>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800">
                Si compras una suscripción premium, la información de pago es manejada por Apple App Store o 
                Google Play Store según sus respectivas políticas de privacidad. No tenemos acceso a tus detalles de pago.
              </p>
            </div>
          </section>

          {/* Location Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Datos de Ubicación</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Los datos de ubicación se usan únicamente para la funcionalidad del timer automático y se almacenan 
                localmente en tu dispositivo. La información de ubicación nunca se transmite a nuestros servidores.
              </p>
            </div>
          </section>

          {/* Third Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Servicios de Terceros</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-3">Solo usamos servicios esenciales de terceros:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>API de Google Gemini</strong> para funcionalidad de chat con IA (anónimo)</li>
                <li><strong>RevenueCat</strong> para gestión de suscripciones</li>
                <li><strong>Tiendas de aplicaciones</strong> para distribución y pagos</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Seguridad de Datos</h2>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800">
                Dado que todos los datos se almacenan localmente en tu dispositivo, la seguridad de los datos 
                depende de las medidas de seguridad de tu dispositivo. Recomendamos usar cifrado del dispositivo 
                y pantallas de bloqueo seguras.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" />
              Privacidad de Menores
            </h2>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-indigo-800">
                Nuestra app no está diseñada para niños menores de 13 años. No recopilamos conscientemente 
                información personal de menores.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Cambios a Esta Política</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio se publicará 
                en la app y entrará en vigor inmediatamente después de la publicación.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📧 Contáctanos</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Si tienes preguntas sobre esta Política de Privacidad, contáctanos en{' '}
                <a href="mailto:support@worktrack-app.com" className="font-semibold underline">
                  support@worktrack-app.com
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-500">
              Esta política es efectiva desde agosto de 2025 y se aplica a todas las versiones de WorkTrack.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}