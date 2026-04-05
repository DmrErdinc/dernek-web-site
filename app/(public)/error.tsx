'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bir hata oluştu</h2>
        <p className="text-gray-500 mb-6">Üzgünüz, bir şeyler ters gitti.</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  )
}
