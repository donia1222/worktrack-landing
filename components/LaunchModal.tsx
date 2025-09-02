"use client"
import { X, Calendar, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language"

export function LaunchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage()

  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-600/60 backdrop-blur-md z-50"
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/50 overflow-hidden"
            >
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center mb-6 relative z-10">
                  <div className="relative">
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-3 relative z-10">{t("launchModal.title")}</h2>
                <p className="text-center text-blue-200 text-sm relative z-10">{t("launchModal.subtitle")}</p>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                      {t("launchModal.date")}
                    </div>
                    <div className="text-blue-500 font-medium">{t("launchModal.year")}</div>
                  </div>
                </div>

                <p className="text-center text-blue-600 mb-8 leading-relaxed">{t("launchModal.description")}</p>

                <button
                  onClick={handleClose}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 border border-blue-500/50"
                >
                  {t("launchModal.button")}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
