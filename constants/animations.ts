export const ANIMATION_DELAYS = {
  TITLE: 3500,
  SUBTITLE: 3800,
  TECH_STACK: 4000,
  BUTTONS: 4200,
} as const

export const ANIMATION_DURATIONS = {
  TITLE: 800,
  CAT: 2700,
  SCROLL_UNLOCK: 4300,
} as const

export const TRANSITION_CONFIG = {
  SPRING: { type: 'spring' as const, stiffness: 50, damping: 15 },
  SMOOTH: { duration: 0.6 },
  QUICK: { duration: 0.3 },
} as const

export const COLORS = {
  BACKGROUND: '#F2E7CB',
} as const

