'use client'

import { forwardRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { aboutData, TechStackItem } from '@/data/about'
import { Folder } from '@/components/ui/folder'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'] as const

interface SortableTechItemProps {
  tech: TechStackItem
  id: string
}

function SortableTechItem({ tech, id }: SortableTechItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useSortable({ id })

  return (
    <span
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="inline-block"
      {...attributes}
      {...listeners}
    >
      <span className="px-4 py-2 bg-white rounded-lg text-gray-900 font-medium shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing inline-block">
        {tech.name}
      </span>
    </span>
  )
}

interface CategoryTechListProps {
  category: string
  techs: TechStackItem[]
}

function CategoryTechList({ category, techs }: CategoryTechListProps) {
  const itemIds = techs.map((tech) => `${category}-${tech.name}`)

  return (
    <Folder name={category}>
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {techs.map((tech) => (
            <SortableTechItem
              key={`${category}-${tech.name}`}
              tech={tech}
              id={`${category}-${tech.name}`}
            />
          ))}
        </div>
      </SortableContext>
    </Folder>
  )
}

// Helper function to parse ID into category and tech name
function parseId(id: string): { category: string; techName: string } | null {
  const match = id.match(/^(.+?)-(.+)$/)
  if (!match) return null
  return { category: match[1], techName: match[2] }
}

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { techStack: initialTechStack, bio, resumeUrl } = aboutData
  const [techStack, setTechStack] = useState<TechStackItem[]>(initialTechStack)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const techStackByCategory = useMemo(() => {
    const grouped: Record<string, TechStackItem[]> = {}
    CATEGORIES.forEach((category) => {
      grouped[category] = techStack.filter((tech) => tech.category === category)
    })
    return grouped
  }, [techStack])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeParsed = parseId(active.id as string)
    const overParsed = parseId(over.id as string)

    if (!activeParsed || !overParsed) return
    if (activeParsed.category !== overParsed.category) return

    const categoryItems = techStackByCategory[activeParsed.category]
    const activeIndex = categoryItems.findIndex((tech) => tech.name === activeParsed.techName)
    const overIndex = categoryItems.findIndex((tech) => tech.name === overParsed.techName)

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) return

    const newCategoryItems = arrayMove(categoryItems, activeIndex, overIndex)

    // Rebuild tech stack with reordered category
    const newTechStack: TechStackItem[] = []
    CATEGORIES.forEach((category) => {
      newTechStack.push(
        ...(category === activeParsed.category ? newCategoryItems : techStackByCategory[category])
      )
    })

    setTechStack(newTechStack)
  }

  const activeTech = useMemo(() => {
    if (!activeId) return null
    const parsed = parseId(activeId)
    if (!parsed) return null
    return techStackByCategory[parsed.category]?.find((tech) => tech.name === parsed.techName) || null
  }, [activeId, techStackByCategory])

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-16"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-gray-800">
              <p className="leading-relaxed">
                {bio.paragraph1}
              </p>
              <p className="leading-relaxed">
                {bio.paragraph2}
              </p>
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl mt-6"
              >
                View Resume
              </motion.a>
            </div>
          </motion.div>

          <div className="space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <CategoryTechList
                    key={category}
                    category={category}
                    techs={techStackByCategory[category]}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <DragOverlay>
          {activeTech ? (
            <motion.span
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: 1.1, rotate: 2 }}
              className="px-4 py-2 bg-white rounded-lg text-gray-900 font-medium shadow-2xl cursor-grabbing"
              style={{
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              {activeTech.name}
            </motion.span>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  )
})

AboutSection.displayName = 'AboutSection'

export default AboutSection

