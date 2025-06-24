import { v2 as cloudinary } from 'cloudinary'

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  secure_url: string
  public_id: string
  format: string
  resource_type: string
  bytes: number
  width?: number
  height?: number
}

export async function uploadToCloudinary(
  file: Buffer,
  options: {
    folder: string
    resource_type?: 'auto' | 'image' | 'video' | 'raw'
    allowed_formats?: string[]
    max_file_size?: number
  }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder,
      resource_type: options.resource_type || 'auto',
      allowed_formats: options.allowed_formats,
      max_file_size: options.max_file_size,
      access_mode: 'authenticated', // Arquivos privados
      type: 'authenticated', // Requer autenticação para acessar
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error: any, result: any) => {
        if (error) {
          reject(new Error(error.message))
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
          })
        } else {
          reject(new Error('Upload falhou'))
        }
      }
    )

    uploadStream.end(file)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      type: 'authenticated',
      invalidate: true,
    })
    return result.result === 'ok'
  } catch (error) {
    console.error('Erro ao deletar arquivo do Cloudinary:', error)
    return false
  }
}

// Gerar URL assinada para download seguro
export function generateSignedUrl(publicId: string, options?: {
  expires_at?: number
  attachment?: boolean
  resource_type?: string
}): string {
  const defaultExpiry = Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas

  return cloudinary.url(publicId, {
    type: 'authenticated',
    sign_url: true,
    expires_at: options?.expires_at || defaultExpiry,
    attachment: options?.attachment || false,
    resource_type: options?.resource_type || 'auto',
  })
}

export default cloudinary 