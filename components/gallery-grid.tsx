"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, Play, ExternalLink } from "lucide-react"
import type { MediaItem } from "@/lib/types"
import { getOptimizedUrl, getThumbnailUrl } from "@/lib/media-utils"

interface GalleryGridProps {
  items: MediaItem[]
  onImageClick: (item: MediaItem) => void
  onVideoClick: (item: MediaItem) => void
}

export function GalleryGrid({ items, onImageClick, onVideoClick }: GalleryGridProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 gallery-item"
          data-no-select
        >
          <CardContent className="p-0">
            <div
              className="relative aspect-square"
              onClick={() => (item.type === "image" ? onImageClick(item) : onVideoClick(item))}
            >
              {item.type === "image" ? (
                <img
                  src={getOptimizedUrl(item.url, 400) || "/placeholder.svg?height=300&width=300&query=gallery image"}
                  alt={item.title || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                  data-no-select
                  style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                />
              ) : (
                <div className="relative w-full h-full bg-slate-900 flex items-center justify-center" data-no-select>
                  {item.thumbnailUrl ? (
                    <img
                      src={getThumbnailUrl(item.thumbnailUrl) || "/placeholder.svg"}
                      alt={item.title || "Video thumbnail"}
                      className="w-full h-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                      data-no-select
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      <Video className="w-12 h-12 text-slate-400" />
                    </div>
                  )}

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play className="w-6 h-6 text-slate-800 fill-current" />
                    </div>
                  </div>
                </div>
              )}

              {/* Media type indicator */}
              <div className="absolute top-2 right-2">
                <div className="bg-black bg-opacity-60 rounded-full p-1.5">
                  {item.type === "video" ? (
                    <Video className="w-4 h-4 text-white" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Date overlay */}
              <div className="absolute bottom-2 left-2">
                <div className="bg-black bg-opacity-60 rounded px-2 py-1">
                  <span className="text-xs text-white font-medium">{formatDate(item.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Item info */}
            <div className="p-4" data-no-select>
              {item.title && (
                <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-2 truncate text-sm">{item.title}</h3>
              )}

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      +{item.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              {/* Video specific actions */}
              {item.type === "video" && (
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-7 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      onVideoClick(item)
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  {item.url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(item.url, "_blank")
                      }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
