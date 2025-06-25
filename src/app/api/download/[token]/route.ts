import { NextRequest, NextResponse } from 'next/server'
import { verifyDownloadToken } from '@/lib/payments'
import { getProductById } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 400 }
      )
    }

    // Verify and decode the download token
    let tokenData
    try {
      tokenData = verifyDownloadToken(token)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 401 }
      )
    }

    // Get product details to verify the file URL
    const product = getProductById(tokenData.productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Verify that the token's file URL matches the product's current file URL
    if (tokenData.fileUrl !== product.file_url) {
      return NextResponse.json(
        { error: 'Download link is no longer valid' },
        { status: 410 }
      )
    }

    // In a real implementation, you would:
    // 1. Fetch the file from your storage (Cloudinary, S3, etc.)
    // 2. Stream it directly to the user
    // 3. Log the download for analytics
    
    // For this demo, we'll redirect to the file URL
    // In production, you should stream the file directly for security
    try {
      // Log the download (optional)
      console.log(`Download initiated: Product ${tokenData.productId} by ${tokenData.buyerEmail}`)
      
      // In production, you would:
      // const fileResponse = await fetch(product.file_url)
      // const fileBuffer = await fileResponse.arrayBuffer()
      // return new Response(fileBuffer, {
      //   headers: {
      //     'Content-Type': 'application/octet-stream',
      //     'Content-Disposition': `attachment; filename="${product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip"`,
      //   },
      // })

      // For demo purposes, redirect to the file URL
      return NextResponse.redirect(product.file_url)
      
    } catch (error) {
      console.error('Error serving file:', error)
      return NextResponse.json(
        { error: 'Failed to serve file' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
} 