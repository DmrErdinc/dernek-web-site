'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { MultiImageUpload } from '@/components/admin/MultiImageUpload'
import { SingleImageUpload } from '@/components/admin/SingleImageUpload'

export default function EtkinlikDuzenle() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'yeni'
  
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    image: '',
    images: [] as string[],
    isPublished: false
  })

  useEffect(() => {
    if (!isNew) {
      fetchEvent()
    }
  }, [])

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/admin/events/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title,
          slug: data.slug,
          description: data.description || '',
          eventDate: data.eventDate ? new Date(data.eventDate).toISOString().split('T')[0] : '',
          eventTime: data.eventTime || '',
          location: data.location || '',
          image: data.image || '',
          images: data.images || [],
          isPublished: data.isPublished
        })
      }
    } catch (error) {
      console.error('Etkinlik yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Etkinlik yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isNew ? '/api/admin/events' : `/api/admin/events/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: isNew ? 'Etkinlik oluşturuldu' : 'Etkinlik güncellendi'
        })
        router.push('/admin/etkinlikler')
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: 'Hata',
        description: 'Etkinlik kaydedilirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/events/${params.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Etkinlik silindi'
        })
        router.push('/admin/etkinlikler')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Hata',
        description: 'Etkinlik silinirken bir hata oluştu',
        variant: 'destructive'
      })
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
          {isNew ? 'Yeni Etkinlik' : 'Etkinlik Düzenle'}
        </h1>
        <p className="text-gray-600 mt-2">Etkinlik bilgilerini girin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etkinlik başlığı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="etkinlik-url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tarih *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saat
                </label>
                <input
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konum
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etkinlik konumu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Etkinlik açıklaması..."
              />
            </div>

            <SingleImageUpload
              label="Ana Görsel (Kapak)"
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              sizeHint="1200×630 px (16:9)"
            />

            <div>
              <MultiImageUpload
                images={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                maxImages={10}
                sizeHint="1200×800 px (3:2)"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-700">
                Yayınla
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sil
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/etkinlikler')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}