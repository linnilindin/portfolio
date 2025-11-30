'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ANIMATION_DELAYS, ANIMATION_DURATIONS, TRANSITION_CONFIG } from '@/constants/animations'

const SECTIONS = ['landing', 'about', 'work-experience', 'projects', 'contact'] as const

const NAV_ITEMS = [
  { id: 'landing', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work-experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>('landing')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // check which section is currently in view to highlight active nav item
  useEffect(() => {
    const handleScroll = () => {
      // use window center as ref point to detect section
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // check sections from bottom to top
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          // if window center is within this section, mark it as active
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(SECTIONS[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: ANIMATION_DELAYS.TITLE / 1000, 
        duration: ANIMATION_DURATIONS.TITLE / 1000 
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-auto"
    >
      <nav className="max-w-7xl mx-auto">
        <ul className="hidden md:flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 rounded-lg hover:bg-white/10 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  textShadow: activeSection === item.id
                    ? '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)'
                    : '2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    style={{
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    }}
                    transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white rounded-full"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-0.5 bg-white rounded-full"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white rounded-full"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            />
          </div>
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-16 right-4 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-6 py-4 text-base font-semibold transition-all duration-300 border-b border-gray-200/50 last:border-b-0 ${
                        activeSection === item.id
                          ? 'text-gray-900 bg-gray-100/50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.span
                          layoutId="activeIndicatorMobile"
                          className="block mt-1 h-0.5 bg-gray-900 rounded-full"
                          transition={TRANSITION_CONFIG.SPRING}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

