'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface BoardMember {
  id: string
  name: string
  position: string
  image: string | null
  gender: string
  bio: string | null
  isPublished: boolean
  order: number
}

export default function YonetimKuruluPage() {
  const router = useRouter()
  const [members, setMembers] = useState<BoardMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/board-members')
      if (res.ok) {
        const data = await res.json()
        setMembers(data)
      }
    } catch (error) {
      console.error('Yönetim kurulu yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Yönetim kurulu yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu üyeyi silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/board-members/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Üye silindi'
        })
        fetchMembers()
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      toast({
        title: 'Hata',
        description: 'Üye silinirken bir hata oluştu',
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
          <h1 className="text-3xl font-bold text-gray-900">Yönetim Kurulu</h1>
          <p className="text-gray-600 mt-2">Yönetim kurulu üyelerini yönetin</p>
        </div>
        <Link
          href="/admin/yonetim-kurulu/yeni"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Üye
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">Henüz üye eklenmemiş</p>
          <Link
            href="/admin/yonetim-kurulu/yeni"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            İlk Üyeyi Ekle
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-64 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center">
                    {member.gender === 'female' ? (
                      <svg className="w-32 h-32 text-blue-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-32 h-32 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {member.gender === 'female' ? 'Kadın' : 'Erkek'}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mt-1">{member.position}</p>
                {member.bio && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{member.bio}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    member.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.isPublished ? 'Yayında' : 'Taslak'}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/yonetim-kurulu/${member.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}