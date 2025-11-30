'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { workExperiences, education } from '@/data/workExperience'

interface WorkExperienceSectionProps {
  educationRef?: React.RefObject<HTMLDivElement>
}

const WorkExperienceSection = forwardRef<HTMLElement, WorkExperienceSectionProps>(
  ({ educationRef }, ref) => {
  return (
    <section
      id="work-experience"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-16"
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-2/3 space-y-8 relative flex flex-col justify-center"
          style={{ zIndex: 30, position: 'relative' }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 relative" style={{ zIndex: 30 }}>
            Work Experience
          </h2>
          <div className="space-y-6 relative" style={{ zIndex: 30 }}>
            {workExperiences.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                  {work.position}
                </h3>
                <p className="text-lg text-gray-700 mb-1">{work.company}</p>
                <p className="text-sm text-gray-600 mb-3">{work.duration}</p>
                <p className="text-base text-gray-700 mb-3">{work.description}</p>
                <div className="flex flex-wrap gap-2">
                  {work.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-900 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div 
          ref={educationRef}
          className="w-full lg:w-1/3 space-y-8 relative" 
          style={{ zIndex: 30, position: 'relative' }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative"
            style={{ zIndex: 30, position: 'relative' }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
                  <p className="text-sm text-gray-600 mb-2">{edu.duration}</p>
                  {edu.description && (
                    <p className="text-base text-gray-700">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    )
  }
)

WorkExperienceSection.displayName = 'WorkExperienceSection'

export default WorkExperienceSection

