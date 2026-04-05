'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex w-fit items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
    >
      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      Geri
    </button>
  )
}
