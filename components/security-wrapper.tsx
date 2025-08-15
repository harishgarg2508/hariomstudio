"use client"
import { useEffect } from "react"
import type React from "react"

interface SecurityWrapperProps {
  children: React.ReactNode
}

export function SecurityWrapper({ children }: SecurityWrapperProps) {
  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable common keyboard shortcuts for developer tools and saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+A (Select All) on images
      if (e.ctrlKey && e.key === "a" && (e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault()
        return false
      }

      // Disable Ctrl+P (Print) to prevent printing images
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault()
        return false
      }
    }

    // Disable drag and drop globally
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection on images and sensitive areas
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (target?.tagName === "IMG" || target?.closest("[data-no-select]")) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("dragstart", handleDragStart)
    document.addEventListener("selectstart", handleSelectStart)

    // Disable image dragging specifically
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.draggable = false
      img.addEventListener("dragstart", handleDragStart)
    })

    // Clean up event listeners
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("dragstart", handleDragStart)
      document.removeEventListener("selectstart", handleSelectStart)
    }
  }, [])

  // Add CSS to prevent text selection and other security measures
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      /* Disable text selection on images and gallery items */
      img, [data-no-select] {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }

      /* Disable highlighting on gallery items */
      .gallery-item {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Hide scrollbars to prevent easy image access */
      .image-container::-webkit-scrollbar {
        display: none;
      }
      
      /* Prevent image caching in some browsers */
      img {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: auto;
      }

      /* Disable print styles for images */
      @media print {
        img {
          display: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <div data-no-select>{children}</div>
}
