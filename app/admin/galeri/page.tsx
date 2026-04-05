'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

interface GalleryItem {
  id: string
  title: string
  image: string
  category: {
    id: string
    name: string
  } | null
  isPublished: boolean
  createdAt: Date
}

export default function GaleriPage() {
  const router = useRouter()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/gallery')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Galeri yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Galeri yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu görseli silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Görsel silindi'
        })
        fetchItems()
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      toast({
        title: 'Hata',
        description: 'Görsel silinirken bir hata oluştu',
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galeri</h1>
          <p className="text-gray-600 mt-2">Fotoğraf galerisini yönetin</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/galeri/kategoriler"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Kategoriler
          </Link>
          <Link
            href="/admin/galeri/yeni"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Yeni Görsel
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">Henüz görsel eklenmemiş</p>
          <Link
            href="/admin/galeri/yeni"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            İlk Görseli Ekle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Link
                    href={`/admin/galeri/${item.id}`}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4 text-gray-700" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                {item.category && (
                  <p className="text-sm text-gray-500 mt-1">{item.category.name}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isPublished ? 'Yayında' : 'Taslak'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}