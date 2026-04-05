'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X, Upload, Loader2, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface MultiImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  sizeHint?: string
}

export function MultiImageUpload({ images, onChange, maxImages = 10, sizeHint }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddUrl = () => {
    const trimmedUrl = urlInput.trim()

    if (!trimmedUrl) {
      toast({ title: 'Hata', description: 'Lütfen geçerli bir URL girin', variant: 'destructive' })
      return
    }

    if (images.length >= maxImages) {
      toast({ title: 'Hata', description: `En fazla ${maxImages} görsel ekleyebilirsiniz`, variant: 'destructive' })
      return
    }

    try {
      new URL(trimmedUrl)
    } catch {
      toast({ title: 'Hata', description: 'Geçersiz URL. "http://" veya "https://" ile başlamalıdır.', variant: 'destructive' })
      return
    }

    if (images.includes(trimmedUrl)) {
      toast({ title: 'Uyarı', description: 'Bu URL zaten eklenmiş', variant: 'destructive' })
      return
    }

    onChange([...images, trimmedUrl])
    setUrlInput('')
    setShowUrlInput(false)
    toast({ title: 'Başarılı', description: 'Görsel URL\'si eklendi' })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Hata',
        description: `En fazla ${maxImages} görsel ekleyebilirsiniz. Şu anda ${images.length} var, ${maxImages - images.length} tane daha ekleyebilirsiniz.`,
        variant: 'destructive'
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const maxSize = 5 * 1024 * 1024

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast({ title: 'Hata', description: `${file.name}: Geçersiz dosya tipi. JPG, PNG, WEBP veya GIF olmalıdır.`, variant: 'destructive' })
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
      if (file.size > maxSize) {
        toast({ title: 'Hata', description: `${file.name}: Dosya 5MB'dan büyük olamaz.`, variant: 'destructive' })
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
    }

    setUploading(true)
    const uploadedUrls: string[] = []
    const failedFiles: string[] = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (res.ok) {
          const data = await res.json()
          if (data.url) uploadedUrls.push(data.url)
          else failedFiles.push(file.name)
        } else {
          failedFiles.push(file.name)
        }
      } catch {
        failedFiles.push(file.name)
      }
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''

    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls])
      if (failedFiles.length === 0) {
        toast({ title: 'Başarılı', description: `${uploadedUrls.length} görsel yüklendi` })
      } else {
        toast({ title: 'Kısmi Başarı', description: `${uploadedUrls.length} yüklendi, ${failedFiles.length} başarısız: ${failedFiles.join(', ')}`, variant: 'destructive' })
      }
    } else {
      toast({ title: 'Hata', description: 'Hiçbir görsel yüklenemedi.', variant: 'destructive' })
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [moved] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, moved)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Ek Görseller ({images.length}/{maxImages})
        </label>
        {images.length < maxImages && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <LinkIcon className="h-4 w-4" />
              URL Ekle
            </button>
            <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${uploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
              {uploading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Yükleniyor...</>
              ) : (
                <><Upload className="h-4 w-4" />Dosya Yükle</>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); handleAddUrl() }
              if (e.key === 'Escape') { setShowUrlInput(false); setUrlInput('') }
            }}
            autoFocus
          />
          <button type="button" onClick={handleAddUrl} className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            Ekle
          </button>
          <button type="button" onClick={() => { setShowUrlInput(false); setUrlInput('') }} className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">
            İptal
          </button>
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors bg-gray-100"
            >
              <Image
                src={image}
                alt={`Görsel ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain"
                unoptimized={image.startsWith('http')}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {index > 0 && (
                  <button type="button" onClick={() => moveImage(index, index - 1)} className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full" title="Sola Taşı">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                <button type="button" onClick={() => removeImage(index)} className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full" title="Sil">
                  <X className="h-3.5 w-3.5" />
                </button>
                {index < images.length - 1 && (
                  <button type="button" onClick={() => moveImage(index, index + 1)} className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full" title="Sağa Taşı">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-black/70 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
          <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-1">Henüz ek görsel eklenmedi</p>
          <p className="text-xs text-gray-400">Dosya yükle veya URL ekle butonunu kullanın</p>
          {sizeHint && <p className="text-xs text-blue-500 mt-2">Önerilen boyut: {sizeHint}</p>}
        </div>
      )}
    </div>
  )
}