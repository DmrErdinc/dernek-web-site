'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const menuItems = [
  {
    title: 'Genel',
    items: [
      { name: 'Dashboard', icon: '📊', href: '/admin' },
      { name: 'Site Ayarları', icon: '⚙️', href: '/admin/ayarlar' }
    ]
  },
  {
    title: 'İçerik Yönetimi',
    items: [
      { name: 'Haberler', icon: '📰', href: '/admin/haberler' },
      { name: 'Etkinlikler', icon: '📅', href: '/admin/etkinlikler' },
      { name: 'Projeler', icon: '🎯', href: '/admin/projeler' },
      { name: 'Galeri', icon: '🖼️', href: '/admin/galeri' }
    ]
  },
  {
    title: 'Kurumsal',
    items: [
      { name: 'Yönetim Kurulu', icon: '👥', href: '/admin/yonetim-kurulu' },
      { name: 'Hakkımızda', icon: 'ℹ️', href: '/admin/hakkimizda' },
      { name: 'Bağış Bilgileri', icon: '💰', href: '/admin/bagis' }
    ]
  },
  {
    title: 'Diğer',
    items: [
      { name: 'SSS', icon: '❓', href: '/admin/sss' },
      { name: 'Mesajlar', icon: '✉️', href: '/admin/mesajlar' },
      { name: 'Yasal Metinler', icon: '📄', href: '/admin/yasal-metinler' }
    ]
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
            ÖK
          </div>
          <div>
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <p className="text-xs text-gray-400">Ölümsüz Kahramanlar</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">Yönetici</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
        >
          <span>🚪</span>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  )
}