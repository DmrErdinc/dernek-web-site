import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProjects() {
  return prisma.project.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
}

export default async function FaaliyetlerPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Faaliyetler ve Projeler</h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600">Henüz faaliyet bulunmamaktadır.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/faaliyetler/${project.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {project.image && (
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h2>
                {project.summary && (
                  <p className="text-gray-600 line-clamp-3">{project.summary}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}