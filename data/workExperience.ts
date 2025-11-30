export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  techStack: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  duration: string
  description?: string
}

export const workExperiences: WorkExperience[] = [
  {
    id: 'dineseal',
    company: 'DineSeal',
    position: 'Fullstack Developer Intern',
    duration: 'Feb 2025 - Jul 2025',
    description: 'Built a drag-and-drop page builder for a restaurant loyalty platform, letting business owners customise their pages without touching code. Worked with React, Next.js, and TypeScript on the frontend, connecting to GraphQL APIs for real-time updates. Created reusable components and editing tools (duplicate, reorder, group blocks) while keeping everything responsive across devices. Collaborated with the team through code reviews and kept documentation clear for everyone.',
    techStack: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind'],
  },
  {
    id: 'MLU',
    company: 'Mobile Learning Unit - University of Melbourne',
    position: 'Web Developer Intern',
    duration: 'Mar 2023 - Nov 2023',
    description: 'Redesigned the media carousel interface that students and staff use to access learning modules, making it much easier to navigate. Handled a full website migration to a new domain without any downtime. Also customised Salesforce features using Apex to improve how course administrators manage the system.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Salesforce', 'Apex'],
  },
  {
    id: 'Unimelb',
    company: 'University of Melbourne',
    position: 'Student IT Support',
    duration: 'Jun 2022 - Present',
    description: 'Helped students and staff troubleshoot tech issues across the universitys systems. Broke down technical problems in ways that make sense to non-technical users and used ServiceNow to track and document issues, knowing when to solve things directly and when to escalate to specialized teams.',
    techStack: ['ServiceNow', 'Microsoft 365', 'OktaSSO'],
  },
]

export const education: Education[] = [
  {
    id: 'masters',
    institution: 'University of Melbourne',
    degree: 'Master of Software Engineering',
    duration: 'Feb 2024 - Dec 2025',
    description: 'Computing and Information Systems Discipline Award Winner',
  },
  {
    id: 'bachelors',
    institution: 'University of Melbourne',
    degree: 'Bachelor of Science in Computer and Software Systems',
    duration: 'Mar 2021 - Dec 2023',
  },
]

