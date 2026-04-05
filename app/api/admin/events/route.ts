import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        eventDate: 'desc'
      }
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Events fetch error:', error)
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

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        eventDate: new Date(data.eventDate),
        eventTime: data.eventTime,
        location: data.location,
        image: data.image || null,
        images: data.images || [],
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Event create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}