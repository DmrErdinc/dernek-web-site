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

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: {
        isRead: data.isRead
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('Message update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}