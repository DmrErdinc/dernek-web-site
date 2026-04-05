import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface BankAccount {
  bankName?: string
  accountHolder?: string
  iban?: string
  accountNumber?: string
  swiftCode?: string
  currency?: string
}

async function getDonationInfo() {
  const info = await prisma.donationInfo.findFirst()
  return info
}

export default async function BagisPage() {
  const info = await getDonationInfo()
  const accounts: BankAccount[] = Array.isArray(info?.bankAccounts) ? (info.bankAccounts as BankAccount[]) : []

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Bağış ve Destek</h1>

      <div className="max-w-4xl mx-auto">
        {info ? (
          <>
            <div className="bg-blue-50 p-8 rounded-lg mb-10">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{info.title}</h2>
              <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: info.description }} />
            </div>

            {accounts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Banka Hesap Bilgileri</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {accounts.map((account, index) => (
                    account.bankName || account.iban ? (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            {account.bankName || 'Banka'}
                          </h3>
                          {account.currency && (
                            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                              {account.currency}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2.5 text-sm text-gray-700">
                          {account.accountHolder && (
                            <div className="flex justify-between gap-2">
                              <span className="font-medium text-gray-500 flex-shrink-0">Hesap Sahibi</span>
                              <span className="text-right">{account.accountHolder}</span>
                            </div>
                          )}
                          {account.iban && (
                            <div>
                              <span className="font-medium text-gray-500 block mb-1">IBAN</span>
                              <code className="block bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-xs font-mono break-all">
                                {account.iban}
                              </code>
                            </div>
                          )}
                          {account.accountNumber && (
                            <div className="flex justify-between gap-2">
                              <span className="font-medium text-gray-500 flex-shrink-0">Hesap No</span>
                              <span className="font-mono">{account.accountNumber}</span>
                            </div>
                          )}
                          {account.swiftCode && (
                            <div className="flex justify-between gap-2">
                              <span className="font-medium text-gray-500 flex-shrink-0">SWIFT</span>
                              <span className="font-mono">{account.swiftCode}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            )}

            {info.cryptoAddress && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-900">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Kripto Para
                </h3>
                <code className="block bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-xs font-mono break-all">
                  {info.cryptoAddress}
                </code>
              </div>
            )}

            {info.additionalInfo && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Ek Bilgiler</h3>
                <div className="prose" dangerouslySetInnerHTML={{ __html: info.additionalInfo }} />
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">Bağış bilgileri henüz eklenmemiştir.</p>
        )}
      </div>
    </div>
  )
}