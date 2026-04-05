'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface LegalPage {
  id: string
  page: string
  title: string
  content: string
  updatedAt: string
}

export default function YasalMetinlerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<LegalPage[]>([])

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/legal')
      if (res.ok) {
        const data = await res.json()
        setPages(data)
      }
    } catch (error) {
      console.error('Yasal metinler yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Yasal metinler yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const getPageTitle = (page: string) => {
    switch (page) {
      case 'privacy':
        return 'Gizlilik Politikası'
      case 'kvkk':
        return 'KVKK Aydınlatma Metni'
      default:
        return page
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Yasal Metinler</h1>
        <p className="text-gray-600 mt-2">Gizlilik Politikası ve KVKK metinlerini yönetin</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gizlilik Politikası */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Gizlilik Politikası</h2>
              <p className="text-sm text-gray-600 mt-1">
                {pages.find(p => p.page === 'privacy') 
                  ? `Son güncelleme: ${new Date(pages.find(p => p.page === 'privacy')!.updatedAt).toLocaleDateString('tr-TR')}`
                  : 'Henüz oluşturulmadı'}
              </p>
            </div>
            <Link
              href="/admin/yasal-metinler/gizlilik-politikasi"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Düzenle
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Kullanıcıların kişisel verilerinin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi veren metin.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="/gizlilik-politikasi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Sayfayı Görüntüle →
            </a>
          </div>
        </div>

        {/* KVKK */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">KVKK Aydınlatma Metni</h2>
              <p className="text-sm text-gray-600 mt-1">
                {pages.find(p => p.page === 'kvkk') 
                  ? `Son güncelleme: ${new Date(pages.find(p => p.page === 'kvkk')!.updatedAt).toLocaleDateString('tr-TR')}`
                  : 'Henüz oluşturulmadı'}
              </p>
            </div>
            <Link
              href="/admin/yasal-metinler/kvkk"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Düzenle
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanan aydınlatma metni.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="/kvkk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Sayfayı Görüntüle →
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Önemli Not</h3>
            <p className="text-sm text-yellow-800">
              Yasal metinleri güncelledikten sonra mutlaka bir hukuk uzmanına kontrol ettirin. 
              Bu metinler yasal sorumluluk içerir ve derneğinizin özel durumuna göre özelleştirilmelidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}