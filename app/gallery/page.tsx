
"use client"
import { useState, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Search, ImageIcon, LogOut, Shield } from "lucide-react"
import { SecurityPinDialog } from "@/components/security-pin-dialog"


import { AdvancedFilters } from "@/components/advanced-filters"
import { GalleryGrid } from "@/components/gallery-grid"
import { ImageViewer } from "@/components/image-viewer"
import { useAuth } from "@/lib/auth-context"
import type { MediaItem, Tag, FilterOptions } from "@/lib/types"
import { getMediaItems, getTags } from "@/lib/firebase-operations"
import { YouTubeEmbed } from "@/components/youtube-embed"
import dynamic from "next/dynamic"

const UploadDialog = dynamic(() =>
    import("@/components/upload-dialog").then((mod) => mod.UploadDialog),
    {
        ssr: false,
    }
)
import { useRouter } from "next/navigation"

export default function Gallery() {
  const router = useRouter()
  // Pagination state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]) // Accumulated items
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const LIMIT = 20


  // ... (keeping other states)

  const [tags, setTags] = useState<Tag[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    mediaType: "all",
    sortBy: "latest",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isSecurityDialogOpen, setIsSecurityDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null)
  const [loading, setLoading] = useState(true)

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Create a filtered view for client-side operations that Firestore can't handle perfectly (like search text)
  // Note: ideally search should be server-side too, but Firestore requires 3rd party for full text.
  // For now, we filter the *fetched* items.
  const filteredItems = useMemo(() => {
    return mediaItems.filter(item => {
      if (!searchTerm) return true;
      return item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    }).filter(item => {
       if (!filters.dateRange) return true;
       const itemDate = item.createdAt.getTime()
       const startTime = filters.dateRange!.start.getTime()
       const endTime = filters.dateRange!.end.getTime() + 24 * 60 * 60 * 1000
       return itemDate >= startTime && itemDate <= endTime
    });
  }, [mediaItems, searchTerm, filters.dateRange]);

  const imageItems = useMemo(() => filteredItems.filter((item) => item.type === "image"), [filteredItems]);

  const { isAuthenticated, logout } = useAuth()

  // DEBUG LOG


  // Initial tags load
  useEffect(() => {
    getTags().then(setTags).catch(console.error)
  }, [])

  // Load initial data
  useEffect(() => {
    loadData(true)
  }, [filters])


  const loadData = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setMediaItems([])
        setLastDoc(null)
        setHasMore(true)
      } else {
        setIsLoadingMore(true)
      }
      
      const currentLastDoc = reset ? null : lastDoc
      const { items, lastDoc: newLastDoc } = await getMediaItems(filters, currentLastDoc, LIMIT)
      
      setMediaItems(prev => reset ? items : [...prev, ...items])
      setLastDoc(newLastDoc)
      setHasMore(items.length === LIMIT)
      
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadData(false)
    }
  }

  const handleUploadClick = () => {
    if (isAuthenticated) {
      setIsUploadDialogOpen(true)
    } else {
      setIsSecurityDialogOpen(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsUploadDialogOpen(true)
  }

  const handleLogout = () => {
    logout()
    setIsUploadDialogOpen(false)
  }

  const handleUploadComplete = () => {
    setIsUploadDialogOpen(false)
    loadData(true) // Reload from scratch
  }

  const handleImageClick = (item: MediaItem) => {
    const imageIndex = imageItems.findIndex((img) => img.id === item.id)
    if (imageIndex !== -1) {
      setCurrentImageIndex(imageIndex)
      setIsImageViewerOpen(true)
    }
  }

  const handleVideoClick = (item: MediaItem) => {
    setSelectedVideo(item)
  }

  const handleImageViewerClose = () => {
    setIsImageViewerOpen(false)
  }

  const handleImageIndexChange = (index: number) => {
    setCurrentImageIndex(index)
  }
return (
  <div
    className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    onContextMenu={(e) => e.preventDefault()}
  >
    <button 
      className="bg-zinc-800 hover:bg-blue-700 text-white shadow-md mt-4 ml-4 px-4 py-2 rounded" 
      onClick={() => router.push("/")}
    >
      &larr; Back to Home
    </button>
    
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Photography Gallery</h1>
        <p className="text-slate-600 dark:text-slate-400">Showcasing moments captured through the lens</p>

        {isAuthenticated && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Authenticated for uploads</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-slate-700 bg-white/50 dark:bg-slate-800/50 shadow-sm">
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Search and Upload Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
          />
        </div>

        <Button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          <Upload className="w-4 h-4 mr-2" />
          Upload
          {!isAuthenticated && <Shield className="w-3 h-3 ml-1" />}
        </Button>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={filters}
        onFiltersChange={setFilters}
        tags={tags}
        totalItems={mediaItems.length}
        filteredCount={filteredItems.length}
      />

      {/* Gallery Content */}
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 dark:text-slate-400 mb-2">No media found</h3>
            <p className="text-slate-500 dark:text-slate-500">
              {mediaItems.length === 0
                ? "Upload your first image or video to get started"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full">
              <GalleryGrid items={filteredItems} onImageClick={handleImageClick} onVideoClick={handleVideoClick} />
            </div>
            
            {hasMore && !searchTerm && !filters.dateRange && (
               <Button 
                onClick={handleLoadMore} 
                className="min-w-[200px]"
                variant="outline"
                size="lg"
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Loading more...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            )}
            
            {/* Infinite Scroll Ready: To switch to infinite scroll, replace the Button above with:
                <InfiniteScroll
                  dataLength={filteredItems.length}
                  next={handleLoadMore}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <GalleryGrid ... />
                </InfiniteScroll>
            */}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <UploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
      />

      <SecurityPinDialog
        open={isSecurityDialogOpen}
        onOpenChange={setIsSecurityDialogOpen}
        onSuccess={handleAuthSuccess}
      />

      <ImageViewer
        images={imageItems}
        currentIndex={currentImageIndex}
        isOpen={isImageViewerOpen}
        onClose={handleImageViewerClose}
        onIndexChange={handleImageIndexChange}
      />

      {/* Video Viewer Modal */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-slate-800 dark:text-slate-100">
                {selectedVideo.title || "Video"}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              {selectedVideo.youtubeEmbedCode ? (
                <YouTubeEmbed embedCode={selectedVideo.youtubeEmbedCode} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  No video available
                </div>
              )}
            </div>
            {selectedVideo.tags && selectedVideo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {selectedVideo.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  </div>
)}