'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface LegalPageData {
  id?: string
  page: string
  title: string
  content: string
}

export default function KVKKEditPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<LegalPageData>({
    page: 'kvkk',
    title: 'KVKK Aydınlatma Metni',
    content: ''
  })

  useEffect(() => {
    fetchPage()
  }, [])

  const fetchPage = async () => {
    try {
      const res = await fetch('/api/admin/legal?page=kvkk')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setFormData(data)
        }
      }
    } catch (error) {
      console.error('Sayfa yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'KVKK Aydınlatma Metni güncellendi'
        })
        router.push('/admin/yasal-metinler')
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      toast({
        title: 'Hata',
        description: 'Kayıt sırasında bir hata oluştu',
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri Dön
        </button>
        <h1 className="text-3xl font-bold text-gray-900">KVKK Aydınlatma Metni Düzenle</h1>
        <p className="text-gray-600 mt-2">6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metnini düzenleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="KVKK aydınlatma metnini buraya yazın..."
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Metin düz metin olarak kaydedilir. Paragraflar için boş satır bırakın.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">KVKK Uyarısı</h3>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>KVKK aydınlatma metni yasal zorunluluktur</li>
                  <li>Mutlaka bir hukuk uzmanı veya KVKK danışmanına kontrol ettirin</li>
                  <li>Derneğinizin veri işleme faaliyetlerine göre özelleştirin</li>
                  <li>Veri Sorumlusu bilgilerini eksiksiz belirtin</li>
                  <li>İlgili kişi hakları açıkça belirtilmelidir</li>
                  <li>Düzenli olarak güncelleyin</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">KVKK Aydınlatma Metninde Bulunması Gerekenler</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Veri sorumlusunun kimliği</li>
                  <li>Kişisel verilerin hangi amaçla işleneceği</li>
                  <li>Kişisel verilerin kimlere ve hangi amaçla aktarılabileceği</li>
                  <li>Kişisel veri toplamanın yöntemi ve hukuki sebebi</li>
                  <li>İlgili kişinin hakları (KVKK Madde 11)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              İptal
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}