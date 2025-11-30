'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import LandingSection from '@/components/sections/LandingSection'
import AboutSection from '@/components/sections/AboutSection'
import WorkExperienceSection from '@/components/sections/WorkExperienceSection'
import { useRadialAnimation } from '@/hooks/useRadialAnimation'
import { COLORS, TRANSITION_CONFIG } from '@/constants/animations'

export default function Landing() {
  const [videoEnded, setVideoEnded] = useState(false)
  
  // refs for sections needed by the radial animation hook
  const containerRef = useRef<HTMLDivElement>(null)
  const radialContainerRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)
  const workExperienceRef = useRef<HTMLElement>(null)
  const educationContainerRef = useRef<HTMLDivElement>(null)

  // animate radial gradient image based on scroll position
  const radialPosition = useRadialAnimation({
    aboutMeRef,
    workExperienceRef,
    educationContainerRef,
    radialContainerRef,
  })

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      <Header />
      
      {/* Radial gradient background animated based on scroll position */}
      <motion.div 
        className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{
          x: radialPosition.x,
          y: radialPosition.y,
          scale: radialPosition.scale,
          rotate: radialPosition.rotation,
        }}
        transition={TRANSITION_CONFIG.SPRING}
      >
        <div 
          ref={radialContainerRef} 
          className="relative w-full h-full max-w-4xl max-h-[80vh] px-4" 
          id="radial-container"
        >
          <Image
            src="/radial.png"
            alt="Radial gradient"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      <LandingSection 
        videoEnded={videoEnded}
        onVideoEnd={setVideoEnded}
        onScrollToProjects={scrollToProjects}
      />

      <AboutSection ref={aboutMeRef} />

      <WorkExperienceSection ref={workExperienceRef} educationRef={educationContainerRef} />
    </div>
  )
}
