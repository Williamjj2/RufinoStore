import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from '@/lib/validations/product'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as 'product' | 'cover'

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 400 }
      )
    }

    if (!type || !['product', 'cover'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo inválido' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    const allowedTypes = ALLOWED_FILE_TYPES[type]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Tipo de arquivo não permitido',
          allowedTypes 
        },
        { status: 400 }
      )
    }

    // Validar tamanho
    const maxSize = MAX_FILE_SIZES[type]
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          error: `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB` 
        },
        { status: 400 }
      )
    }

    // Converter arquivo para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Fazer upload para Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, {
      folder: `rufinostore/${session.user.id}/${type}s`,
      resource_type: type === 'cover' ? 'image' : 'auto',
      allowed_formats: type === 'cover' 
        ? ['jpg', 'jpeg', 'png', 'webp']
        : ['pdf', 'zip', 'mp4', 'docx', 'xlsx'],
      max_file_size: maxSize
    })

    return NextResponse.json({
      message: 'Upload realizado com sucesso',
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      size: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height
    })
    
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao fazer upload',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Configurar tamanho máximo da requisição
export const config = {
  api: {
    bodyParser: false,
  },
} 