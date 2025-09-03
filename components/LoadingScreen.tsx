'use client'

import { motion, Variants } from 'framer-motion'
import { Clock, Zap, BarChart3, Smartphone } from 'lucide-react'
import { useLanguage } from '@/lib/language'

interface LoadingScreenProps {
  isVisible: boolean
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const { t } = useLanguage()
  
  if (!isVisible) return null

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  }

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const floatingIcons = [
    { Icon: Clock, delay: 0.5, x: -20, y: -30 },
    { Icon: Zap, delay: 0.7, x: 30, y: -20 },
    { Icon: BarChart3, delay: 0.9, x: -30, y: 20 },
    { Icon: Smartphone, delay: 1.1, x: 25, y: 30 }
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-30"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-300 rounded-full opacity-25"
        />
      </div>

      <div className="relative flex flex-col items-center space-y-8">
        {/* Main logo area */}
        <motion.div 
          variants={iconVariants}
          className="relative"
        >
          {/* Central app icon */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="relative z-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <Clock className="w-12 h-12 text-white" />
          </motion.div>

          {/* Floating feature icons */}
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: [0, x, 0],
                y: [0, y, 0]
              }}
              transition={{
                scale: { delay, duration: 0.5 },
                opacity: { delay, duration: 0.5 },
                x: { 
                  delay: delay + 0.5, 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                y: { 
                  delay: delay + 0.5, 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* App name and tagline */}
        <motion.div 
          variants={itemVariants}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t('loading.appName')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('loading.tagline')}
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div 
          variants={itemVariants}
          className="flex space-x-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 text-sm font-medium"
        >
          {t('loading.text')}
        </motion.p>
      </div>
    </motion.div>
  )
}