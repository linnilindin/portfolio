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
import { CSS } from '@dnd-kit/utilities'
import { aboutData, TechStackItem } from '@/data/about'
import { Folder } from '@/components/ui/folder'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'] as const

interface SortableTechItemProps {
  tech: TechStackItem
  index: number
}

function SortableTechItem({ tech, index }: SortableTechItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${tech.category}-${tech.name}-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <motion.span
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="px-4 py-2 bg-white rounded-lg text-gray-900 font-medium shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      {tech.name}
    </motion.span>
  )
}

interface CategoryTechListProps {
  category: string
  techs: TechStackItem[]
  categoryId: string
}

function CategoryTechList({ category, techs, categoryId }: CategoryTechListProps) {
  const itemIds = techs.map((tech, index) => `${category}-${tech.name}-${index}`)

  return (
    <Folder name={category}>
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {techs.map((tech, index) => (
            <SortableTechItem key={`${tech.name}-${index}`} tech={tech} index={index} />
          ))}
        </div>
      </SortableContext>
    </Folder>
  )
}

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { techStack: initialTechStack, bio, resumeUrl } = aboutData
  const [techStack, setTechStack] = useState<TechStackItem[]>(initialTechStack)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Group tech stack by category with their order
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

    if (!over) {
      // if dropped outside of droppable area, send it bcak
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    // Extract category and tech name from IDs
    const activeMatch = activeId.match(/^(.+?)-(.+?)-(\d+)$/)
    const overMatch = overId.match(/^(.+?)-(.+?)-(\d+)$/)

    if (!activeMatch || !overMatch) return

    const activeCategory = activeMatch[1]
    const overCategory = overMatch[1]

    // Only allow reordering within the same category
    if (activeCategory !== overCategory) {
      return
    }

    const activeIndex = parseInt(activeMatch[3], 10)
    const overIndex = parseInt(overMatch[3], 10)

    if (activeIndex === overIndex) {
      return
    }

    // Get the current items for this category
    const categoryItems = techStackByCategory[activeCategory]
    const newCategoryItems = arrayMove(categoryItems, activeIndex, overIndex)

    // Rebuild the entire tech stack with the reordered category
    const newTechStack: TechStackItem[] = []
    CATEGORIES.forEach((category) => {
      if (category === activeCategory) {
        newTechStack.push(...newCategoryItems)
      } else {
        newTechStack.push(...techStackByCategory[category])
      }
    })

    setTechStack(newTechStack)
  }

  const activeTech = useMemo(() => {
    if (!activeId) return null
    const match = activeId.match(/^(.+?)-(.+?)-(\d+)$/)
    if (!match) return null
    const category = match[1]
    const techName = match[2]
    return techStackByCategory[category]?.find((tech) => tech.name === techName) || null
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
            style={{ zIndex: 30, position: 'relative' }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 relative" style={{ zIndex: 30 }}>
              About Me
            </h2>
            <div className="space-y-6 text-lg text-gray-800 relative" style={{ zIndex: 30 }}>
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

          <div className="space-y-8 relative" style={{ zIndex: 30, position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="space-y-8 relative"
              style={{ zIndex: 30, position: 'relative' }}
            >
              <div className="space-y-2" style={{ zIndex: 30, position: 'relative' }}>
                {CATEGORIES.map((category) => (
                  <CategoryTechList
                    key={category}
                    category={category}
                    techs={techStackByCategory[category]}
                    categoryId={category}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <DragOverlay>
          {activeTech ? (
            <span className="px-4 py-2 bg-white rounded-lg text-gray-900 font-medium shadow-lg opacity-90">
              {activeTech.name}
            </span>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  )
})

AboutSection.displayName = 'AboutSection'

export default AboutSection

