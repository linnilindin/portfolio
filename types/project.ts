export interface ProjectOverview {
  tagline: string              // short one-liner shown on the card
  note?: string                // e.g. "daily driver"
  badge?: string               // e.g. "Capstone · 2025"
  award?: string               // e.g. "Discipline Award Winner"
  ticket?: {
    from: { label: string; sub: string }
    to: { label: string; sub: string }
    meta: { label: string; value: string }[]
    contributions: string[]    // the numbered items hidden behind the stub
  }
  captions?: string[]          // per-screenshot carousel captions
  tags?: string[]              // short tag list for the compact cards
  cover?: string               // single image for the compact cards
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  repoUrl?: string
  liveUrl?: string
  screenshots: string[]
  icon: string
  theme: string
  overview?: ProjectOverview
}
