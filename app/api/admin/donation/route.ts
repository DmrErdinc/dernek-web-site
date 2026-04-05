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
    const info = await prisma.donationInfo.findFirst()
    return NextResponse.json(info)
  } catch (error) {
    console.error('Donation info fetch error:', error)
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
    const existing = await prisma.donationInfo.findFirst()

    const payload = {
      title: data.title,
      description: data.description,
      bankAccounts: data.bankAccounts ?? [],
      cryptoAddress: data.cryptoAddress || null,
      additionalInfo: data.additionalInfo || null,
    }

    const info = existing
      ? await prisma.donationInfo.update({ where: { id: existing.id }, data: payload })
      : await prisma.donationInfo.create({ data: payload })

    return NextResponse.json(info)
  } catch (error) {
    console.error('Donation info update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}