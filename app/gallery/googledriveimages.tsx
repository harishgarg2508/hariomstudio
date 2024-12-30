'use client'

import Image from 'next/image'

interface GoogleDriveImageProps {
  fileId: string
  alt: string
  className?: string
}

export function GoogleDriveImage({ fileId, alt, className }: GoogleDriveImageProps) {
  // Construct the direct Google Drive URL
  const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-lg"
        priority
      />
    </div>
  )
}

