'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  type: 'product' | 'cover'
  value?: string
  onChange: (url: string) => void
  onError?: (error: string) => void
  disabled?: boolean
}

export function FileUpload({ 
  type, 
  value, 
  onChange, 
  onError,
  disabled = false 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const accept: any = type === 'cover' 
    ? { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }
    : { 
        'application/pdf': ['.pdf'],
        'application/zip': ['.zip'],
        'video/mp4': ['.mp4'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
      }

  const maxSize = type === 'cover' ? 5 * 1024 * 1024 : 100 * 1024 * 1024

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro no upload')
      }

      onChange(data.url)
      setUploadProgress(100)
    } catch (error) {
      console.error('Erro no upload:', error)
      onError?.(error instanceof Error ? error.message : 'Erro no upload')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [type, onChange, onError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    disabled: disabled || isUploading,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]
      if (error?.code === 'file-too-large') {
        onError?.(`Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`)
      } else if (error?.code === 'file-invalid-type') {
        onError?.('Tipo de arquivo não permitido')
      } else {
        onError?.(error?.message || 'Erro ao processar arquivo')
      }
    }
  })

  const handleRemove = () => {
    onChange('')
  }

  if (value && !isUploading) {
    return (
      <div className="relative">
        {type === 'cover' ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={value} 
              alt="Capa do produto"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 border rounded-lg bg-gray-50">
            <File className="h-8 w-8 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium">Arquivo carregado</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative cursor-pointer transition-colors',
        'border-2 border-dashed rounded-lg p-6',
        'hover:border-gray-400',
        isDragActive && 'border-primary bg-primary/5',
        isUploading && 'cursor-not-allowed opacity-50',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <p className="text-sm text-gray-600">Enviando... {uploadProgress}%</p>
          </>
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive 
                ? 'Solte o arquivo aqui' 
                : type === 'cover'
                  ? 'Arraste a imagem de capa ou clique para selecionar'
                  : 'Arraste o arquivo do produto ou clique para selecionar'
              }
            </p>
            <p className="text-xs text-gray-500">
              {type === 'cover' 
                ? 'JPG, PNG ou WebP (máx. 5MB)'
                : 'PDF, ZIP, MP4, DOCX ou XLSX (máx. 100MB)'
              }
            </p>
          </>
        )}
      </div>
    </div>
  )
} 