import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [news, events, projects, stats] = await Promise.all([
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 3,
        include: { category: true },
      }),
      prisma.event.findMany({
        where: { 
          isPublished: true,
          eventDate: { gte: new Date() }
        },
        orderBy: { eventDate: 'asc' },
        take: 3,
      }),
      prisma.project.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      Promise.all([
        prisma.news.count({ where: { isPublished: true } }),
        prisma.event.count({ where: { isPublished: true } }),
        prisma.project.count({ where: { isPublished: true } }),
        prisma.boardMember.count({ where: { isPublished: true } }),
      ]),
    ])

    return NextResponse.json({
      news,
      events,
      projects,
      stats: {
        news: stats[0],
        events: stats[1],
        projects: stats[2],
        members: stats[3],
      },
    })
  } catch (error) {
    console.error('Home data fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0