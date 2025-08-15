// In a new file: components/youtube-embed.tsx
export function YouTubeEmbed({ embedCode }: { embedCode?: string }) {
  if (!embedCode) return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white">
      No video available
    </div>
  )
  
  // Extract the video ID if possible
  const videoIdMatch = embedCode.match(/\/embed\/([^?"]+)/)
  const videoId = videoIdMatch ? videoIdMatch[1] : null
  
  if (videoId) {
    // Construct a safe embed URL
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    )
  }
  
  // Fall back to using the original embed code with escaping
  return (
    <div 
      className="w-full h-full"
      dangerouslySetInnerHTML={{ 
        __html: embedCode.replace(/"/g, '&quot;') 
      }} 
    />
  )
}