'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SiteSettings {
  phone?: string | null
  email?: string | null
  address?: string | null
  facebookUrl?: string | null
  twitterUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
  linkedinUrl?: string | null
  copyrightText?: string | null
  disabledPages?: string[] | null
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Settings fetch error:', err))
  }, [])

  const socialLinks = [
    { name: 'Facebook', url: settings?.facebookUrl, icon: Facebook },
    { name: 'Twitter', url: settings?.twitterUrl, icon: Twitter },
    { name: 'Instagram', url: settings?.instagramUrl, icon: Instagram },
    { name: 'YouTube', url: settings?.youtubeUrl, icon: Youtube },
    { name: 'LinkedIn', url: settings?.linkedinUrl, icon: Linkedin },
  ].filter(link => link.url) // Sadece URL'si olan linkleri göster

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Ölümsüz Kahramanlar Derneği</h3>
            <p className="text-xs md:text-sm text-slate-300 mb-3 md:mb-4">
              Vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatıyor, 
              ailelerine destek oluyor ve gelecek nesillere bu değerleri aktarıyoruz.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a 
                      key={link.name}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      aria-label={link.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              {[{ slug: 'hakkimizda', label: 'Hakkımızda', href: '/hakkimizda' },
              { slug: 'faaliyetler', label: 'Faaliyetler', href: '/faaliyetler' },
              { slug: 'haberler', label: 'Haberler', href: '/haberler' },
              { slug: 'etkinlikler', label: 'Etkinlikler', href: '/etkinlikler' },
              { slug: 'galeri', label: 'Galeri', href: '/galeri' },
              ].filter(item => !(settings?.disabledPages ?? []).includes(item.slug)).map(item => (
                <li key={item.slug}>
                  <Link href={item.href} className="text-slate-300 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sss" className="text-slate-300 hover:text-primary transition-colors">
                  Sık Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Destek</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              {[{ slug: 'bagis', label: 'Bağış Yap', href: '/bagis' },
              { slug: 'yonetim', label: 'Yönetim Kurulu', href: '/yonetim' },
              { slug: 'iletisim', label: 'İletişim', href: '/iletisim' },
              ].filter(item => !(settings?.disabledPages ?? []).includes(item.slug)).map(item => (
                <li key={item.slug}>
                  <Link href={item.href} className="text-slate-300 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/gizlilik-politikasi" className="text-slate-300 hover:text-primary transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="text-slate-300 hover:text-primary transition-colors">
                  KVKK
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">İletişim</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
              {settings?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs md:text-sm">
                    {settings.address}
                  </span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-slate-300 hover:text-primary transition-colors text-xs md:text-sm">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-primary transition-colors text-xs md:text-sm break-all">
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="text-center text-xs md:text-sm text-slate-400">
            <p>{settings?.copyrightText || '© 2024 Ölümsüz Kahramanlar Derneği. Tüm hakları saklıdır.'}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}