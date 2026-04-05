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

    const content = await prisma.pageContent.findFirst({
      where: { page: 'about' }
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error('About content fetch error:', error)
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

    const existing = await prisma.pageContent.findFirst({
      where: { page: 'about' }
    })

    let content
    if (existing) {
      content = await prisma.pageContent.update({
        where: { id: existing.id },
        data: {
          title: data.title,
          content: data.content,
          mission: data.mission,
          vision: data.vision,
          history: data.history,
          values: data.values,
          goals: data.goals,
          images: data.images || []
        }
      })
    } else {
      content = await prisma.pageContent.create({
        data: {
          page: 'about',
          title: data.title,
          content: data.content,
          mission: data.mission,
          vision: data.vision,
          history: data.history,
          values: data.values,
          goals: data.goals,
          images: data.images || []
        }
      })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('About content update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}