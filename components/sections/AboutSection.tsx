'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { aboutData } from '@/data/about'
import { Folder } from '@/components/ui/folder'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'] as const

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { techStack, bio, resumeUrl } = aboutData

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-16"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8 relative flex flex-col justify-center"
          style={{ zIndex: 30, position: 'relative' }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 relative" style={{ zIndex: 30 }}>
            About Me
          </h2>
          <div className="space-y-6 text-lg text-gray-800 relative" style={{ zIndex: 30 }}>
            <p className="leading-relaxed">
              {bio.paragraph1}
            </p>
            <p className="leading-relaxed">
              {bio.paragraph2}
            </p>
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl mt-6"
            >
              View Resume
            </motion.a>
          </div>
        </motion.div>

        <div className="space-y-8 relative" style={{ zIndex: 30, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative"
            style={{ zIndex: 30, position: 'relative' }}
          >
            <div className="space-y-2" style={{ zIndex: 30, position: 'relative' }}>
              {CATEGORIES.map((category) => {
                const categoryTechs = techStack.filter((tech) => tech.category === category)
                return (
                  <Folder key={category} name={category}>
                    <div className="flex flex-wrap gap-3">
                      {categoryTechs.map((tech) => (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3 }}
                          className="px-4 py-2 bg-white rounded-lg text-gray-900 font-medium shadow-md hover:shadow-lg transition-shadow"
                        >
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>
                  </Folder>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

AboutSection.displayName = 'AboutSection'

export default AboutSection

