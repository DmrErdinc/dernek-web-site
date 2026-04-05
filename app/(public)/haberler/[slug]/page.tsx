import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { ImageGallery } from '@/components/ui/image-gallery'
import { BackButton } from '@/components/BackButton'

export const dynamic = 'force-dynamic'

async function getNews(slug: string) {
  return prisma.news.findUnique({ where: { slug }, include: { category: true } })
}

export default async function HaberDetayPage({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug)

  if (!news || !news.isPublished) {
    notFound()
  }

  const allImages = (news as any).images && (news as any).images.length > 0
    ? (news as any).images
    : news.image
    ? [news.image]
    : []

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <article className="max-w-4xl mx-auto">
        <BackButton />
        {news.category && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
            {news.category.name}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>

        <div className="flex items-center text-gray-600 mb-6 md:mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(news.publishedAt || news.createdAt)}
        </div>

        {news.summary && (
          <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 font-medium">{news.summary}</p>
        )}

        {allImages.length > 0 && (
          <div className="mb-8">
            <ImageGallery images={allImages} alt={news.title} />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{news.content}</p>
        </div>
      </article>
    </div>
  )
}