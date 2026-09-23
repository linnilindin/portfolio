'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { OVERVIEW_COLORS } from '@/constants/animations'
import type { Project } from '@/types/project'

const DASHED_RULE =
  'repeating-linear-gradient(90deg, rgba(22,34,58,.4) 0 6px, transparent 6px 12px)'

const scrollToDetail = (projectId: string) => {
  document
    .getElementById(`project-${projectId}`)
    ?.scrollIntoView({ behavior: 'smooth' })
}

export default function ProjectsOverview() {
  const skyview = projects.find((p) => p.id === 'skyview')
  const logkeep = projects.find((p) => p.id === 'logkeep')
  const portfolio = projects.find((p) => p.id === 'portfolio')

  return (
    <div
      className="w-full pb-20"
      style={{ backgroundColor: OVERVIEW_COLORS.CREAM }}
    >
      <div className="w-full px-4 md:px-8 lg:px-16 pt-24 md:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <h2
            className="text-[32px] md:text-[40px] xl:text-[52px] font-bold leading-none tracking-[-0.03em]"
            style={{ color: OVERVIEW_COLORS.INK }}
          >
            Projects
          </h2>
          <span
            className="text-[13px] font-semibold leading-none"
            style={{ color: 'rgba(22,34,58,.6)' }}
          >
            Three things I built · 2025 - 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-[18px] xl:gap-6">
          {skyview && (
            <div
              className="rounded-[22px] p-4 sm:p-[26px]"
              style={{ backgroundColor: OVERVIEW_COLORS.SKY }}
            >
              <BoardingPassCard project={skyview} />
              <div className="mt-[18px]">
                <ScreenshotCarousel project={skyview} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-rows-[1.15fr_.85fr] gap-[18px] xl:gap-6">
            {logkeep && <CompactProjectCard project={logkeep} tone="night" />}
            {portfolio && <CompactProjectCard project={portfolio} tone="sand" />}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  project: Project
}

function BoardingPassCard({ project }: CardProps) {
  const [expanded, setExpanded] = useState(false)
  const overview = project.overview
  const ticket = overview?.ticket
  const stubId = `${project.id}-stub`

  if (!overview || !ticket) return null

  return (
    <div
      className="rounded-[18px] overflow-hidden shadow-[0_4px_14px_rgba(22,34,58,.12)]"
      style={{ backgroundColor: OVERVIEW_COLORS.CREAM }}
    >
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{
          backgroundColor: OVERVIEW_COLORS.INK,
          color: OVERVIEW_COLORS.CREAM,
        }}
      >
        <span className="text-[15px] font-bold leading-none">
          {overview.badge}
        </span>
        <span
          className="text-[13px] font-semibold leading-none"
          style={{ color: OVERVIEW_COLORS.ROSE }}
        >
          {overview.award}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 px-5 py-6">
        <div>
          <div
            className="text-[13px] font-semibold leading-none"
            style={{ color: 'rgba(22,34,58,.78)' }}
          >
            From
          </div>
          <div
            className="mt-1.5 text-[26px] sm:text-[34px] font-bold leading-none tracking-[-0.02em]"
            style={{ color: OVERVIEW_COLORS.INK }}
          >
            {ticket.from.label}
          </div>
          <div
            className="mt-1 text-[12.5px] leading-[1.3]"
            style={{ color: 'rgba(22,34,58,.78)' }}
          >
            {ticket.from.sub}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div
            className="w-12 sm:w-[90px] h-px"
            style={{ background: DASHED_RULE }}
          />
          <span
            className="text-sm font-bold leading-none"
            style={{ color: OVERVIEW_COLORS.ACCENT }}
          >
            {project.title}
          </span>
          <div
            className="w-12 sm:w-[90px] h-px"
            style={{ background: DASHED_RULE }}
          />
        </div>

        <div className="text-right">
          <div
            className="text-[13px] font-semibold leading-none"
            style={{ color: 'rgba(22,34,58,.78)' }}
          >
            To
          </div>
          <div
            className="mt-1.5 text-[26px] sm:text-[34px] font-bold leading-none tracking-[-0.02em]"
            style={{ color: OVERVIEW_COLORS.INK }}
          >
            {ticket.to.label}
          </div>
          <div
            className="mt-1 text-[12.5px] leading-[1.3]"
            style={{ color: 'rgba(22,34,58,.78)' }}
          >
            {ticket.to.sub}
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 pb-5 border-b-2 border-dashed"
        style={{ borderColor: 'rgba(22,34,58,.25)' }}
      >
        {ticket.meta.map((item) => (
          <div key={item.label}>
            <div
              className="text-[12px] font-semibold leading-none"
              style={{ color: 'rgba(22,34,58,.78)' }}
            >
              {item.label}
            </div>
            <div
              className="mt-[5px] text-[14px] font-bold leading-[1.3]"
              style={{ color: OVERVIEW_COLORS.INK }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5">
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={stubId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pb-[18px]">
                {ticket.contributions.map((contribution, index) => (
                  <div key={contribution} className="flex gap-3">
                    <span
                      className="text-xs font-bold leading-[1.4]"
                      style={{ color: OVERVIEW_COLORS.ACCENT }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-sm leading-[1.5]"
                      style={{ color: 'rgba(22,34,58,.8)' }}
                    >
                      {contribution}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p
          className="mb-4 text-[14.5px] leading-[1.6]"
          style={{ color: 'rgba(22,34,58,.75)' }}
        >
          {overview.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <motion.button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls={stubId}
            whileHover={{ backgroundColor: OVERVIEW_COLORS.ACCENT }}
            whileTap={{ scale: 0.97 }}
            className="text-[13px] font-bold leading-none px-5 py-3.5 rounded-full"
            style={{
              backgroundColor: OVERVIEW_COLORS.INK,
              color: OVERVIEW_COLORS.CREAM,
            }}
          >
            {expanded ? 'Fold the stub back' : 'Tear the stub - what I shipped'}
          </motion.button>

          <motion.button
            onClick={() => scrollToDetail(project.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-[13px] font-bold leading-none px-5 py-3.5 rounded-full"
            style={{
              backgroundColor: OVERVIEW_COLORS.SAND,
              color: OVERVIEW_COLORS.INK,
            }}
          >
            Read the full case study
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function ScreenshotCarousel({ project }: CardProps) {
  const [index, setIndex] = useState(0)
  const shots = project.screenshots
  const captions = project.overview?.captions ?? []

  // wrap around in both directions so the arrows never dead-end
  const go = (next: number) => setIndex((next + shots.length) % shots.length)

  if (shots.length === 0) return null

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span
          className="text-sm font-semibold leading-none"
          style={{ color: 'rgba(22,34,58,.7)' }}
        >
          Inside the app
        </span>
        <span
          className="text-sm font-semibold leading-none"
          style={{ color: 'rgba(22,34,58,.7)' }}
        >
          {index + 1} / {shots.length}
        </span>
      </div>

      <div
        className="relative h-[220px] sm:h-[300px] xl:h-[400px] 2xl:h-[480px] rounded-[18px] overflow-hidden shadow-[0_8px_28px_rgba(22,34,58,.18)]"
        style={{ backgroundColor: OVERVIEW_COLORS.INK }}
      >
        <Image
          src={shots[index]}
          alt={captions[index] ?? `${project.title} screenshot ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-top"
          priority={index === 0}
        />

        {captions[index] && (
          <div
            className="absolute inset-x-0 bottom-0 px-[18px] py-3.5"
            style={{
              background:
                'linear-gradient(to top, rgba(15,15,16,.82), rgba(15,15,16,0))',
            }}
          >
            <span
              className="text-[13px] font-semibold leading-[1.3]"
              style={{ color: OVERVIEW_COLORS.CREAM }}
            >
              {captions[index]}
            </span>
          </div>
        )}

        <div className="absolute top-1/2 left-3.5 -translate-y-1/2 flex justify-between w-[calc(100%-28px)]">
          <CarouselArrow
            direction="prev"
            onClick={() => go(index - 1)}
          />
          <CarouselArrow
            direction="next"
            onClick={() => go(index + 1)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5 mt-3">
        {shots.map((shot, shotIndex) => {
          const isActive = shotIndex === index

          return (
            <button
              key={shot}
              onClick={() => go(shotIndex)}
              aria-label={captions[shotIndex] ?? `View screenshot ${shotIndex + 1}`}
              aria-current={isActive}
              className="relative h-[60px] xl:h-[80px] 2xl:h-[96px] rounded-xl overflow-hidden border-2 transition-opacity"
              style={{
                borderColor: isActive
                  ? OVERVIEW_COLORS.ACCENT
                  : 'rgba(22,34,58,.14)',
                opacity: isActive ? 1 : 0.72,
              }}
            >
              <Image
                src={shot}
                alt=""
                fill
                sizes="(max-width: 1024px) 25vw, 14vw"
                className="object-cover object-top"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface CarouselArrowProps {
  direction: 'prev' | 'next'
  onClick: () => void
}

function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous screenshot' : 'Next screenshot'}
      whileHover={{
        backgroundColor: OVERVIEW_COLORS.INK,
        color: OVERVIEW_COLORS.CREAM,
      }}
      whileTap={{ scale: 0.92 }}
      className="w-11 h-11 rounded-full text-lg font-bold leading-none shadow-[0_2px_8px_rgba(22,34,58,.28)]"
      style={{
        backgroundColor: OVERVIEW_COLORS.CREAM,
        color: OVERVIEW_COLORS.INK,
      }}
    >
      {direction === 'prev' ? '‹' : '›'}
    </motion.button>
  )
}

interface CompactProjectCardProps {
  project: Project
  tone: 'night' | 'sand'
}

function CompactProjectCard({ project, tone }: CompactProjectCardProps) {
  const overview = project.overview
  const isNight = tone === 'night'

  if (!overview) return null

  const titleColor = isNight ? OVERVIEW_COLORS.PEACH : OVERVIEW_COLORS.INK
  const bodyColor = isNight ? 'rgba(255,250,241,.88)' : 'rgba(22,34,58,.78)'

  return (
    <div
      className="rounded-[22px] p-[22px] flex flex-col gap-3"
      style={{
        backgroundColor: isNight
          ? OVERVIEW_COLORS.NIGHT
          : OVERVIEW_COLORS.SAND,
      }}
    >
      <div className="flex flex-wrap items-baseline gap-2.5">
        <h3
          className="text-[22px] sm:text-[24px] font-bold leading-none tracking-[-0.02em]"
          style={{ color: titleColor }}
        >
          {project.title}
        </h3>
        {overview.note && (
          <span
            className="text-[13px] font-medium leading-none"
            style={{ color: bodyColor }}
          >
            {overview.note}
          </span>
        )}
      </div>

      <p
        className="text-[13.5px] leading-[1.55]"
        style={{ color: bodyColor }}
      >
        {overview.tagline}
      </p>

      {overview.cover && (
        <div
          className="relative flex-1 min-h-[140px] rounded-xl overflow-hidden"
          style={{
            border: isNight
              ? '1px solid rgba(255,250,241,.12)'
              : '1px solid rgba(22,34,58,.12)',
          }}
        >
          <Image
            src={overview.cover}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className={
              isNight
                ? 'object-cover object-left-top'
                : 'object-cover object-top'
            }
          />
        </div>
      )}

      {overview.tags && overview.tags.length > 0 && (
        <div className="flex flex-wrap gap-[7px]">
          {overview.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold leading-none px-2.5 py-[7px] rounded-lg"
              style={{
                color: OVERVIEW_COLORS.PEACH,
                border: '1px solid rgba(244,177,131,.45)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        {project.screenshots.length > 0 && (
          <motion.button
            onClick={() => scrollToDetail(project.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-[12.5px] font-bold leading-none px-[18px] py-3 rounded-full"
            style={{
              backgroundColor: isNight
                ? OVERVIEW_COLORS.PEACH
                : OVERVIEW_COLORS.INK,
              color: isNight ? OVERVIEW_COLORS.NIGHT : OVERVIEW_COLORS.CREAM,
            }}
          >
            See more
          </motion.button>
        )}

        {project.repoUrl && (
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-[12.5px] font-bold leading-none px-[18px] py-3 rounded-full"
            style={{
              backgroundColor: isNight
                ? 'rgba(255,250,241,.1)'
                : OVERVIEW_COLORS.CREAM,
              color: isNight ? OVERVIEW_COLORS.CREAM : OVERVIEW_COLORS.INK,
            }}
          >
            Repository
          </motion.a>
        )}
      </div>
    </div>
  )
}
