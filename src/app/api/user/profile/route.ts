import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, username, bio, phone, avatar_url } = body

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: {
            id: session.user.id
          }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Username já está em uso' },
          { status: 400 }
        )
      }
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: session.user.id
          }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email já está em uso' },
          { status: 400 }
        )
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(phone !== undefined && { phone }),
        ...(avatar_url !== undefined && { avatar_url })
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        phone: true,
        avatar_url: true
      }
    })

    return NextResponse.json({ 
      message: 'Perfil atualizado com sucesso',
      user: updatedUser 
    })

  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 