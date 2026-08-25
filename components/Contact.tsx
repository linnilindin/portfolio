'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { COLORS, TRANSITION_CONFIG } from '@/constants/animations'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'success' | 'error'

const INITIAL_FORM_DATA: FormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(INITIAL_FORM_DATA)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-16"
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={TRANSITION_CONFIG.SMOOTH}
          className="relative mb-12 pt-32 md:pt-0 text-center"
        >
          <h2 className="relative inline-block text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Contact me!
            <span className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-max max-w-[calc(100vw-2rem)] text-left md:left-full md:bottom-auto md:top-1/2 md:mb-0 md:ml-3 md:translate-x-0 md:-translate-y-1/2">
              <span
                className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-black md:hidden"
                aria-hidden="true"
              />
              <span
                className="hidden md:block absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-t-transparent border-b-transparent border-r-black"
                aria-hidden="true"
              />
              <span className="block bg-black text-white rounded-3xl px-5 py-4 text-sm md:text-base leading-snug font-medium -rotate-1 shadow-xl">
                or you can email me directly at
                <a
                  href="mailto:linx.xie@outlook.com"
                  className="mt-1 block whitespace-nowrap underline decoration-white/40 underline-offset-2 hover:decoration-white"
                >
                  linx.xie@outlook.com
                </a>
              </span>
            </span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...TRANSITION_CONFIG.SMOOTH, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-6 bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 resize-none"
              placeholder=""
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
            >
              Thank you! Your message has been sent. I'll get back to you soon!
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              Something went wrong. Please try again or email me directly at linx.xie@outlook.com
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

