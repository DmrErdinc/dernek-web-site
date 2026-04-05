'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { MultiImageUpload } from '@/components/admin/MultiImageUpload'
import { Trash2, Plus } from 'lucide-react'

export default function SiteAyarlariPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)
  const [heroSections, setHeroSections] = useState<any[]>([])
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    logo: '',
    favicon: '',
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
    copyrightText: '',
    disabledPages: [] as string[]
  })
  const [mapData, setMapData] = useState({
    mapLatitude: '',
    mapLongitude: '',
    mapZoom: 15
  })
  const [pwData, setPwData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    fetchSettings()
    fetchHeroSections()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setFormData({
            siteName: data.siteName || '',
            siteDescription: data.siteDescription || '',
            logo: data.logo || '',
            favicon: data.favicon || '',
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            whatsappNumber: data.whatsappNumber || '',
            facebookUrl: data.facebookUrl || '',
            twitterUrl: data.twitterUrl || '',
            instagramUrl: data.instagramUrl || '',
            youtubeUrl: data.youtubeUrl || '',
            linkedinUrl: data.linkedinUrl || '',
            copyrightText: data.copyrightText || '',
            disabledPages: data.disabledPages || []
          })
          setMapData({
            mapLatitude: data.mapLatitude || '',
            mapLongitude: data.mapLongitude || '',
            mapZoom: data.mapZoom || 15
          })
          if (data.logo) setLogoPreview(data.logo)
          if (data.favicon) setFaviconPreview(data.favicon)
        }
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error)
      toast({
        title: 'Hata',
        description: 'Ayarlar yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchHeroSections = async () => {
    try {
      const res = await fetch('/api/admin/hero')
      if (res.ok) {
        const data = await res.json()
        setHeroSections(data)
      }
    } catch (error) {
      console.error('Hero sections yüklenemedi:', error)
    }
  }

  const addHeroSection = () => {
    setHeroSections([...heroSections, {
      id: `new-${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      images: [],
      buttonText: '',
      buttonLink: '',
      isActive: true,
      order: heroSections.length,
      isNew: true
    }])
  }

  const updateHeroSection = (index: number, field: string, value: any) => {
    const updated = [...heroSections]
    updated[index] = { ...updated[index], [field]: value }
    setHeroSections(updated)
  }

  const deleteHeroSection = async (index: number) => {
    const section = heroSections[index]
    if (section.isNew) {
      setHeroSections(heroSections.filter((_, i) => i !== index))
      return
    }

    if (!confirm('Bu hero section\'ı silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/hero/${section.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setHeroSections(heroSections.filter((_, i) => i !== index))
        toast({
          title: 'Başarılı',
          description: 'Hero section silindi'
        })
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      toast({
        title: 'Hata',
        description: 'Hero section silinirken bir hata oluştu',
        variant: 'destructive'
      })
    }
  }

  const saveHeroSections = async () => {
    try {
      for (const section of heroSections) {
        if (section.isNew) {
          const { isNew, ...data } = section
          await fetch('/api/admin/hero', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
        } else {
          await fetch(`/api/admin/hero/${section.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(section)
          })
        }
      }
      
      toast({
        title: 'Başarılı',
        description: 'Hero section\'lar güncellendi'
      })
      
      await fetchHeroSections()
    } catch (error) {
      console.error('Kayıt hatası:', error)
      toast({
        title: 'Hata',
        description: 'Hero section\'lar kaydedilirken bir hata oluştu',
        variant: 'destructive'
      })
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Hata',
        description: 'Geçersiz dosya tipi. Sadece JPG, PNG, WEBP, GIF ve SVG dosyaları yüklenebilir.',
        variant: 'destructive'
      })
      e.target.value = ''
      return
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast({
        title: 'Hata',
        description: 'Dosya boyutu 5MB\'dan küçük olmalıdır.',
        variant: 'destructive'
      })
      e.target.value = ''
      return
    }

    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (res.ok) {
        const data = await res.json()
        if (type === 'logo') {
          setFormData(prev => ({ ...prev, logo: data.url }))
          setLogoPreview(data.url)
        } else {
          setFormData(prev => ({ ...prev, favicon: data.url }))
          setFaviconPreview(data.url)
        }
        toast({
          title: 'Başarılı',
          description: 'Görsel yüklendi'
        })
      } else {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Yükleme başarısız')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Görsel yüklenirken bir hata oluştu',
        variant: 'destructive'
      })
      e.target.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...mapData })
      })

      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Site ayarları güncellendi'
        })
        router.refresh()
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      toast({
        title: 'Hata',
        description: 'Ayarlar kaydedilirken bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (pwData.newPassword !== pwData.confirmPassword) {
      setPwError('Yeni şifreler eşleşmiyor')
      return
    }
    if (pwData.newPassword.length < 6) {
      setPwError('Yeni şifre en az 6 karakter olmalıdır')
      return
    }
    setPwSaving(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwData.currentPassword, newPassword: pwData.newPassword })
      })
      const data = await res.json()
      if (res.ok) {
        toast({ title: 'Başarılı', description: 'Şifreniz güncellendi' })
        setPwData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        setPwError(data.error || 'Şifre değiştirilemedi')
      }
    } catch {
      setPwError('Bir hata oluştu')
    } finally {
      setPwSaving(false)
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="text-gray-600 mt-2">Site bilgilerini ve iletişim ayarlarını yönetin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Genel Bilgiler */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Genel Bilgiler</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Adı
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ölümsüz Kahramanlar Derneği"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Açıklaması
              </label>
              <textarea
                value={formData.siteDescription}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Site açıklaması..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {logoPreview && (
                  <div className="mt-4 relative w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={logoPreview}
                      alt="Logo"
                      width={200}
                      height={80}
                      style={{ width: 'auto', height: 'auto', maxWidth: '200px', maxHeight: '80px' }}
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Önerilen boyut: 200x80px
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon (Sekme İkonu)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'favicon')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {faviconPreview && (
                  <div className="mt-4 relative w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={faviconPreview}
                      alt="Favicon"
                      width={32}
                      height={32}
                      style={{ width: 'auto', height: 'auto', maxWidth: '32px', maxHeight: '32px' }}
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Önerilen boyut: 32x32px veya 64x64px
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">İletişim Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+90 555 123 45 67"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="info@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tam adres..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Numarası
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="905551234567 (ülke kodu ile, boşluksuz)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Örnek: 905551234567 (90 ülke kodu, sonra numara)
              </p>
            </div>
          </div>
        </div>

        {/* Harita Konumu */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Harita Konumu</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enlem (Latitude)
                </label>
                <input
                  type="text"
                  value={mapData.mapLatitude}
                  onChange={(e) => setMapData({ ...mapData, mapLatitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="41.0082"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boylam (Longitude)
                </label>
                <input
                  type="text"
                  value={mapData.mapLongitude}
                  onChange={(e) => setMapData({ ...mapData, mapLongitude: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="28.9784"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yakınlaştırma (Zoom)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={mapData.mapZoom}
                  onChange={(e) => setMapData({ ...mapData, mapZoom: parseInt(e.target.value) || 15 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Konum Nasıl Bulunur?</strong>
              </p>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Google Maps'te konumunuzu bulun</li>
                <li>Konuma sağ tıklayın ve koordinatları kopyalayın</li>
                <li>İlk sayı Enlem (Latitude), ikinci sayı Boylam (Longitude)'dur</li>
                <li>Örnek: 41.0082, 28.9784</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sosyal Medya Hesapları</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>
        </div>

        {/* Hero Section Yönetimi */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Anasayfa Hero Section</h2>
            <button
              type="button"
              onClick={addHeroSection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Yeni Hero Section
            </button>
          </div>

          <div className="space-y-6">
            {heroSections.map((section, index) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Hero Section {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => deleteHeroSection(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateHeroSection(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Kahramanlarımızı Yaşatıyoruz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alt Başlık
                    </label>
                    <input
                      type="text"
                      value={section.subtitle || ''}
                      onChange={(e) => updateHeroSection(index, 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Alt başlık (opsiyonel)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={section.description || ''}
                      onChange={(e) => updateHeroSection(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Açıklama metni..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Görselleri (Sağa-Sola Kaydırmalı)
                    </label>
                    <MultiImageUpload
                      images={section.images || []}
                      onChange={(images: string[]) => updateHeroSection(index, 'images', images)}
                      maxImages={10}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Birden fazla görsel ekleyebilirsiniz. Görseller otomatik olarak kaydırılacaktır.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buton Metni
                      </label>
                      <input
                        type="text"
                        value={section.buttonText || ''}
                        onChange={(e) => updateHeroSection(index, 'buttonText', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bizi Tanıyın"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buton Linki
                      </label>
                      <input
                        type="text"
                        value={section.buttonLink || ''}
                        onChange={(e) => updateHeroSection(index, 'buttonLink', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="/hakkimizda"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`active-${index}`}
                      checked={section.isActive}
                      onChange={(e) => updateHeroSection(index, 'isActive', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`active-${index}`} className="text-sm font-medium text-gray-700">
                      Aktif
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {heroSections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Henüz hero section eklenmemiş. Yukarıdaki butona tıklayarak ekleyebilirsiniz.
              </div>
            )}
          </div>

          {heroSections.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={saveHeroSections}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Hero Section'ları Kaydet
              </button>
            </div>
          )}
        </div>

        {/* Sayfa Yönetimi */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sayfa Yönetimi</h2>
          <p className="text-sm text-gray-500 mb-5">Pasif ettiğiniz sayfalar menüden ve anasayfadan gizlenir.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { slug: 'hakkimizda', label: 'Hakkımızda' },
              { slug: 'faaliyetler', label: 'Faaliyetler' },
              { slug: 'haberler', label: 'Haberler' },
              { slug: 'etkinlikler', label: 'Etkinlikler' },
              { slug: 'galeri', label: 'Galeri' },
              { slug: 'yonetim', label: 'Yönetim' },
              { slug: 'bagis', label: 'Bağış' },
              { slug: 'iletisim', label: 'İletişim' },
            ].map(({ slug, label }) => {
              const isDisabled = formData.disabledPages.includes(slug)
              return (
                <div
                  key={slug}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${isDisabled ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <span className={`text-sm font-medium ${isDisabled ? 'text-red-600 line-through' : 'text-gray-800'}`}>{label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = isDisabled
                        ? formData.disabledPages.filter(p => p !== slug)
                        : [...formData.disabledPages, slug]
                      setFormData({ ...formData, disabledPages: updated })
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isDisabled ? 'bg-red-400' : 'bg-green-500'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isDisabled ? 'translate-x-1' : 'translate-x-6'}`} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Telif Hakkı */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Footer</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telif Hakkı Metni
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=" 2024 Ölümsüz Kahramanlar Derneği. Tüm hakları saklıdır."
            />
            <p className="text-xs text-gray-500 mt-1">Sitenin alt kısmında görünen telif hakkı metni</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>

      {/* Şifre Değiştir */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Şifre Değiştir</h2>
        <p className="text-sm text-gray-500 mb-4">Admin paneli giriş şifrenizi güncelleyin</p>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
            <input
              type="password"
              value={pwData.currentPassword}
              onChange={(e) => setPwData({ ...pwData, currentPassword: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
            <input
              type="password"
              value={pwData.newPassword}
              onChange={(e) => setPwData({ ...pwData, newPassword: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="En az 6 karakter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              value={pwData.confirmPassword}
              onChange={(e) => setPwData({ ...pwData, confirmPassword: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          {pwError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{pwError}</p>
          )}
          <button
            type="submit"
            disabled={pwSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pwSaving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
      </div>
    </div>
  )
}