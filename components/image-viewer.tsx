"use client"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Download, ExternalLink, Calendar, Tag } from "lucide-react"
import type { MediaItem } from "@/lib/types"

interface ImageViewerProps {
  images: MediaItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function ImageViewer({ images, currentIndex, isOpen, onClose, onIndexChange }: ImageViewerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const currentImage = images[currentIndex]

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1)
    }
  }, [currentIndex, onIndexChange])

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1)
    }
  }, [currentIndex, images.length, onIndexChange])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          goToPrevious()
          break
        case "ArrowRight":
          event.preventDefault()
          goToNext()
          break
        case "Escape":
          event.preventDefault()
          onClose()
          break
      }
    },
    [isOpen, goToPrevious, goToNext, onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageLoadStart = () => {
    setIsLoading(true)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleDownload = async () => {
    if (!currentImage?.url) return

    try {
      const response = await fetch(currentImage.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${currentImage.title || "image"}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  if (!currentImage) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-0">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium truncate max-w-md">{currentImage.title || "Untitled"}</h2>
                <div className="text-sm text-gray-300">
                  {currentIndex + 1} of {images.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleDownload} className="text-white hover:bg-white/20">
                  <Download className="w-4 h-4" />
                </Button>
                {currentImage.url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(currentImage.url, "_blank")}
                    className="text-white hover:bg-white/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative min-h-[60vh]">
            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="lg"
                onClick={goToPrevious}
                className="absolute left-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}

            {currentIndex < images.length - 1 && (
              <Button
                variant="ghost"
                size="lg"
                onClick={goToNext}
                className="absolute right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            {/* Main Image */}
            <img
              src={currentImage.url || "/placeholder.svg"}
              alt={currentImage.title || "Gallery image"}
              className="max-w-full max-h-full object-contain"
              onLoad={handleImageLoad}
              onLoadStart={handleImageLoadStart}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>

          {/* Footer with Image Info */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white space-y-3">
              {/* Tags */}
              {currentImage.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentImage.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Date and Navigation Info */}
              <div className="flex items-center justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(currentImage.createdAt)}
                </div>
                <div className="text-xs">Use ← → arrow keys to navigate • ESC to close</div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex gap-2 bg-black/60 rounded-lg p-2 max-w-md overflow-x-auto">
                {images.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((image, index) => {
                  const actualIndex = Math.max(0, currentIndex - 2) + index
                  return (
                    <button
                      key={image.id}
                      onClick={() => onIndexChange(actualIndex)}
                      className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                        actualIndex === currentIndex
                          ? "border-white scale-110"
                          : "border-transparent hover:border-white/50"
                      }`}
                    >
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.title || "Thumbnail"}
                        className="w-full h-full object-cover"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
