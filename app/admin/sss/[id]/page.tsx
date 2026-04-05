'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

export default function SSSDuzenle() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'yeni'
  
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    isPublished: false
  })

  useEffect(() => {
    if (!isNew) {
      fetchFAQ()
    }
  }, [])

  const fetchFAQ = async () => {
    try {
      const res = await fetch(`/api/admin/faqs/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          question: data.question,
          answer: data.answer,
          order: data.order,
          isPublished: data.isPublished
        })
      }
    } catch (error) {
      console.error('SSS yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'SSS yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${params.id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: isNew ? 'Soru oluşturuldu' : 'Soru güncellendi'
        })
        router.push('/admin/sss')
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: 'Hata',
        description: 'Soru kaydedilirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/faqs/${params.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Soru silindi'
        })
        router.push('/admin/sss')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Hata',
        description: 'Soru silinirken bir hata oluştu',
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
          {isNew ? 'Yeni Soru' : 'Soru Düzenle'}
        </h1>
        <p className="text-gray-600 mt-2">Soru ve cevap bilgilerini girin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soru *
              </label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Soru metni"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cevap *
              </label>
              <textarea
                required
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cevap metni..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıra
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Küçük sayılar önce gösterilir
              </p>
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
              onClick={() => router.push('/admin/sss')}
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