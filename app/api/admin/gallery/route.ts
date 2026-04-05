import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await prisma.galleryItem.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Gallery fetch error:', error)
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

    const item = await prisma.galleryItem.create({
      data: {
        title: data.title,
        description: data.description || null,
        image: data.image,
        categoryId: data.categoryId || null,
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Gallery create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}