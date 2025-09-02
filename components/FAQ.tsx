"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search, Clock, CreditCard, Smartphone } from "lucide-react"
import { useLanguage } from "@/lib/language"

const getCategories = (t: (key: string) => string) => [
  { id: "general", name: t("faq.categories.general"), icon: Clock },
  { id: "time", name: t("faq.categories.time"), icon: Clock },
  { id: "billing", name: t("faq.categories.billing"), icon: CreditCard },
  { id: "technical", name: t("faq.categories.technical"), icon: Smartphone },
]

const getFaqs = (t: (key: string) => string) => [
  {
    id: 1,
    category: "general",
    question: t("faq.questions.1.question"),
    answer: t("faq.questions.1.answer"),
  },
  {
    id: 2,
    category: "time",
    question: t("faq.questions.2.question"),
    answer: t("faq.questions.2.answer"),
  },
  {
    id: 3,
    category: "time",
    question: t("faq.questions.3.question"),
    answer: t("faq.questions.3.answer"),
  },
  {
    id: 4,
    category: "technical",
    question: t("faq.questions.4.question"),
    answer: t("faq.questions.4.answer"),
  },
  {
    id: 5,
    category: "billing",
    question: t("faq.questions.5.question"),
    answer: t("faq.questions.5.answer"),
  },
  {
    id: 6,
    category: "general",
    question: t("faq.questions.6.question"),
    answer: t("faq.questions.6.answer"),
  },
  {
    id: 7,
    category: "general",
    question: t("faq.questions.7.question"),
    answer: t("faq.questions.7.answer"),
  },
  {
    id: 8,
    category: "technical",
    question: t("faq.questions.8.question"),
    answer: t("faq.questions.8.answer"),
  },
  {
    id: 9,
    category: "time",
    question: t("faq.questions.9.question"),
    answer: t("faq.questions.9.answer"),
  },
  {
    id: 10,
    category: "general",
    question: t("faq.questions.10.question"),
    answer: t("faq.questions.10.answer"),
  },
  {
    id: 11,
    category: "technical",
    question: t("faq.questions.11.question"),
    answer: t("faq.questions.11.answer"),
  },
  {
    id: 12,
    category: "technical",
    question: t("faq.questions.12.question"),
    answer: t("faq.questions.12.answer"),
  },
  {
    id: 13,
    category: "billing",
    question: t("faq.questions.13.question"),
    answer: t("faq.questions.13.answer"),
  },
  {
    id: 14,
    category: "time",
    question: t("faq.questions.14.question"),
    answer: t("faq.questions.14.answer"),
  },
  {
    id: 15,
    category: "billing",
    question: t("faq.questions.15.question"),
    answer: t("faq.questions.15.answer"),
  },
]

export default function FAQ() {
  const { t } = useLanguage()
  const categories = getCategories(t)
  const faqs = getFaqs(t)
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [openItems, setOpenItems] = useState<number[]>([1]) // Solo la primera pregunta abierta por defecto
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    setOpenItems(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Cerrar si ya está abierto
          : [id], // Solo abrir el seleccionado, cerrar los demás
    )
  }

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            {t("faq.title")}{" "}
            <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              {t("faq.titleAccent")}
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">{t("faq.description")}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={t("faq.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </button>
            )
          })}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">{t("faq.noResults")}</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openItems.includes(faq.id)

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-slate-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 backdrop-blur-sm"
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2">{t("faq.contactCta.title")}</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-4">{t("faq.contactCta.description")}</p>
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105">
            {t("faq.contactCta.button")}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
