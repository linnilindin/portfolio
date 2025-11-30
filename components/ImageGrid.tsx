'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface StaggerOffset {
  y: number
  rotate: number
}

interface ImageGridProps {
  images: string[]
  variant: 'mobile' | 'rectangle'
}

const ANIMATION_CONFIG = {
  container: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6 },
  },
  item: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5 },
  },
} as const

const STAGGER_OFFSETS = {
  mobile: [
    { y: -40, rotate: -2 },
    { y: 40, rotate: 2 },
    { y: -20, rotate: -1 },
    { y: 30, rotate: 1.5 },
    { y: 10, rotate: -1.5 },
    { y: 50, rotate: 2.5 },
  ],
  rectangle: [
    { y: -30, rotate: -2 },
    { y: 20, rotate: 2 },
    { y: -15, rotate: -1.5 },
    { y: 25, rotate: 1.5 },
  ],
} as const

export default function ImageGrid({
  images,
  variant,
}: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const staggerOffsets = useMemo(
    () => STAGGER_OFFSETS[variant],
    [variant]
  )

  // figure out responsive grid columns
  const gridCols = useMemo(() => {
    if (variant === 'mobile') {
      return images.length > 2
        ? 'grid-cols-2 md:grid-cols-3'
        : 'grid-cols-2'
    }
    return 'grid-cols-2'
  }, [variant, images.length])

  const aspectRatio = variant === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'
  const rounded = variant === 'mobile' ? 'rounded-2xl' : 'rounded-lg'
  const shadow = variant === 'mobile' ? 'shadow-xl' : 'shadow-lg'
  const border = variant === 'mobile' ? 'border-2 border-gray-300' : ''

  // randomise image stagger offsets using modulo to repeat for if i have more images
  const getStaggerOffset = (index: number): StaggerOffset => {
    return staggerOffsets[index % staggerOffsets.length]
  }

  return (
    <div className="w-full">
      <motion.div
        {...ANIMATION_CONFIG.container}
        className={`grid ${gridCols} gap-4 md:gap-6`}
      >
        {images.map((image, index) => {
          const offset = getStaggerOffset(index)

          return (
            <motion.div
              key={index}
              {...ANIMATION_CONFIG.item}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: offset.y,
              }}
              whileHover={{
                scale: 1.05,
                y: offset.y - 10,
                zIndex: 20,
              }}
              transition={{
                ...ANIMATION_CONFIG.item.transition,
                delay: index * 0.1,
              }}
              style={{ rotate: `${offset.rotate}deg` }}
              className={`relative ${aspectRatio} ${rounded} overflow-hidden ${shadow} bg-gray-200 ${border} cursor-pointer`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              {/* Image */}
              <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                <Image
                  src={selectedImage}
                  alt="Full size image"
                  width={3024}
                  height={1726}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

