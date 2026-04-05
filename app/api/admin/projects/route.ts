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

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Projects fetch error:', error)
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

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        summary: data.summary || null,
        description: data.description,
        image: data.image || null,
        images: data.images || [],
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}