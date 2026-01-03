
/**
 * Optimizes image URLs for better performance
 * Currently optimizes Cloudinary URLs by adding transformation parameters
 */
export function getOptimizedUrl(url: string | undefined | null, width = 800, quality = 80): string {
  if (!url) return "/placeholder.svg"
  
  // Check if it's a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    // If it already has transformation parameters, try to inject ours or leave it
    // This is a simple implementation that looks for /upload/ and inserts params after it
    if (url.includes("/upload/") && !url.includes("/f_auto,q_auto")) {
      return url.replace(
        "/upload/", 
        `/upload/w_${width},f_auto,q_${quality},c_limit/`
      )
    }
  }
  
  return url
}

/**
 * Generates a thumbnail URL specifically for video content or small previews
 */
export function getThumbnailUrl(url: string | undefined | null, width = 400): string {
  return getOptimizedUrl(url, width, 60)
}
