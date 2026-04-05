import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getBoardMembers() {
  const members = await prisma.boardMember.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' }
  })
  return members
}

export default async function YonetimPage() {
  const members = await getBoardMembers()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Yönetim Kurulu</h1>

      {members.length === 0 ? (
        <p className="text-center text-gray-600">Henüz yönetim kurulu üyesi bulunmamaktadır.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center">
                    {member.gender === 'female' ? (
                      <svg className="w-32 h-32 text-pink-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-32 h-32 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h2>
                <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}