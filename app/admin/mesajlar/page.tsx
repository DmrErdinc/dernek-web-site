'use client'

import { useEffect, useState } from 'react'

export default function MesajlarPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Messages fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      })

      if (res.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Mark as read error:', error)
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">İletişim Mesajları</h1>
        <p className="text-gray-600 mt-2">Gelen tüm mesajları görüntüleyin</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">✉️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz mesaj yok</h3>
          <p className="text-gray-600">Gelen mesajlar burada görünecek</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-lg shadow-sm p-6 ${
                !message.isRead ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>📧 {message.email}</span>
                    {message.phone && <span>📞 {message.phone}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {!message.isRead && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      Yeni
                    </span>
                  )}
                </div>
              </div>
              
              {message.subject && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Konu: </span>
                  <span className="text-sm text-gray-900">{message.subject}</span>
                </div>
              )}
              
              <div className="text-gray-700 whitespace-pre-wrap">{message.message}</div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <a
                  href={`mailto:${message.email}`}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Yanıtla
                </a>
                {!message.isRead && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Okundu İşaretle
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}