import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('FAQs fetch error:', error)
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

    const faq = await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        order: data.order || 0,
        isPublished: data.isPublished || false
      }
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error('FAQ create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}