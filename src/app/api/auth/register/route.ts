import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { registerSchema } from '@/lib/validations'
import { z } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validar dados
    const validatedData = registerSchema.parse(body)
    
    // Verificar se email já existe
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }
    
    // Verificar se username já existe
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: validatedData.username }
    })
    
    if (existingUserByUsername) {
      return NextResponse.json(
        { error: 'Username já está em uso' },
        { status: 400 }
      )
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        username: validatedData.username,
        password_hash: hashedPassword,
        is_active: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        created_at: true
      }
    })
    
    return NextResponse.json(
      { 
        message: 'Usuário criado com sucesso',
        user 
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Erro ao registrar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
} 