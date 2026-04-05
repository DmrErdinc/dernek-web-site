'use client'

import { useEffect } from 'react'

export function FaviconHandler() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const settings = await res.json()
          if (settings?.favicon) {
            const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
            link.type = 'image/x-icon'
            link.rel = 'shortcut icon'
            link.href = settings.favicon
            if (!document.querySelector("link[rel*='icon']")) {
              document.getElementsByTagName('head')[0].appendChild(link)
            }
          }
        }
      } catch (error) {
        console.error('Favicon update error:', error)
      }
    }

    updateFavicon()
  }, [])

  return null
}