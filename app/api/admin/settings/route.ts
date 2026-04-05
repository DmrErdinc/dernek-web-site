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

    const settings = await prisma.siteSettings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings fetch error:', error)
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

    // Mevcut ayarları kontrol et
    const existingSettings = await prisma.siteSettings.findFirst()

    let settings
    if (existingSettings) {
      // Güncelle
      settings = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          logo: data.logo,
          favicon: data.favicon,
          phone: data.phone,
          email: data.email,
          address: data.address,
          whatsappNumber: data.whatsappNumber,
          facebookUrl: data.facebookUrl,
          twitterUrl: data.twitterUrl,
          instagramUrl: data.instagramUrl,
          youtubeUrl: data.youtubeUrl,
          linkedinUrl: data.linkedinUrl,
          copyrightText: data.copyrightText,
          disabledPages: data.disabledPages ?? [],
          mapLatitude: data.mapLatitude,
          mapLongitude: data.mapLongitude,
          mapZoom: data.mapZoom ? Number(data.mapZoom) : 15
        }
      })
    } else {
      // Yeni oluştur
      settings = await prisma.siteSettings.create({
        data: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          logo: data.logo,
          favicon: data.favicon,
          phone: data.phone,
          email: data.email,
          address: data.address,
          whatsappNumber: data.whatsappNumber,
          facebookUrl: data.facebookUrl,
          twitterUrl: data.twitterUrl,
          instagramUrl: data.instagramUrl,
          youtubeUrl: data.youtubeUrl,
          linkedinUrl: data.linkedinUrl,
          copyrightText: data.copyrightText,
          disabledPages: data.disabledPages ?? [],
          mapLatitude: data.mapLatitude,
          mapLongitude: data.mapLongitude,
          mapZoom: data.mapZoom ? Number(data.mapZoom) : 15
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}