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

    const heroSections = await prisma.heroSection.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(heroSections)
  } catch (error) {
    console.error('Hero sections fetch error:', error)
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

    const heroSection = await prisma.heroSection.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        images: data.images || [],
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        isActive: data.isActive ?? true,
        order: data.order ?? 0
      }
    })

    return NextResponse.json(heroSection)
  } catch (error) {
    console.error('Hero section create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}