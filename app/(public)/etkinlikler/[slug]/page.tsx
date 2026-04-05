import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { ImageGallery } from '@/components/ImageGallery'
import { BackButton } from '@/components/BackButton'

export const dynamic = 'force-dynamic'

async function getEvent(slug: string) {
  return prisma.event.findUnique({ where: { slug } })
}

export default async function EtkinlikDetayPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  if (!event || !event.isPublished) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <BackButton />
        {event.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.eventDate)}
          </div>
          {event.location && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none mb-10">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {event.images && event.images.length > 0 && (
          <ImageGallery images={event.images} title={event.title} />
        )}
      </article>
    </div>
  )
}