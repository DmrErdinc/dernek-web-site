'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { SingleImageUpload } from '@/components/admin/SingleImageUpload'

interface Category {
  id: string
  name: string
}

export default function GaleriDetayPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'yeni'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    categoryId: '',
    isPublished: false
  })

  useEffect(() => {
    fetchCategories()
    if (!isNew) fetchItem()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/gallery-categories')
      if (res.ok) setCategories(await res.json())
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error)
    }
  }

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/admin/gallery/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          categoryId: data.categoryId || '',
          isPublished: data.isPublished || false
        })
      }
    } catch (error) {
      console.error('Görsel yüklenemedi:', error)
      toast({ title: 'Hata', description: 'Görsel yüklenirken bir hata oluştu', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.image) {
      toast({ title: 'Hata', description: 'Lütfen başlık ve görsel ekleyin', variant: 'destructive' })
      return
    }

    setSaving(true)
    try {
      const url = isNew ? '/api/admin/gallery' : `/api/admin/gallery/${params.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        toast({ title: 'Başarılı', description: isNew ? 'Görsel eklendi' : 'Görsel güncellendi' })
        router.push('/admin/galeri')
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      toast({ title: 'Hata', description: 'Görsel kaydedilirken bir hata oluştu', variant: 'destructive' })
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
          {isNew ? 'Yeni Görsel' : 'Görsel Düzenle'}
        </h1>
        <p className="text-gray-600 mt-2">Galeri görseli ekleyin veya düzenleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Görsel başlığı"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Görsel açıklaması"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kategori Seçin</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <SingleImageUpload
            label="Görsel"
            required
            sizeHint="800×800 px (kare)"
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">Yayınla</label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/galeri')}
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