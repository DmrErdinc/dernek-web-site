import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getNews() {
  return prisma.news.findMany({
    where: { isPublished: true },
    include: { category: true },
    orderBy: { publishedAt: 'desc' }
  })
}

export default async function HaberlerPage() {
  const news = await getNews()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Haberler</h1>

      {news.length === 0 ? (
        <p className="text-center text-gray-600">Henüz haber bulunmamaktadır.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/haberler/${item.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {item.image && (
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-3">
                    {item.category.name}
                  </span>
                )}
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(item.publishedAt || item.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}