import { prisma } from '@/lib/prisma'
import { GalleryGrid } from './GalleryGrid'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function GaleriPage() {
  const items = await prisma.galleryItem.findMany({
    where: { isPublished: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Galeri</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Henüz galeri öğesi bulunmamaktadır.</p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  )
}