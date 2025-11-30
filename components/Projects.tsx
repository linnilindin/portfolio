'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { COLORS } from '@/constants/animations'
import ImageGrid from '@/components/ImageGrid'

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </section>
  )
}

interface ProjectCardProps {
  project: typeof projects[0]
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showPosterModal, setShowPosterModal] = useState(false)
  const isSkyView = project.id === 'skyview'
  const linkedInPostUrl = 'https://www.linkedin.com/posts/william-chen-7809b0180_about-four-months-ago-mansooreh-zahedi-ugcPost-7391849083306618881-WMV7?utm_source=share&utm_medium=member_desktop&rcm=ACoAADCzVw4ByPut77pDrKHCFgPojvrueknKpao'
  
  // Track scroll progress: value from 0 to 1 representing how far user has scrolled through the card
  // 0 = card bottom just entered view, 1 = card top just left view
  // value is used to animate the icon position and opacity as users scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Animate icon vertical position as user scrolls (moves down with scroll)
  const iconY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0],
    { clamp: false }
  )
  
  // fade icon in/out at scroll boundaries
  const iconOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Get project-specific background color based on project.theme or project.id
  const getBackgroundColor = () => {
    const themeColors: Record<string, string> = {
      skyview: '#E3F2FD',      
      portfolio: '#FFE0B2',   
    }
    return themeColors[project.theme] || themeColors[project.id] || COLORS.BACKGROUND
  }

  return (
    <div
      ref={cardRef}
      className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 py-16"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              {project.title}
            </h2>
            {project.id === 'skyview' && (
              <p className="text-sm md:text-base italic text-gray-600 mt-2">
                Computing and Information Systems Discipline Award Winning Project (Feb 2025 - Oct 2025)
              </p>
            )}
          </div>
          <div className="text-lg mb-6 text-gray-800 space-y-4">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.repoUrl && (
              <div className="relative inline-flex">
                {isSkyView ? (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      setShowTooltip(!showTooltip)
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    View Repository
                  </motion.button>
                ) : (
                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    View Repository
                  </motion.a>
                )}
                
                {isSkyView && (
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 mb-2 w-80 p-4 bg-gray-900 text-white rounded-lg shadow-xl z-50"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <p className="text-sm mb-2">
                          The repository is currently private due to it being a recently completed capstone project. 
                        </p>
                        <p className="text-sm">
                          But here's a link to our LinkedIn post about the project: {' '}
                          <a
                            href={linkedInPostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline font-semibold"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LinkedIn post
                          </a>
                          .
                        </p>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )}
            
            {isSkyView && (
              <motion.button
                onClick={() => setShowPosterModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                View Poster
              </motion.button>
            )}
          </div>
          
          {/* Poster Modal */}
          <AnimatePresence>
            {showPosterModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
                onClick={() => setShowPosterModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-5xl max-h-[90vh] w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setShowPosterModal(false)}
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
                  
                  {/* Poster Image */}
                  <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                    <Image
                      src="/projects/SkyView/poster.jpg"
                      alt="SkyView Project Poster"
                      width={4494}
                      height={3179}
                      className="max-w-full max-h-full object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full md:w-2/3 relative">
        {/* Sticky project icon that moves vertically with scroll */}
        <motion.div
          style={{
            y: iconY,
            opacity: iconOpacity,
            position: 'sticky' as const,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
          className="absolute left-0 md:left-8 w-24 h-24 md:w-32 md:h-32"
        >
          <Image
            src={project.icon}
            alt={`${project.title} icon`}
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {project.id === 'portfolio' ? (
          <div className="ml-0 md:ml-32">
            <ImageGrid images={project.screenshots} variant="mobile" />
          </div>
        ) : project.id === 'skyview' ? (
          <div className="ml-0 md:ml-32 -mt-16 md:-mt-24">
            <ImageGrid
              images={project.screenshots}
              variant="rectangle"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ml-0 md:ml-32">
            {project.screenshots.map((screenshot, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: imgIndex * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={screenshot}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

