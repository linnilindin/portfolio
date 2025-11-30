import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'skyview',
    title: 'SkyView',
    description: 'SkyView is an open-source aircraft tracking platform that goes beyond traditional flight trackers by predicting flight paths and estimating collision risks through real-time mathematical calculations. Built with React and React Leaflet, it transforms raw ADS-B aircraft signals into an interactive dashboard with advanced analytics.\n\nAs Product Owner and Frontend Developer, I built the flight path simulator, event history dashboard with filtering and deduplication, and geographic export functionality. I led stakeholder sessions, managed the product roadmap, and collaborated with a team of 11 developers using Git and Jira in an agile environment.',
    techStack: ['React', 'Leaflet', 'MongoDB', 'Node.js', 'JavaScript'],
    repoUrl: 'https://github.com/example/skyview',
    screenshots: [
      '/projects/SkyView/dashboard.png',
      '/projects/SkyView/event_history.png',
      '/projects/SkyView/export_menu.png',
      '/projects/SkyView/playground.png',
    ],
    icon: '/airplane.png',
    theme: 'skyview',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing my projects and experience. Built with Next.js, React, TypeScript, and Tailwind CSS, featuring smooth animations and a clean design.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/linnilindin/portfolio',
    screenshots: [
      '/projects/Portfolio/portfolio1.png',
      '/projects/Portfolio/portfolio2.png',
      '/projects/Portfolio/porfolio3.png',
    ],
    icon: '/code.webp',
    theme: 'portfolio',
  },
]

