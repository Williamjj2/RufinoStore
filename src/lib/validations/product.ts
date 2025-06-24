import { z } from 'zod'

const productBaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  description: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .or(z.literal('')),
  price_brl: z
    .number()
    .positive('Preço em BRL deve ser positivo')
    .optional()
    .or(z.literal(0)),
  price_usd: z
    .number()
    .positive('Preço em USD deve ser positivo')
    .optional()
    .or(z.literal(0)),
})

export const createProductSchema = productBaseSchema.refine(
  (data) => data.price_brl || data.price_usd,
  {
    message: 'Pelo menos um preço deve ser informado',
    path: ['price_brl']
  }
)

export const updateProductSchema = productBaseSchema.extend({
  is_active: z.boolean().optional()
}).refine(
  (data) => data.price_brl || data.price_usd,
  {
    message: 'Pelo menos um preço deve ser informado',
    path: ['price_brl']
  }
)

export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 100 * 1024 * 1024, // 100MB
    'Arquivo deve ter no máximo 100MB'
  ),
  type: z.enum(['product', 'cover'])
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>

// Tipos permitidos de arquivo
export const ALLOWED_FILE_TYPES = {
  product: [
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
    'video/mp4',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  cover: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]
}

export const MAX_FILE_SIZES = {
  product: 100 * 1024 * 1024, // 100MB
  cover: 5 * 1024 * 1024, // 5MB
} 