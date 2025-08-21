'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface LaunchModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LaunchModalContext = createContext<LaunchModalContextType | undefined>(undefined)

export function LaunchModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <LaunchModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LaunchModalContext.Provider>
  )
}

export function useLaunchModal() {
  const context = useContext(LaunchModalContext)
  if (!context) {
    throw new Error('useLaunchModal must be used within a LaunchModalProvider')
  }
  return context
}