import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by Lens Master. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

