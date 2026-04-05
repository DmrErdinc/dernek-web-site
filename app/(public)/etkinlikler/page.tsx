import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getEvents() {
  return prisma.event.findMany({ where: { isPublished: true }, orderBy: { eventDate: 'desc' } })
}

export default async function EtkinliklerPage() {
  const events = await getEvents()
  const now = new Date()
  const upcoming = events.filter((e: any) => new Date(e.eventDate) >= now)
  const past = events.filter((e: any) => new Date(e.eventDate) < now)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Etkinlikler</h1>

      {upcoming.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Yaklaşan Etkinlikler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map((event) => (
              <Link
                key={event.id}
                href={`/etkinlikler/${event.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {event.image && (
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  {(event as any).summary && (
                    <p className="text-gray-600 mb-4 line-clamp-2">{(event as any).summary}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.eventDate)}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Geçmiş Etkinlikler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {past.map((event) => (
              <Link
                key={event.id}
                href={`/etkinlikler/${event.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow opacity-75"
              >
                {event.image && (
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  {(event as any).summary && (
                    <p className="text-gray-600 mb-4 line-clamp-2">{(event as any).summary}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.eventDate)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <p className="text-center text-gray-600">Henüz etkinlik bulunmamaktadır.</p>
      )}
    </div>
  )
}