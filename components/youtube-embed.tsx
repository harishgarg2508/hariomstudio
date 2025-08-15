"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Video, X, Plus, FileImage, Youtube, TagIcon, AlertCircle, CheckCircle } from "lucide-react"
import { uploadMultipleImagesToCloudinary } from "@/lib/cloudinary"
import { addMediaItem, updateTagCount } from "@/lib/firebase-operations"
import type { MediaItem } from "@/lib/types"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete: () => void
}

interface UploadProgress {
  file: string
  progress: number
  status: "uploading" | "completed" | "error"
  url?: string
  error?: string
}

export function UploadDialog({ open, onOpenChange, onUploadComplete }: UploadDialogProps) {
  const [activeTab, setActiveTab] = useState<"images" | "video">("images")
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [youtubeEmbedCode, setYoutubeEmbedCode] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setSelectedFiles(null)
    setYoutubeEmbedCode("")
    setTitle("")
    setTags([])
    setNewTag("")
    setError("")
    setUploadProgress([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      resetForm()
      onOpenChange(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Validate file types
      const validFiles = Array.from(files).filter((file) => {
        const isImage = file.type.startsWith("image/")
        if (!isImage) {
          setError(`${file.name} is not a valid image file`)
          return false
        }
        return true
      })

      if (validFiles.length > 0) {
        const dataTransfer = new DataTransfer()
        validFiles.forEach((file) => dataTransfer.items.add(file))
        setSelectedFiles(dataTransfer.files)
        setError("")
      }
    }
  }

  const addTag = () => {
    const trimmedTag = newTag.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const extractYouTubeVideoId = (embedCode: string): string | null => {
    const match = embedCode.match(/youtube\.com\/embed\/([^?]+)/)
    return match ? match[1] : null
  }

  const validateYouTubeEmbed = (embedCode: string): boolean => {
    return embedCode.includes("youtube.com/embed/") && embedCode.includes("<iframe")
  }

  const handleImageUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("Please select at least one image")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      // Initialize progress tracking
      const progressItems: UploadProgress[] = Array.from(selectedFiles).map((file) => ({
        file: file.name,
        progress: 0,
        status: "uploading" as const,
      }))
      setUploadProgress(progressItems)

      // Upload images to Cloudinary
      const uploadResults = await uploadMultipleImagesToCloudinary(selectedFiles)

      // Process each upload result
      for (let i = 0; i < uploadResults.length; i++) {
        const result = uploadResults[i]
        const file = selectedFiles[i]

        setUploadProgress((prev) =>
          prev.map((item, index) => (index === i ? { ...item, progress: 50, status: "uploading" } : item)),
        )

        if (result.secure_url) {
          // Save to Firebase
          const mediaData: Omit<MediaItem, "id" | "createdAt" | "updatedAt"> = {
            type: "image",
            title: title || file.name.replace(/\.[^/.]+$/, ""), // Remove file extension if no title
            url: result.secure_url,
            thumbnailUrl: result.secure_url,
            tags: tags,
            cloudinaryPublicId: result.public_id,
          }

          await addMediaItem(mediaData)

          // Update tag counts
          for (const tag of tags) {
            await updateTagCount(tag, 1)
          }

          setUploadProgress((prev) =>
            prev.map((item, index) =>
              index === i ? { ...item, progress: 100, status: "completed", url: result.secure_url } : item,
            ),
          )
        } else {
          setUploadProgress((prev) =>
            prev.map((item, index) => (index === i ? { ...item, status: "error", error: "Upload failed" } : item)),
          )
        }
      }

      // Check if all uploads completed successfully
      const allCompleted = uploadResults.every((result) => result.secure_url)
      if (allCompleted) {
        setTimeout(() => {
          resetForm()
          onUploadComplete()
          onOpenChange(false)
        }, 1500)
      }
    } catch (error) {
      console.error("Upload error:", error)
      setError("Failed to upload images. Please try again.")
      setUploadProgress((prev) => prev.map((item) => ({ ...item, status: "error", error: "Upload failed" })))
    } finally {
      setIsUploading(false)
    }
  }

  const handleVideoUpload = async () => {
    if (!youtubeEmbedCode.trim()) {
      setError("Please enter a YouTube embed code")
      return
    }

    if (!validateYouTubeEmbed(youtubeEmbedCode)) {
      setError("Please enter a valid YouTube embed code")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const videoId = extractYouTubeVideoId(youtubeEmbedCode)
      // Use a more reliable thumbnail URL
      const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined

      const mediaData: Omit<MediaItem, "id" | "createdAt" | "updatedAt"> = {
        type: "video",
        title: title || "YouTube Video",
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl,
        tags: tags,
        youtubeEmbedCode,
        youtubeVideoId: videoId || undefined,
      }

      await addMediaItem(mediaData)

      // Update tag counts
      for (const tag of tags) {
        await updateTagCount(tag, 1)
      }

      resetForm()
      onUploadComplete()
      onOpenChange(false)
    } catch (error) {
      console.error("Video upload error:", error)
      setError("Failed to save video. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "images") {
      await handleImageUpload()
    } else {
      await handleVideoUpload()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Upload className="w-6 h-6 text-blue-600" />
            Upload Media to Gallery
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-6">
            <TabsTrigger
              value="images"
              className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 transition-all duration-200 rounded-md"
            >
              <ImageIcon className="w-5 h-5" />
              Images
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 transition-all duration-200 rounded-md"
            >
              <Video className="w-5 h-5" />
              YouTube Video
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="images" className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Select Images
                </Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-800 hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    ref={fileInputRef}
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="mb-3 px-6 py-3 text-lg font-semibold border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FileImage className="w-5 h-5 mr-3" />
                    Choose Images
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select multiple images to upload. Supported formats: JPG, PNG, GIF, WebP
                  </p>

                  {selectedFiles && selectedFiles.length > 0 && (
                    <div className="mt-6 text-left p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900">
                      <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Selected files ({selectedFiles.length}):
                      </p>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                        {Array.from(selectedFiles).map((file, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                          >
                            <FileImage className="w-4 h-4 text-blue-500" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-xs text-gray-400">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-embed" className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  YouTube Embed Code
                </Label>
                <Textarea
                  id="youtube-embed"
                  placeholder="Paste your YouTube embed code here (e.g., <iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://www.youtube.com/embed/VIDEO_ID&quot;...)"
                  value={youtubeEmbedCode}
                  onChange={(e) => setYoutubeEmbedCode(e.target.value)}
                  rows={6}
                  disabled={isUploading}
                  className="min-h-[120px] text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                />
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Youtube className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-semibold mb-2">How to get YouTube embed code:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-400">
                      <li>Go to your YouTube video</li>
                      <li>Click "Share" below the video</li>
                      <li>Click "Embed"</li>
                      <li>Copy the entire iframe code and paste it here</li>
                    </ol>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Common fields for both tabs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Title (Optional)
                </Label>
                <Input
                  id="title"
                  placeholder={
                    activeTab === "images" ? "Enter a title for your images" : "Enter a title for your video"
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading}
                  className="text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., wedding, portrait, landscape)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    disabled={isUploading}
                    className="text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    disabled={!newTag.trim() || isUploading}
                    className="px-4 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1"
                      >
                        <TagIcon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                          disabled={isUploading}
                        >
                          <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="flex items-center gap-3 bg-red-50 dark:bg-red-950">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <AlertDescription className="text-base font-medium text-red-800 dark:text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Upload Progress */}
            {uploadProgress.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">Upload Progress</Label>
                {uploadProgress.map((item, index) => (
                  <Card key={index} className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                          {item.file}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.status === "completed" && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {item.status === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.status === "completed"
                              ? "Completed"
                              : item.status === "error"
                                ? "Failed"
                                : "Uploading..."}
                          </span>
                        </div>
                      </div>
                      {item.status === "uploading" && (
                        <Progress value={item.progress} className="h-2 bg-gray-300 dark:bg-gray-700" />
                      )}
                      {item.error && <p className="text-xs text-red-600 mt-1">{item.error}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isUploading}
                className="px-6 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isUploading ||
                  (activeTab === "images" && (!selectedFiles || selectedFiles.length === 0)) ||
                  (activeTab === "video" && !youtubeEmbedCode.trim())
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {activeTab === "images" ? "Uploading Images..." : "Saving Video..."}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {activeTab === "images" ? "Upload Images" : "Save Video"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}