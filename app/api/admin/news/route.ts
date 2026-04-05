import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const news = await prisma.news.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        image: data.image || null,
        images: data.images || [],
        categoryId: data.categoryId || null,
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('News create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}