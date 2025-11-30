export interface TechStackItem {
  name: string
  category: string
}

export interface AboutData {
  techStack: TechStackItem[]
  bio: {
    paragraph1: string
    paragraph2: string
  }
  resumeUrl: string
}

export const aboutData: AboutData = {
  techStack: [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Craft.js', category: 'Frontend' },
    // Backend
    { name: 'GraphQL (Hasura)', category: 'Backend' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    // Database
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    // Tools
    { name: 'Git/GitHub', category: 'Tools' },
    { name: 'Jira', category: 'Tools' },
    { name: 'Figma', category: 'Tools' },
    { name: 'Docker', category: 'Tools' },
    { name: 'Agile/Scrum', category: 'Tools' },
  ],
  bio: {
    paragraph1: "I'm a passionate developer specializing in React and modern web technologies. I love creating interactive, performant, and user-friendly experiences. When I'm not coding, I'm usually reading or drawing (like that cat you just saw!)",
    paragraph2: "With experience in fullstack development, I bring a comprehensive understanding of both frontend and backend systems, allowing me to build cohesive and scalable applications.",
  },
  resumeUrl: '/Lynn_Xie_Resume.pdf',
}

