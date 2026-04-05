import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const heroSection = await prisma.heroSection.update({
      where: { id: params.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        images: data.images || [],
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        isActive: data.isActive,
        order: data.order
      }
    })

    return NextResponse.json(heroSection)
  } catch (error) {
    console.error('Hero section update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.heroSection.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hero section delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}