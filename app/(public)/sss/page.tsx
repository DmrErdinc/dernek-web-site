import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFAQs() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: 'asc' }
  })
  return faqs
}

export default async function SSSPage() {
  const faqs = await getFAQs()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Sık Sorulan Sorular</h1>

      {faqs.length === 0 ? (
        <p className="text-center text-gray-600">Henüz soru bulunmamaktadır.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="bg-white rounded-lg shadow-md p-6 group">
              <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-600 prose" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </details>
          ))}
        </div>
      )}
    </div>
  )
}