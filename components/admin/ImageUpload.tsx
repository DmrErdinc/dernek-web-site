'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useImageUpload } from '@/hooks/useImageUpload'
import { toast } from '@/components/ui/use-toast'

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (url: string | null) => void
  label?: string
  aspectRatio?: 'square' | 'video' | 'wide'
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  label = 'Görsel',
  aspectRatio = 'video'
}: ImageUploadProps) {
  const { uploading, uploadImage } = useImageUpload()
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Hata',
        description: 'Geçersiz dosya tipi. Sadece JPG, PNG, WEBP ve GIF dosyaları yüklenebilir.',
        variant: 'destructive'
      })
      e.target.value = ''
      return
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast({
        title: 'Hata',
        description: 'Dosya boyutu 5MB\'dan küçük olmalıdır.',
        variant: 'destructive'
      })
      e.target.value = ''
      return
    }

    // Önizleme için local URL oluştur
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    // Dosyayı yükle
    const url = await uploadImage(file)
    if (url) {
      onImageChange(url)
      setPreview(url)
      // Local URL'i temizle
      URL.revokeObjectURL(localPreview)
    } else {
      // Hata durumunda önizlemeyi geri al
      setPreview(currentImage || null)
      URL.revokeObjectURL(localPreview)
      e.target.value = ''
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]'
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {preview ? (
        <div className="relative">
          <div className={`relative w-full ${aspectClasses[aspectRatio]} rounded-lg overflow-hidden border-2 border-gray-200`}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            disabled={uploading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className={`relative w-full ${aspectClasses[aspectRatio]} border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors`}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-sm">Yükleniyor...</p>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium mb-1">Görsel yüklemek için tıklayın</p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP, GIF (Max 5MB)</p>
              </>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Önerilen boyut: {aspectRatio === 'square' ? '1:1' : aspectRatio === 'video' ? '16:9' : '21:9'} oran
      </p>
    </div>
  )
}