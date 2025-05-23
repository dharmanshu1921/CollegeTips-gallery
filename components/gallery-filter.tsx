"use client"

import { motion } from "framer-motion"

type GalleryFilterProps = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export default function GalleryFilter({ selectedCategory, setSelectedCategory }: GalleryFilterProps) {
  const categories = [
    { id: "all", name: "All Photos", emoji: "📸" },
    { id: "team-vibes", name: "Team Vibes", emoji: "🤝" },
    { id: "creative-campaigns", name: "Creative Campaigns", emoji: "🎨" },
    { id: "work-hard-play-hard", name: "Work Hard, Play Hard", emoji: "🥳" },
    { id: "behind-the-scenes", name: "Behind-The-Scenes", emoji: "🎥" },
  ]

  return (
    <div className="overflow-x-auto pb-2 -mx-4 px-4">
      <div className="flex gap-2 justify-center min-w-max mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id ? "text-white" : "text-gray-700 hover:text-green-700"
            }`}
            aria-pressed={selectedCategory === category.id}
          >
            {selectedCategory === category.id && (
              <motion.span
                layoutId="activePill"
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative z-10">
              {category.emoji} {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
