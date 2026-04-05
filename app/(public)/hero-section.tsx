'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  images: string[]
}

export function HeroSection({ images }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) goNext()
    if (distance < -50) goPrev()
    setTouchStart(0)
    setTouchEnd(0)
  }

  if (images.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero ${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
            quality={95}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all duration-200 border border-white/30"
            aria-label="Önceki"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all duration-200 border border-white/30"
            aria-label="Sonraki"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'
                }`}
                aria-label={`Görsel ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}