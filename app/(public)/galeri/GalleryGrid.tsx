'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  image: string
  category?: { name: string } | null
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => (i! > 0 ? i! - 1 : items.length - 1))
  const next = () => setLightboxIndex(i => (i! < items.length - 1 ? i! + 1 : 0))

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => open(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized={item.image.startsWith('http')}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
              <div className="w-full p-3 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-semibold text-sm leading-tight">{item.title}</p>
                {item.category && (
                  <p className="text-xs text-white/70 mt-0.5">{item.category.name}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}>
              <Image
                src={items[lightboxIndex].image}
                alt={items[lightboxIndex].title}
                fill
                className="object-contain"
                unoptimized={items[lightboxIndex].image.startsWith('http')}
                priority
              />
            </div>
          </div>

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Caption */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white px-4">
            <p className="font-semibold">{items[lightboxIndex].title}</p>
            {items[lightboxIndex].category && (
              <p className="text-sm text-white/60">{items[lightboxIndex].category!.name}</p>
            )}
            <p className="text-xs text-white/40 mt-1">{lightboxIndex + 1} / {items.length}</p>
          </div>
        </div>
      )}
    </>
  )
}
