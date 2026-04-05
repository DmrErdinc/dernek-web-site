import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAboutData() {
  return prisma.pageContent.findUnique({ where: { page: 'about' } })
}

export default async function HakkimizdaPage() {
  const about = await getAboutData()

  if (!about) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Hakkımızda</h1>
        <p>İçerik bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{about.title}</h1>
      
      {about.image && (
        <div className="relative w-full mb-12 rounded-lg overflow-hidden bg-gray-100" style={{ maxHeight: '28rem' }}>
          <Image
            src={about.image}
            alt={about.title || ''}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 whitespace-pre-line">{about.content}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {about.mission && (
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Misyonumuz</h2>
              <p className="text-gray-700">{about.mission}</p>
            </div>
          )}

          {about.vision && (
            <div className="bg-red-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-900">Vizyonumuz</h2>
              <p className="text-gray-700">{about.vision}</p>
            </div>
          )}
        </div>

        {about.values && (
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Değerlerimiz</h2>
            <p className="text-gray-700 whitespace-pre-line">{about.values}</p>
          </div>
        )}
      </div>
    </div>
  )
}