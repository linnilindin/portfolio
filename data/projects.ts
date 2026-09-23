import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'skyview',
    title: 'SkyView',
    description: 'SkyView is an open-source aircraft tracking platform that goes beyond traditional flight trackers by predicting flight paths and estimating collision risks through real-time mathematical calculations. Built with React and React Leaflet, it transforms raw ADS-B aircraft signals into an interactive dashboard with advanced analytics.\n\nAs Product Owner and Frontend Developer, I built the flight path simulator, event history dashboard with filtering and deduplication, and geographic export functionality. I led stakeholder sessions, managed the product roadmap, and collaborated with a team of 11 developers using Git and Jira in an agile environment.',
    techStack: ['React', 'Leaflet', 'MongoDB', 'Node.js', 'JavaScript'],
    repoUrl: 'https://github.com/example/skyview',
    screenshots: [
      '/projects/SkyView/dashboard.webp',
      '/projects/SkyView/event_history.webp',
      '/projects/SkyView/export_menu.webp',
      '/projects/SkyView/playground.webp',
    ],
    icon: '/airplane.png',
    theme: 'skyview',
    overview: {
      tagline: 'Open-source aircraft tracking that goes past a flight map: it predicts paths and estimates collision risk from live signals.',
      badge: 'Capstone · 2025',
      award: 'Discipline Award Winner',
      ticket: {
        from: { label: 'ADS-B', sub: 'raw aircraft signals' },
        to: { label: 'RISK', sub: 'collision estimates, live' },
        meta: [
          { label: 'Role', value: 'Product Owner' },
          { label: 'Team', value: '11 devs' },
          { label: 'Stack', value: 'React · Leaflet' },
          { label: 'Duration', value: 'Feb - Oct' },
        ],
        contributions: [
          'Flight-path simulator with waypoint drawing and playback controls.',
          'Event-history dashboard with filtering and deduplication.',
          'Geographic export by area and time window.',
          'Stakeholder sessions and the product roadmap, run in Jira.',
        ],
      },
      captions: [
        'Live map - aircraft, trails and rain overlay',
        'Historical event analysis - filtering and deduplication',
        'Geographic export - area and time window',
        'Flight path designer - collision alerts on intersect',
      ],
    },
  },
  {
    id: 'logkeep',
    title: 'LogKeep',
    description:
      'LogKeep is a reading and watching tracker that helps users build a habit of consistent, intentional media consumption. It supports multiple formats like books, novels, manga, comics, articles, and also tracks shows, movies, anime, and other video content.\n\nUsers can log entries across different media types, mark their progress, and record metadata such as status (planning, in progress, completed), rating, and notes. The interface is designed to make it easy to quickly add entries, filter by category or status, and review historical logs to see reading and watching trends over time.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    screenshots: [
      '/projects/LogKeep/LogkeepLibrary.webp',
      '/projects/LogKeep/CreateLog.webp',
      '/projects/LogKeep/Library1.webp',
      '/projects/LogKeep/Library2.webp',
    ],
    icon: '/book.png',
    theme: 'logkeep',
    overview: {
      tagline: 'Personal media tracker - books, manga and shows in one library, one Supabase schema.',
      note: '(frequently used!)',
      tags: ['Next.js', 'TypeScript', 'Supabase'],
      cover: '/projects/LogKeep/Library2.webp',
    },
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing my projects and experience. Built with Next.js, React, TypeScript, and Tailwind CSS, featuring smooth animations and a clean design.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/linnilindin/portfolio',
    screenshots: [
      '/projects/Portfolio/portfolio1.webp',
      '/projects/Portfolio/portfolio2.webp',
      '/projects/Portfolio/porfolio3.webp',
    ],
    icon: '/code.webp',
    theme: 'portfolio',
    overview: {
      tagline: 'This site - Next.js, TypeScript and Tailwind, motion used sparingly.',
      cover: '/projects/Portfolio/porfolio3.webp',
    },
  },
]

