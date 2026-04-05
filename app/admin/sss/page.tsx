'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function SSSPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/admin/faqs')
      if (res.ok) {
        const data = await res.json()
        setFaqs(data)
      }
    } catch (error) {
      console.error('FAQs fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchFAQs()
      }
    } catch (error) {
      console.error('Delete error:', error)
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sık Sorulan Sorular</h1>
          <p className="text-gray-600 mt-2">SSS'leri buradan yönetin</p>
        </div>
        <Link
          href="/admin/sss/yeni"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yeni Soru
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">❓</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz soru yok</h3>
          <p className="text-gray-600 mb-6">İlk soruyu oluşturarak başlayın</p>
          <Link
            href="/admin/sss/yeni"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Soru Oluştur
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Sıra: {faq.order}</span>
                    {faq.isPublished ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Yayında
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                        Taslak
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <Link
                    href={`/admin/sss/${faq.id}`}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900"
                  >
                    Düzenle
                  </Link>
                  <button
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(faq.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}