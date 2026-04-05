'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Plus, Trash2 } from 'lucide-react'

interface BankAccount {
  id?: string
  bankName: string
  accountHolder: string
  iban: string
  accountNumber: string
  swiftCode: string
  currency: string
}

export default function BagisPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { bankName: '', accountHolder: '', iban: '', accountNumber: '', swiftCode: '', currency: 'TRY' }
  ])

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/donation')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setFormData({
            title: data.title || '',
            description: data.description || ''
          })
          
          if (Array.isArray(data.bankAccounts) && data.bankAccounts.length > 0) {
            setBankAccounts(data.bankAccounts.map((a: any) => ({
              bankName: a.bankName || '',
              accountHolder: a.accountHolder || '',
              iban: a.iban || '',
              accountNumber: a.accountNumber || '',
              swiftCode: a.swiftCode || '',
              currency: a.currency || 'TRY',
            })))
          }
        }
      }
    } catch (error) {
      console.error('Bağış bilgileri yüklenemedi:', error)
      toast({ title: 'Hata', description: 'Bağış bilgileri yüklenirken bir hata oluştu', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const formatIban = (raw: string) => {
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
    return clean.replace(/(.{4})/g, '$1 ').trim()
  }

  const updateAccount = (index: number, field: keyof BankAccount, value: string) => {
    const formatted = field === 'iban' ? formatIban(value) : value
    setBankAccounts(prev => prev.map((a, i) => i === index ? { ...a, [field]: formatted } : a))
  }

  const getIbanError = (iban: string) => {
    const clean = iban.replace(/\s/g, '')
    if (!clean) return null
    if (!/^[A-Z]{2}/.test(clean)) return 'IBAN ülke kodu ile başlamalıdır (örn: TR)'
    if (clean.length < 15) return 'IBAN çok kısa'
    if (clean.length > 34) return 'IBAN çok uzun'
    return null
  }

  const addAccount = () => setBankAccounts(prev => [
    ...prev,
    { bankName: '', accountHolder: '', iban: '', accountNumber: '', swiftCode: '', currency: 'TRY' }
  ])

  const removeAccount = (index: number) => {
    if (bankAccounts.length === 1) return
    setBankAccounts(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, bankAccounts }),
      })
      if (res.ok) {
        toast({ title: 'Başarılı', description: 'Bağış bilgileri güncellendi' })
        router.refresh()
      } else {
        throw new Error('Kayıt başarısız')
      }
    } catch (error) {
      toast({ title: 'Hata', description: 'Bağış bilgileri kaydedilirken bir hata oluştu', variant: 'destructive' })
    } finally {
      setSaving(false)
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
        <h1 className="text-3xl font-bold text-gray-900">Bağış Bilgileri</h1>
        <p className="text-gray-600 mt-2">Bağış sayfası içeriğini ve hesap bilgilerini yönetin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Genel Bilgiler */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Genel Bilgiler</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bize Destek Olun"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bağış açıklaması..."
              />
            </div>
          </div>
        </div>

        {/* Banka Hesapları */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Banka Hesapları</h2>
            <button
              type="button"
              onClick={addAccount}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus className="h-4 w-4" /> Hesap Ekle
            </button>
          </div>

          <div className="space-y-6">
            {bankAccounts.map((account, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Hesap {index + 1}</h3>
                  {bankAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAccount(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banka Adı</label>
                    <input
                      type="text"
                      value={account.bankName}
                      onChange={(e) => updateAccount(index, 'bankName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ziraat Bankası"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Para Birimi</label>
                    <select
                      value={account.currency}
                      onChange={(e) => updateAccount(index, 'currency', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="TRY">TRY - Türk Lirası</option>
                      <option value="USD">USD - Amerikan Doları</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - İngiliz Sterlini</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hesap Sahibi</label>
                    <input
                      type="text"
                      value={account.accountHolder}
                      onChange={(e) => updateAccount(index, 'accountHolder', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ölümsüz Kahramanlar Derneği"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                    <input
                      type="text"
                      value={account.iban}
                      onChange={(e) => updateAccount(index, 'iban', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono tracking-wider ${getIbanError(account.iban) ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      maxLength={42}
                    />
                    {getIbanError(account.iban) ? (
                      <p className="text-xs text-red-500 mt-1">{getIbanError(account.iban)}</p>
                    ) : account.iban ? (
                      <p className="text-xs text-green-600 mt-1">✓ Format geçerli</p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">Otomatik biçimlendirilir — Örnek: TR32 0006 1005 1978 6457 8413 26</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hesap No</label>
                    <input
                      type="text"
                      value={account.accountNumber}
                      onChange={(e) => updateAccount(index, 'accountNumber', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT Kodu <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                    <input
                      type="text"
                      value={account.swiftCode}
                      onChange={(e) => updateAccount(index, 'swiftCode', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="TCZBTR2AXXX"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
    </div>
  )
}