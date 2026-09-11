"use client"

import { motion } from "framer-motion"
import { FileText, Building2, Clock, CalendarDays, Euro, Download } from "lucide-react"
import { useLanguage } from "@/lib/language"
import Image from "next/image"

/**
 * Datos de ejemplo para la vista previa del PDF — ficticios (nombre, empresa
 * y dirección no son de ningún cliente real), uno por idioma porque el PDF
 * de verdad sale así: fechas, cabeceras y textos traducidos al idioma de la
 * app, no solo al de la web.
 */
const PDF_DEMO = {
  es: {
    title: "Informe de Trabajo",
    dateRange: "Del 8 al 12 de septiembre",
    reportId: "INF-2026-0912",
    generatedOn: "12 de septiembre de 2026",
    employeeName: "Alex Müller",
    companyLabel: "EMPRESA",
    company: "Café Central",
    addressLine1: "Bahnhofstrasse 12",
    addressLine2: "8001 Zúrich",
    totalHoursLabel: "HORAS TOTALES",
    totalHours: "40.0h",
    workDaysLabel: "DÍAS TRABAJADOS",
    workDays: "5",
    avgDayLabel: "MEDIA / DÍA",
    avgDay: "8.0h",
    amountLabel: "IMPORTE A PAGAR",
    amountRate: "25 €/h · según horas trabajadas",
    amount: "1000.00 €",
    dailyListLabel: "DETALLE DIARIO",
    dayHeader: "DÍA",
    workHeader: "TRABAJO",
    hoursHeader: "HORAS",
    days: [
      { day: "Lun 08 sept.", hours: "8.0h" },
      { day: "Mar 09 sept.", hours: "8.0h" },
      { day: "Mié 10 sept.", hours: "8.0h" },
      { day: "Jue 11 sept.", hours: "8.0h" },
      { day: "Vie 12 sept.", hours: "8.0h" },
    ],
    footerNote: "Este cálculo se basa en las horas registradas y la configuración salarial del trabajo.",
    downloadLabel: "Descargar PDF",
  },
  en: {
    title: "Work Report",
    dateRange: "From September 8 to 12",
    reportId: "INF-2026-0912",
    generatedOn: "September 12, 2026",
    employeeName: "Alex Müller",
    companyLabel: "COMPANY",
    company: "Café Central",
    addressLine1: "Bahnhofstrasse 12",
    addressLine2: "8001 Zurich",
    totalHoursLabel: "TOTAL HOURS",
    totalHours: "40.0h",
    workDaysLabel: "WORK DAYS",
    workDays: "5",
    avgDayLabel: "AVG / DAY",
    avgDay: "8.0h",
    amountLabel: "AMOUNT TO PAY",
    amountRate: "€25/h · based on hours worked",
    amount: "€1000.00",
    dailyListLabel: "DAILY BREAKDOWN",
    dayHeader: "DAY",
    workHeader: "WORK",
    hoursHeader: "HOURS",
    days: [
      { day: "Mon Sep 08", hours: "8.0h" },
      { day: "Tue Sep 09", hours: "8.0h" },
      { day: "Wed Sep 10", hours: "8.0h" },
      { day: "Thu Sep 11", hours: "8.0h" },
      { day: "Fri Sep 12", hours: "8.0h" },
    ],
    footerNote: "This calculation is based on the logged hours and the job's salary settings.",
    downloadLabel: "Download PDF",
  },
  de: {
    title: "Arbeitsbericht",
    dateRange: "Vom 8. bis 12. Sept.",
    reportId: "INF-2026-0912",
    generatedOn: "12. September 2026",
    employeeName: "Alex Müller",
    companyLabel: "UNTERNEHMEN",
    company: "Café Central",
    addressLine1: "Bahnhofstrasse 12",
    addressLine2: "8001 Zürich",
    totalHoursLabel: "GESAMTSTUNDEN",
    totalHours: "40.0h",
    workDaysLabel: "ARBEITSTAGE",
    workDays: "5",
    avgDayLabel: "DURCHSCHNITT/TAG",
    avgDay: "8.0h",
    amountLabel: "ZU ZAHLENDER BETRAG",
    amountRate: "25 EUR/h · pro gearbeitete Stunden",
    amount: "1000.00 EUR",
    dailyListLabel: "TAGESLISTE",
    dayHeader: "TAG",
    workHeader: "ARBEIT",
    hoursHeader: "STUNDEN",
    days: [
      { day: "Mo. 08. Sept.", hours: "8.0h" },
      { day: "Di. 09. Sept.", hours: "8.0h" },
      { day: "Mi. 10. Sept.", hours: "8.0h" },
      { day: "Do. 11. Sept.", hours: "8.0h" },
      { day: "Fr. 12. Sept.", hours: "8.0h" },
    ],
    footerNote: "Diese Berechnung beruht auf den erfassten Stunden und den Lohneinstellungen des Jobs.",
    downloadLabel: "PDF herunterladen",
  },
} as const

export default function ExportReports() {
  const { t, language } = useLanguage()
  const idioma = (["es", "en", "de"] as const).includes(language as "es" | "en" | "de")
    ? (language as "es" | "en" | "de")
    : "en"
  const pdf = PDF_DEMO[idioma]

  const capabilities = [
    {
      image: "/new/icons/stats.png",
      title: t("exportReports.capabilities.schedules.title"),
      description: t("exportReports.capabilities.schedules.description"),
      bgColor: "bg-blue-100",
    },
    {
      image: "/new/icons/calendar.png",
      title: t("exportReports.capabilities.calendar.title"),
      description: t("exportReports.capabilities.calendar.description"),
      bgColor: "bg-orange-100",
    },
    {
      image: "/new/icons/job_settings.png",
      title: t("exportReports.capabilities.legal.title"),
      description: t("exportReports.capabilities.legal.description"),
      bgColor: "bg-indigo-100",
    }
  ]

  return (
    <section
      id="export-reports"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B5FEF]/10 backdrop-blur-sm rounded-full text-[#5B5FEF] text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            {t("exportReports.badge")}
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("exportReports.title")} <span className="text-[#5B5FEF]">{t("exportReports.titleAccent")}</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("exportReports.description")}
          </p>
        </motion.div>

        {/* Un solo bloque: arriba un banner alargado con los tres puntos
            reducidos a lo esencial (icono + título), pegado directamente al
            PDF de abajo — como si fuera la cabecera de ese mismo documento,
            en vez de tres tarjetas sueltas escalonadas. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mb-4 max-w-4xl"
        >
          <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-r from-blue-300/20 to-indigo-300/20 blur-3xl" />

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-2xl">
            <div className="grid grid-cols-1 divide-y divide-slate-200/70 border-b border-slate-200/70 bg-[#5B5FEF]/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-3 p-3 sm:gap-4 sm:p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5B5FEF]/10 sm:h-12 sm:w-12">
                    <Image src={capability.image} alt="" width={24} height={24} className="h-5 w-5 object-contain sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-bold leading-snug text-slate-900 sm:text-base">
                      {capability.title}
                    </h3>
                    <p className="hidden text-xs leading-snug text-slate-500 sm:block">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-10">
              {/* Cabecera: nombre a la izquierda, título del informe y
                  metadatos a la derecha — igual que el PDF real. */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <p className="text-base font-bold text-slate-900 sm:text-lg">{pdf.employeeName}</p>
                <div className="sm:text-right">
                  <h3 className="text-lg font-bold text-slate-900 sm:text-3xl">{pdf.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">{pdf.dateRange}</p>
                  <p className="text-xs font-bold text-[#5B5FEF] sm:text-sm">{pdf.reportId}</p>
                  <p className="text-xs text-slate-500 sm:text-sm">{pdf.generatedOn}</p>
                </div>
              </div>

              <div className="my-4 h-0.5 rounded-full bg-[#5B5FEF]/20 sm:my-8" />

              {/* La empresa. */}
              <div className="mb-4 flex items-start gap-2 sm:mb-8 sm:gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5B5FEF]/10 sm:h-9 sm:w-9">
                  <Building2 className="h-3.5 w-3.5 text-[#5B5FEF] sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wide text-slate-400 sm:text-xs">{pdf.companyLabel}</p>
                  <p className="text-sm font-bold text-slate-900 sm:text-base">{pdf.company}</p>
                  <p className="text-xs text-slate-500 sm:text-sm">{pdf.addressLine1}</p>
                  <p className="text-xs text-slate-500 sm:text-sm">{pdf.addressLine2}</p>
                </div>
              </div>

              {/* Resumen: horas totales, días, media/día. */}
              <div className="mb-3 grid grid-cols-3 gap-2 sm:mb-4 sm:gap-4">
                {[
                  { icon: Clock, label: pdf.totalHoursLabel, value: pdf.totalHours },
                  { icon: CalendarDays, label: pdf.workDaysLabel, value: pdf.workDays },
                  { icon: Clock, label: pdf.avgDayLabel, value: pdf.avgDay },
                ].map((stat, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-2.5 sm:p-4">
                    <p className="text-base font-bold text-slate-900 sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[9px] font-bold tracking-wide text-slate-400 sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* El importe a pagar, destacado en su propia caja — en móvil
                  el importe va debajo, a todo lo ancho, para que un número
                  grande no tenga que competir por sitio con la etiqueta y se
                  rompa a dos líneas. */}
              <div className="mb-5 flex flex-col gap-2 rounded-xl border-2 border-[#5B5FEF]/25 p-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5B5FEF]/10 sm:h-9 sm:w-9">
                    <Euro className="h-3.5 w-3.5 text-[#5B5FEF] sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-slate-500 sm:text-sm">{pdf.amountLabel}</p>
                    <p className="text-[10px] text-slate-400 sm:text-xs">{pdf.amountRate}</p>
                  </div>
                </div>
                <p className="whitespace-nowrap text-lg font-bold text-[#5B5FEF] sm:text-2xl">{pdf.amount}</p>
              </div>

              {/* El detalle diario. */}
              <p className="mb-2 text-base font-bold text-slate-900 sm:mb-3 sm:text-lg">{pdf.dailyListLabel}</p>
              <div className="mb-4 overflow-hidden rounded-xl border border-slate-200/70 sm:mb-6">
                <div className="flex bg-slate-50 px-3 py-1.5 text-[9px] font-bold tracking-wide text-slate-400 sm:px-4 sm:py-2 sm:text-xs">
                  <span className="flex-1">{pdf.dayHeader}</span>
                  <span className="flex-1">{pdf.workHeader}</span>
                  <span className="text-right">{pdf.hoursHeader}</span>
                </div>
                {pdf.days.map((row, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-3 py-1.5 text-xs sm:px-4 sm:py-2.5 sm:text-sm ${index % 2 === 1 ? "bg-slate-50/60" : ""}`}
                  >
                    <span className="flex-1 text-slate-700">{row.day}</span>
                    <span className="flex-1 text-slate-500">{pdf.company}</span>
                    <span className="text-right font-bold text-slate-900">{row.hours}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs leading-relaxed text-slate-400">{pdf.footerNote}</p>

              {/* El botón de descarga — de adorno, para que se lea de un
                  vistazo que esto se exporta con un toque; la descarga real
                  pasa dentro de la app, no aquí. */}
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B5FEF] py-3 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 transition-transform active:scale-[0.98] sm:mt-6"
              >
                <Download className="h-4 w-4" />
                {pdf.downloadLabel}
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mb-16 text-center text-sm text-slate-400">{t("exportReports.demoTitle")}</p>
      </div>
    </section>
  )
}
