'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ANIMATION_DURATIONS, TRANSITION_CONFIG } from '@/constants/animations'

interface CatAnimationProps {
  setVideoEnded: (value: boolean) => void
}

export default function CatAnimation({ setVideoEnded }: CatAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true)
    }, ANIMATION_DURATIONS.CAT)

    return () => clearTimeout(timer)
  }, [setVideoEnded])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITION_CONFIG.QUICK}
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-4xl max-h-[80vh] px-4 flex items-center justify-center">
        <div 
          className="relative"
          style={{ 
            width: '550px',
            height: '550px',
            transform: 'translateY(-35px)'
          }}
        >
          <Image
            src="/cat_animation.png"
            alt="Animated cat"
            width={550}
            height={550}
            className="w-full h-full object-contain"
            style={{ mixBlendMode: 'multiply' }}
            unoptimized
            priority
          />
        </div>
      </div>
    </motion.div>
  )
}

