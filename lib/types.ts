export interface MediaItem {
  id: string
  type: "image" | "video"
  title?: string
  url: string
  thumbnailUrl?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  // For images
  cloudinaryPublicId?: string
  // For videos
  youtubeEmbedCode?: string
  youtubeVideoId?: string
}

export interface Tag {
  id: string
  name: string
  count: number
  createdAt: Date
}

export interface UploadFormData {
  files?: FileList
  youtubeEmbedCode?: string
  title?: string
  tags: string[]
  type: "image" | "video"
}

export interface FilterOptions {
  tags: string[]
  mediaType: "all" | "image" | "video"
  sortBy: "latest" | "oldest" | "title"
  dateRange?: {
    start: Date
    end: Date
  }
}
