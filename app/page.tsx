import Landing from '@/components/Landing'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Landing />
      <Projects />
      <Contact />
    </main>
  )
}

