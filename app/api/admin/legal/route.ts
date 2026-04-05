import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    if (page) {
      const legalPage = await prisma.legalPage.findUnique({
        where: { page }
      })
      return NextResponse.json(legalPage)
    }

    const legalPages = await prisma.legalPage.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(legalPages)
  } catch (error) {
    console.error('Legal pages fetch error:', error)
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

    const existing = await prisma.legalPage.findUnique({
      where: { page: data.page }
    })

    let legalPage
    if (existing) {
      legalPage = await prisma.legalPage.update({
        where: { page: data.page },
        data: {
          title: data.title,
          content: data.content
        }
      })
    } else {
      legalPage = await prisma.legalPage.create({
        data: {
          page: data.page,
          title: data.title,
          content: data.content
        }
      })
    }

    return NextResponse.json(legalPage)
  } catch (error) {
    console.error('Legal page update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}