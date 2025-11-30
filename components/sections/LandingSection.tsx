'use client'

import { motion } from 'framer-motion'
import { ANIMATION_DELAYS, ANIMATION_DURATIONS, TRANSITION_CONFIG } from '@/constants/animations'
import CatAnimation from './CatAnimation'

interface LandingSectionProps {
  videoEnded: boolean
  onVideoEnd: (ended: boolean) => void
  onScrollToProjects: () => void
}

export default function LandingSection({ videoEnded, onVideoEnd, onScrollToProjects }: LandingSectionProps) {
  return (
    <section 
      id="landing"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" 
    >
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-4 md:px-8 max-w-4xl">
          {/* Title appears after cat animation completes */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_DELAYS.TITLE / 1000, duration: ANIMATION_DURATIONS.TITLE / 1000 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            Hi, I'm Lynn!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_DELAYS.TECH_STACK / 1000, duration: ANIMATION_DURATIONS.TITLE / 1000 }}
            className="text-base md:text-lg lg:text-xl text-white/90 mb-8"
            style={{
              textShadow: '2px 2px 8px rgba(163, 62, 62, 0.5)',
            }}
          >
            Fullstack developer building bridges between users and technology
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_DELAYS.BUTTONS / 1000, duration: ANIMATION_DURATIONS.TITLE / 1000 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onScrollToProjects}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Check Out My Projects
            </button>
            <a
              href="#about"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Let's Connect
            </a>
          </motion.div>
        </div>
      </div>

      {!videoEnded && <CatAnimation setVideoEnded={onVideoEnd} />}
    </section>
  )
}

