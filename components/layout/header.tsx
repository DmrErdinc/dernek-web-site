'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react'

interface SiteSettings {
  siteName?: string | null
  logo?: string | null
  phone?: string | null
  email?: string | null
  facebookUrl?: string | null
  twitterUrl?: string | null
  instagramUrl?: string | null
  disabledPages?: string[] | null
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Settings fetch error:', err))
  }, [])

  const disabled = settings?.disabledPages ?? []
  const navigation = [
    { name: 'Ana Sayfa', href: '/', slug: null },
    { name: 'Hakkımızda', href: '/hakkimizda', slug: 'hakkimizda' },
    { name: 'Faaliyetler', href: '/faaliyetler', slug: 'faaliyetler' },
    { name: 'Haberler', href: '/haberler', slug: 'haberler' },
    { name: 'Etkinlikler', href: '/etkinlikler', slug: 'etkinlikler' },
    { name: 'Galeri', href: '/galeri', slug: 'galeri' },
    { name: 'Yönetim', href: '/yonetim', slug: 'yonetim' },
    { name: 'Bağış', href: '/bagis', slug: 'bagis' },
    { name: 'İletişim', href: '/iletisim', slug: 'iletisim' },
  ].filter(item => !item.slug || !disabled.includes(item.slug))

  const socialLinks = [
    { name: 'Facebook', url: settings?.facebookUrl, icon: 'facebook' },
    { name: 'Twitter', url: settings?.twitterUrl, icon: 'twitter' },
    { name: 'Instagram', url: settings?.instagramUrl, icon: 'instagram' },
  ].filter(link => link.url) // Sadece URL'si olan linkleri göster

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex gap-4">
            {settings?.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:underline">
                <Phone className="h-4 w-4" />
                {settings.phone}
              </a>
            )}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1 hover:underline">
                <Mail className="h-4 w-4" />
                {settings.email}
              </a>
            )}
          </div>
          {socialLinks.length > 0 && (
            <div className="hidden md:flex gap-3 items-center">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {link.icon === 'facebook' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {link.icon === 'instagram' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            {settings?.logo ? (
              <Image
                src={settings.logo}
                alt={settings.siteName || 'Logo'}
                width={200}
                height={64}
                className="h-14 w-auto object-contain"
                priority
              />
            ) : (
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                ÖK
              </div>
            )}
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary leading-tight">
                {settings?.siteName || 'Ölümsüz Kahramanlar Derneği'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="lg:hidden fixed top-0 right-0 bottom-0 z-[999] w-[85vw] max-w-sm flex flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                {settings?.logo ? (
                  <img src={settings.logo} alt={settings.siteName || 'Logo'} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="font-bold text-lg text-primary">{settings?.siteName || 'Ölümsüz Kahramanlar'}</span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-150"
                >
                  <span className="font-medium">{item.name}</span>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 space-y-3">
              {settings?.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm transition-colors">
                  <Phone className="h-4 w-4" />
                  {settings.phone}
                </a>
              )}
              {socialLinks.length > 0 && (
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-primary/10 text-gray-500 hover:text-primary transition-all duration-150"
                      aria-label={link.name}
                    >
                      {link.icon === 'facebook' && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {link.icon === 'twitter' && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                      {link.icon === 'instagram' && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}