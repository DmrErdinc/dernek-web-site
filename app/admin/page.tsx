import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  const [newsCount, eventsCount, projectsCount, messagesCount, unreadMessages] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } })
  ])

  return {
    newsCount,
    eventsCount,
    projectsCount,
    messagesCount,
    unreadMessages
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: 'Toplam Haber',
      value: stats.newsCount,
      icon: '📰',
      color: 'bg-blue-500',
      link: '/admin/haberler'
    },
    {
      title: 'Toplam Etkinlik',
      value: stats.eventsCount,
      icon: '📅',
      color: 'bg-green-500',
      link: '/admin/etkinlikler'
    },
    {
      title: 'Toplam Proje',
      value: stats.projectsCount,
      icon: '🎯',
      color: 'bg-purple-500',
      link: '/admin/projeler'
    },
    {
      title: 'Toplam Mesaj',
      value: stats.messagesCount,
      icon: '✉️',
      color: 'bg-orange-500',
      link: '/admin/mesajlar',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null
    }
  ]

  const quickLinks = [
    { title: 'Site Ayarları', icon: '⚙️', link: '/admin/ayarlar', desc: 'Site bilgilerini düzenle' },
    { title: 'Haber Ekle', icon: '➕', link: '/admin/haberler/yeni', desc: 'Yeni haber oluştur' },
    { title: 'Etkinlik Ekle', icon: '📆', link: '/admin/etkinlikler/yeni', desc: 'Yeni etkinlik oluştur' },
    { title: 'Galeri', icon: '🖼️', link: '/admin/galeri', desc: 'Galeri yönetimi' },
    { title: 'Yönetim Kurulu', icon: '👥', link: '/admin/yonetim-kurulu', desc: 'Kurul üyelerini yönet' },
    { title: 'SSS', icon: '❓', link: '/admin/sss', desc: 'Sık sorulan sorular' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
              <p className="mt-1 text-sm text-gray-600">Ölümsüz Kahramanlar Derneği</p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Siteyi Görüntüle
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              href={stat.link}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  {stat.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {stat.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">{link.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{link.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Son Haberler</h2>
              <Link href="/admin/haberler" className="text-sm text-blue-600 hover:text-blue-700">
                Tümünü Gör →
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Haberler yükleniyor...</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Son Mesajlar</h2>
              <Link href="/admin/mesajlar" className="text-sm text-blue-600 hover:text-blue-700">
                Tümünü Gör →
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Mesajlar yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}