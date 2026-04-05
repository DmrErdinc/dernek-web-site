import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

interface UploadResponse {
  success: boolean
  url: string
  filename: string
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Hata',
        description: 'Sadece resim dosyaları yüklenebilir (JPG, PNG, WEBP, GIF)',
        variant: 'destructive'
      })
      return null
    }

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Hata',
        description: 'Dosya boyutu 5MB\'dan küçük olmalıdır',
        variant: 'destructive'
      })
      return null
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Yükleme başarısız')
      }

      const data: UploadResponse = await res.json()
      setImageUrl(data.url)

      toast({
        title: 'Başarılı',
        description: 'Görsel yüklendi',
      })

      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Görsel yüklenemedi',
        variant: 'destructive',
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (filename: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/upload?filename=${filename}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Silme başarısız')
      }

      setImageUrl(null)
      toast({
        title: 'Başarılı',
        description: 'Görsel silindi',
      })

      return true
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Hata',
        description: 'Görsel silinemedi',
        variant: 'destructive',
      })
      return false
    }
  }

  return {
    uploading,
    imageUrl,
    uploadImage,
    deleteImage,
    setImageUrl,
  }
}