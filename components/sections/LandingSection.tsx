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
            Hi, I'm Lin!
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
            IT Engineer building bridges between users and technology
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
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/linnilindin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-14 h-14 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2.01-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/linxx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-14 h-14 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0z" />
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="Go to contact form"
                className="relative z-10 flex items-center justify-center w-14 h-14 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {!videoEnded && <CatAnimation setVideoEnded={onVideoEnd} />}
    </section>
  )
}

