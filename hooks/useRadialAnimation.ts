import { useEffect, useState } from 'react'
import { useScrollPosition } from './useScrollPosition'

interface RadialPosition {
  x: number
  y: number
  scale: number
  rotation: number
}

interface UseRadialAnimationProps {
  aboutMeRef: React.RefObject<HTMLDivElement>
  workExperienceRef: React.RefObject<HTMLElement>
  educationContainerRef: React.RefObject<HTMLDivElement>
  radialContainerRef: React.RefObject<HTMLDivElement>
}

/**
 * animates the radial gradient image based on scroll position
 * radial image moves, scales, and rotates as the user scrolls through different sections
 */
export function useRadialAnimation({
  aboutMeRef,
  workExperienceRef,
  educationContainerRef,
  radialContainerRef,
}: UseRadialAnimationProps) {
  const { scrollPosition } = useScrollPosition()
  const [radialPosition, setRadialPosition] = useState<RadialPosition>({ 
    x: 0, 
    y: 0, 
    scale: 1, 
    rotation: 0 
  })

  useEffect(() => {
    // Exit early if DOM elements aren't ready yet or running on server
    if (
      !aboutMeRef.current || 
      !workExperienceRef.current || 
      !educationContainerRef.current || 
      !radialContainerRef.current || 
      typeof window === 'undefined'
    ) return

    /**
     * Calculates the radial image position, scale, and rotation based on scroll position
     * 1. Initial to About Me section (moves and scales down)
     * 2. About Me to Work Experience (stays at About Me position)
     * 3. Work Experience transition (moves to section corner, scales up + rotates)
     */
    const updateRadialPosition = () => {
      if (
        !aboutMeRef.current || 
        !workExperienceRef.current || 
        !educationContainerRef.current || 
        !radialContainerRef.current
      ) return

      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const windowCenterX = windowWidth / 2
      const windowCenterY = windowHeight / 2
      
      const aboutMeRect = aboutMeRef.current.getBoundingClientRect()
      const aboutMeLeftX = aboutMeRect.left
      const aboutMeWidth = aboutMeRect.width
      const aboutMeCenterY = aboutMeRect.top + aboutMeRect.height / 2
      
      const radialContainerRect = radialContainerRef.current.getBoundingClientRect()
      const radialWidth = radialContainerRect.width
      const radialHeight = radialContainerRect.height
      
      const aboutMeTop = aboutMeRef.current.offsetTop
      const aboutMeHeight = aboutMeRef.current.offsetHeight
      const aboutMeBottom = aboutMeTop + aboutMeHeight
      
      const RIGHT_PADDING = 40

      // Calculate position and scale for about me section
      const availableWidthAbout = aboutMeWidth - RIGHT_PADDING
      const scaleForWidthAbout = availableWidthAbout / radialWidth
      const scaleForHeightAbout = aboutMeHeight / radialHeight
      const targetScaleAbout = Math.min(scaleForWidthAbout, scaleForHeightAbout, 0.8)
      const scaledRadialWidthAbout = radialWidth * targetScaleAbout
      const targetXAbout = aboutMeLeftX + scaledRadialWidthAbout / 2 - windowCenterX
      const targetYAbout = aboutMeCenterY - windowCenterY

      // Calculate position for work experience section: 2x scale, rotate -90deg
      let targetXWork = targetXAbout
      let targetYWork = targetYAbout
      let targetScaleWork = targetScaleAbout
      const targetRotationWork = -90
      
      if (educationContainerRef.current) {
        const educationRect = educationContainerRef.current.getBoundingClientRect()
        const educationRightX = educationRect.right
        const educationBottomY = educationRect.bottom
        
        targetScaleWork = targetScaleAbout * 2
        targetXWork = educationRightX - windowCenterX
        targetYWork = educationBottomY - windowCenterY
      }

      // Define scroll transition points for animation phases
      const transitionStart = 0
      const aboutMeTransitionEnd = aboutMeBottom
      const workExperienceTransitionStart = workExperienceRef.current 
        ? workExperienceRef.current.offsetTop - windowHeight * 0.5
        : aboutMeBottom
      const workExperienceTransitionRange = aboutMeTransitionEnd - transitionStart
      const workExperienceTransitionEnd = workExperienceTransitionStart + workExperienceTransitionRange

      // initial
      if (scrollPosition <= transitionStart) {
        setRadialPosition({ x: 0, y: 0, scale: 1, rotation: 0 })
      // animate from initial to about me position (interpolate position and scale)
      } else if (scrollPosition > transitionStart && scrollPosition < aboutMeTransitionEnd) {
        const progress = Math.max(0, Math.min(1, (scrollPosition - transitionStart) / (aboutMeTransitionEnd - transitionStart)))
        const currentScale = 1 - (1 - targetScaleAbout) * progress
        
        setRadialPosition({
          x: targetXAbout * progress,
          y: targetYAbout * progress,
          scale: currentScale,
          rotation: 0
        })
      // stay at about me position while scrolling through about me section
      } else if (scrollPosition >= aboutMeTransitionEnd && scrollPosition < workExperienceTransitionStart) {
        setRadialPosition({
          x: targetXAbout,
          y: targetYAbout,
          scale: targetScaleAbout,
          rotation: 0
        })
      // transition from about me to work experience position (interpolate all properties)
      } else if (scrollPosition >= workExperienceTransitionStart && scrollPosition < workExperienceTransitionEnd && workExperienceRef.current) {
        const progress = Math.max(0, Math.min(1, (scrollPosition - workExperienceTransitionStart) / (workExperienceTransitionEnd - workExperienceTransitionStart)))
        
        const currentScale = targetScaleAbout - (targetScaleAbout - targetScaleWork) * progress
        const currentX = targetXAbout + (targetXWork - targetXAbout) * progress
        const currentY = targetYAbout + (targetYWork - targetYAbout) * progress
        const currentRotation = 0 + (targetRotationWork - 0) * progress
        
        setRadialPosition({
          x: currentX,
          y: currentY,
          scale: currentScale,
          rotation: currentRotation
        })
      // final position
      } else if (scrollPosition >= workExperienceTransitionEnd && workExperienceRef.current) {
        setRadialPosition({
          x: targetXWork,
          y: targetYWork,
          scale: targetScaleWork,
          rotation: targetRotationWork
        })
      // else stay at about me position
      } else {
        setRadialPosition({
          x: targetXAbout,
          y: targetYAbout,
          scale: targetScaleAbout,
          rotation: 0
        })
      }
    }

    // initial position
    updateRadialPosition()
    
    // smooth scroll
    const handleScroll = () => {
      requestAnimationFrame(updateRadialPosition)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateRadialPosition)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateRadialPosition)
    }
  }, [scrollPosition, aboutMeRef, workExperienceRef, educationContainerRef, radialContainerRef])

  return radialPosition
}

