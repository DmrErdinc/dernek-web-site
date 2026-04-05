'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X, Upload, Loader2, Link as LinkIcon, ImageIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface SingleImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  required?: boolean
  sizeHint?: string
}

export function SingleImageUpload({ value, onChange, label = 'Görsel', required = false, sizeHint }: SingleImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      toast({ title: 'Hata', description: 'Geçersiz dosya tipi. JPG, PNG, WEBP, GIF veya SVG olmalıdır.', variant: 'destructive' })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Hata', description: 'Dosya 5MB\'dan büyük olamaz.', variant: 'destructive' })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        onChange(data.url)
        toast({ title: 'Başarılı', description: 'Görsel yüklendi' })
      } else {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Yükleme başarısız')
      }
    } catch (error) {
      toast({ title: 'Hata', description: error instanceof Error ? error.message : 'Görsel yüklenirken hata oluştu', variant: 'destructive' })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAddUrl = () => {
    const trimmed = urlInput.trim()
    if (!trimmed) {
      toast({ title: 'Hata', description: 'Lütfen geçerli bir URL girin', variant: 'destructive' })
      return
    }
    try {
      new URL(trimmed)
    } catch {
      toast({ title: 'Hata', description: 'Geçersiz URL. "http://" veya "https://" ile başlamalıdır.', variant: 'destructive' })
      return
    }
    onChange(trimmed)
    setUrlInput('')
    toast({ title: 'Başarılı', description: 'Görsel URL\'si eklendi' })
  }

  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        <div className="relative w-full h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
          <Image
            src={value}
            alt="Görsel önizleme"
            fill
            className="object-cover"
            unoptimized={value.startsWith('http')}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              <Upload className="h-4 w-4" />
              Değiştir
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
              Kaldır
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('file')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${activeTab === 'file' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Upload className="h-4 w-4" />
              Dosya Yükle
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${activeTab === 'url' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LinkIcon className="h-4 w-4" />
              URL Ekle
            </button>
          </div>

          {activeTab === 'file' ? (
            <label className={`flex flex-col items-center justify-center py-10 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition-colors`}>
              {uploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-3" />
                  <p className="text-sm text-gray-600">Yükleniyor...</p>
                </>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-300 mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-1">Görsel seçmek için tıklayın</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WEBP, GIF, SVG — maks. 5MB</p>
                  {sizeHint && <p className="text-xs text-blue-500 mt-1">Önerilen boyut: {sizeHint}</p>}
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          ) : (
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); handleAddUrl() }
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Ekle
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Herhangi bir görsel URL'si girebilirsiniz</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
