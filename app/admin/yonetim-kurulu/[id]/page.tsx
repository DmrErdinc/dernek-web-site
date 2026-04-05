'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function YonetimKuruluDetayPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'yeni'
  
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    gender: 'male',
    order: 0,
    isPublished: false
  })

  useEffect(() => {
    if (!isNew) {
      fetchMember()
    }
  }, [])

  const fetchMember = async () => {
    try {
      const res = await fetch(`/api/admin/board-members/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          name: data.name || '',
          position: data.position || '',
          bio: data.bio || '',
          image: data.image || '',
          gender: data.gender || 'male',
          order: data.order || 0,
          isPublished: data.isPublished || false
        })
        if (data.image) setImagePreview(data.image)
      }
    } catch (error) {
      console.error('Üye yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Üye yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, image: data.url }))
        setImagePreview(data.url)
        toast({
          title: 'Başarılı',
          description: 'Görsel yüklendi'
        })
      } else {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Yükleme başarısız')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Görsel yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
      e.target.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.position) {
      toast({
        title: 'Hata',
        description: 'Lütfen ad ve görev alanlarını doldurun',
        variant: 'destructive'
      })
      return
    }

    setSaving(true)

    try {
      const url = isNew ? '/api/admin/board-members' : `/api/admin/board-members/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: isNew ? 'Üye eklendi' : 'Üye güncellendi'
        })
        router.push('/admin/yonetim-kurulu')
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      toast({
        title: 'Hata',
        description: 'Üye kaydedilirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Yeni Üye' : 'Üye Düzenle'}
        </h1>
        <p className="text-gray-600 mt-2">Yönetim kurulu üyesi bilgilerini girin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ahmet Yılmaz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görev *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Başkan, Başkan Yardımcısı, Üye vb."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biyografi
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kısa biyografi..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotoğraf
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4 relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden mx-auto">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cinsiyet *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Fotoğraf yoksa temsili avatar gösterilir
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıralama
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Küçük sayılar önce görünür
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Yayınla
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/yonetim-kurulu')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}