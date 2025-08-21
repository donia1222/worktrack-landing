'use client'

import { useEffect, useState } from 'react'
import { X, Calendar, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language'

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Calendar className="w-8 h-8" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">
                {t('launchModal.title')}
              </h2>
              <p className="text-center text-white/90 text-sm">
                {t('launchModal.subtitle')}
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {t('launchModal.date')}
                  </div>
                  <div className="text-gray-600">
                    {t('launchModal.year')}
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 mb-6">
                {t('launchModal.description')}
              </p>
              
              <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg mb-6">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">
                  {t('launchModal.reminder')}
                </span>
              </div>
              
              <button
                onClick={handleClose}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                {t('launchModal.button')}
              </button>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}