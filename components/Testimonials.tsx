"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/language"

export default function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: t("testimonials.roles.freelancer"),
      rating: 5,
      text: t("testimonials.reviews.1"),
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: t("testimonials.roles.consultant"),
      rating: 5,
      text: t("testimonials.reviews.2"),
      avatar: "MC",
    },
    {
      name: "Emma Rodriguez",
      role: t("testimonials.roles.contractor"),
      rating: 5,
      text: t("testimonials.reviews.3"),
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: t("testimonials.roles.developer"),
      rating: 5,
      text: t("testimonials.reviews.4"),
      avatar: "DK",
    },
    {
      name: "Lisa Thompson",
      role: t("testimonials.roles.designer"),
      rating: 5,
      text: t("testimonials.reviews.5"),
      avatar: "LT",
    },
    {
      name: "James Wilson",
      role: t("testimonials.roles.manager"),
      rating: 5,
      text: t("testimonials.reviews.6"),
      avatar: "JW",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">
            {t("testimonials.title")}{" "}
            <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              {t("testimonials.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t("testimonials.description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:border-slate-300/50 hover:-translate-y-1">
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8 text-slate-400" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                </div>

                <p className="text-slate-700 italic leading-relaxed text-lg">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
