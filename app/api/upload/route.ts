import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    // Dosya uzantısı kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Geçersiz dosya tipi. Sadece resim dosyaları yüklenebilir.' },
        { status: 400 }
      )
    }

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dosya boyutu 5MB\'dan küçük olmalıdır.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Uploads klasörünü oluştur
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `${timestamp}-${nameWithoutExt}.${ext}`
    const filepath = join(uploadsDir, filename)

    // Dosyayı kaydet
    await writeFile(filepath, buffer)

    // URL döndür
    const fileUrl = `/uploads/${filename}`

    return NextResponse.json({ 
      success: true,
      url: fileUrl,
      filename: filename
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Dosya silme endpoint'i
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Dosya adı bulunamadı' },
        { status: 400 }
      )
    }

    const filepath = join(process.cwd(), 'public', 'uploads', filename)
    
    if (existsSync(filepath)) {
      const { unlink } = await import('fs/promises')
      await unlink(filepath)
      
      return NextResponse.json({ 
        success: true,
        message: 'Dosya silindi'
      })
    } else {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Dosya silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}