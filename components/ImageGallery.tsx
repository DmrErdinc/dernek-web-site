'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null)
      if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? (i + 1) % images.length : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, images.length])

  if (!images || images.length === 0) return null

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i + 1) % images.length : null) }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Görseller</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative w-full overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={img}
                alt={`${title} - Görsel ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-7 h-7" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 md:left-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={prev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                className="absolute right-3 md:right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={next}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl mx-12 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ maxHeight: '80vh' }}>
              <Image
                src={images[lightboxIndex]}
                alt={`${title} - Görsel ${lightboxIndex + 1}`}
                width={1400}
                height={900}
                className="w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: '80vh' }}
                unoptimized
              />
            </div>
            {images.length > 1 && (
              <p className="text-white/70 text-sm mt-3">
                {lightboxIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
