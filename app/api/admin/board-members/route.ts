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

    const members = await prisma.boardMember.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error('Board members fetch error:', error)
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

    const member = await prisma.boardMember.create({
      data: {
        name: data.name,
        position: data.position,
        bio: data.bio || null,
        image: data.image || null,
        gender: data.gender || 'male',
        order: data.order || 0,
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('Board member create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}