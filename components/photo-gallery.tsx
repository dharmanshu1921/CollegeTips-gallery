"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Share2 } from "lucide-react"
import GalleryFilter from "./gallery-filter"
import { galleryImages } from "@/data/gallery-data"

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState(galleryImages)
  const [selectedImage, setSelectedImage] = useState<null | (typeof galleryImages)[0]>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(galleryImages.filter((img) => img.category === selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = (image: (typeof galleryImages)[0]) => {
    if (navigator.share) {
      navigator
        .share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      alert("Sharing is not supported in your browser")
    }
  }

  return (
    <div className="space-y-8">
      <GalleryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-64 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer h-64"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  priority={image.id <= 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                  {image.category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-5xl h-[80vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-white text-xl md:text-2xl font-bold">{selectedImage.title}</h2>
                  <p className="text-white/80 md:text-lg">{selectedImage.description}</p>
                  <p className="text-white/60 text-sm mt-1">
                    Category:{" "}
                    {selectedImage.category
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(selectedImage)
                    }}
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <a
                    href={selectedImage.src}
                    download={`collegetips-${selectedImage.title.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {filteredImages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images found in this category.</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            View all images
          </button>
        </div>
      )}

      <footer className="text-center py-8 border-t border-green-100">
        <p className="text-gray-500 text-sm">
          © 2024 CollegeTips Photo Gallery | Developed by{" "}
          <span className="font-semibold text-green-600">Dharmanshu Singh</span>
        </p>
      </footer>
    </div>
  )
}
