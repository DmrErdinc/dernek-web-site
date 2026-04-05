import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ImageGallery } from '@/components/ImageGallery'
import { BackButton } from '@/components/BackButton'

export const dynamic = 'force-dynamic'

async function getProject(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

export default async function FaaliyetDetayPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project || !project.isPublished) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <BackButton />
        {project.image && (
          <div className="relative w-full mb-8 rounded-lg overflow-hidden" style={{ maxHeight: '24rem' }}>
            <Image src={project.image} alt={project.title} fill className="object-contain" unoptimized />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        {project.summary && (
          <p className="text-xl text-gray-700 mb-8 font-medium">{project.summary}</p>
        )}

        <div className="prose prose-lg max-w-none mb-10">
          <p className="whitespace-pre-wrap">{project.description}</p>
        </div>

        {project.images && project.images.length > 0 && (
          <ImageGallery images={project.images} title={project.title} />
        )}
      </article>
    </div>
  )
}