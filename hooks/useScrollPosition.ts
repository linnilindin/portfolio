'use client'

import { useEffect, useState } from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    let ticking = false

    const updatePosition = () => {
      setScrollPosition(window.scrollY)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updatePosition()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollPosition }
}

