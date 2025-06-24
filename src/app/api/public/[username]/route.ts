import { NextRequest, NextResponse } from 'next/server'
import { getUserProducts } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // Get user and products from mock data
    const result = getUserProducts(username)

    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { user, products } = result

    // Remove sensitive data from user
    const publicUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatar_url: user.avatar_url
    }

    // Return user and products
    return NextResponse.json({
      user: publicUser,
      products: products,
      total_products: products.length
    })

  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 