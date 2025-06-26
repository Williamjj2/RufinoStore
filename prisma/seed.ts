import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar Admin padrão
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rufinostore.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456'

  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password_hash: hashedAdminPassword,
      name: 'Administrador',
      role: 'owner',
    },
  })

  console.log('✅ Admin criado:', admin.email)

  // Criar loja modelo do Buba Rufino
  const bubaEmail = 'buba@rufinostore.com'
  const bubaPassword = 'buba123456'

  const hashedBubaPassword = await bcrypt.hash(bubaPassword, 10)

  const bubaUser = await prisma.user.upsert({
    where: { email: bubaEmail },
    update: {},
    create: {
      email: bubaEmail,
      password_hash: hashedBubaPassword,
      name: 'Buba Rufino',
      username: 'bubarufino',
      bio: '📸 Fotógrafa profissional | 💰 Marketing digital | 🎯 Ensino criadores a monetizarem | Fort Lauderdale 🌴',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop&crop=face&auto=format&q=90',
      is_active: true,
    },
  })

  console.log('✅ Buba Rufino criado:', bubaUser.email)

  // Criar configurações de loja para o Buba Rufino
  const storeSettings = await prisma.userStoreSettings.upsert({
    where: { user_id: bubaUser.id },
    update: {},
    create: {
      user_id: bubaUser.id,
      template_id: 'minimal', // Template limpo e legível estilo Stan Store
      primary_color: '#3B82F6', // Azul moderno
      accent_color: '#1D4ED8',  // Azul mais escuro
      background_color: '#FFFFFF', // Fundo branco limpo
    },
  })

  console.log('✅ Configurações de loja criadas para Buba')

  // Criar 5 produtos focados de Buba Rufino
  const bubaProducts = await Promise.all([
    prisma.product.create({
      data: {
        user_id: bubaUser.id,
        title: '📸 Curso Completo de Fotografia Profissional',
        description: 'Aprenda todas as técnicas que uso para criar fotos incríveis que vendem. Do básico ao avançado, com lighting, composição e edição no Lightroom.',
        price_brl: 497.00,
        price_usd: 97.00,
        file_url: 'https://example.com/curso-fotografia-buba',
        cover_image_url: 'https://images.unsplash.com/photo-1554048612-b6a482b6dc35?w=500&h=600&fit=crop&auto=format&q=80',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: bubaUser.id,
        title: '💰 Sistema Make Money With Buba',
        description: 'Meu método completo para monetizar suas habilidades online. Como transformei minha paixão por fotografia em um negócio de 6 figuras.',
        price_brl: 997.00,
        price_usd: 197.00,
        file_url: 'https://example.com/make-money-sistema',
        cover_image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=600&fit=crop&auto=format&q=80',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: bubaUser.id,
        title: '🎨 Pack de Presets Lightroom - Signature Style',
        description: '25 presets exclusivos que uso em todos os meus trabalhos. Transforme suas fotos com o estilo único que me tornou conhecido em Fort Lauderdale.',
        price_brl: 97.00,
        price_usd: 19.90,
        file_url: 'https://example.com/presets-lightroom',
        cover_image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e4d40407?w=500&h=600&fit=crop&auto=format&q=80',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: bubaUser.id,
        title: '📱 Mentoria Instagram para Fotógrafos',
        description: 'Como consegui +100k seguidores autênticos e clientes premium usando estratégias específicas para fotógrafos. Inclui templates e cronograma de posts.',
        price_brl: 297.00,
        price_usd: 59.90,
        file_url: 'https://example.com/mentoria-instagram',
        cover_image_url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=600&fit=crop&auto=format&q=80',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: bubaUser.id,
        title: '🔥 E-book: Segredos da Fotografia Comercial',
        description: 'Tudo que aprendi fotografando para marcas em Miami e Fort Lauderdale. Contratos, preços, negociação e como fechar clientes de alto valor.',
        price_brl: 147.00,
        price_usd: 29.90,
        file_url: 'https://example.com/ebook-fotografia-comercial',
        cover_image_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&h=600&fit=crop&auto=format&q=80',
        is_active: true,
      },
    }),
  ])

  console.log(`✅ ${bubaProducts.length} produtos de Buba Rufino criados`)

  // Criar algumas vendas realistas para Buba
  const bubaSales = await Promise.all([
    prisma.sale.create({
      data: {
        product_id: bubaProducts[0].id, // Curso de Fotografia
        user_id: bubaUser.id,
        buyer_email: 'maria.photographer@gmail.com',
        buyer_name: 'Maria Silva',
        amount: 497.00,
        currency: 'BRL',
        payment_method: 'stripe',
        payment_status: 'PAID',
        stripe_payment_id: 'pi_buba_123456',
        commission_amount: 49.70,
      },
    }),
    prisma.sale.create({
      data: {
        product_id: bubaProducts[1].id, // Make Money System
        user_id: bubaUser.id,
        buyer_email: 'carlos.creator@hotmail.com',
        buyer_name: 'Carlos Oliveira',
        amount: 997.00,
        currency: 'BRL',
        payment_method: 'mercadopago',
        payment_status: 'PAID',
        mp_payment_id: 'mp_buba_789012',
        commission_amount: 99.70,
      },
    }),
    prisma.sale.create({
      data: {
        product_id: bubaProducts[2].id, // Presets
        user_id: bubaUser.id,
        buyer_email: 'ana.photos@yahoo.com',
        buyer_name: 'Ana Costa',
        amount: 97.00,
        currency: 'BRL',
        payment_method: 'stripe',
        payment_status: 'PAID',
        commission_amount: 9.70,
      },
    }),
    prisma.sale.create({
      data: {
        product_id: bubaProducts[3].id, // Mentoria Instagram
        user_id: bubaUser.id,
        buyer_email: 'joao.marketing@gmail.com',
        buyer_name: 'João Santos',
        amount: 297.00,
        currency: 'BRL',
        payment_method: 'stripe',
        payment_status: 'PAID',
        commission_amount: 29.70,
      },
    }),
    prisma.sale.create({
      data: {
        product_id: bubaProducts[4].id, // E-book
        user_id: bubaUser.id,
        buyer_email: 'luciana.business@outlook.com',
        buyer_name: 'Luciana Ferreira',
        amount: 147.00,
        currency: 'BRL',
        payment_method: 'mercadopago',
        payment_status: 'PAID',
        commission_amount: 14.70,
      },
    }),
  ])

  console.log(`✅ ${bubaSales.length} vendas de Buba Rufino criadas`)

  console.log('🎉 Seed concluído com sucesso!')
  console.log('\n📝 Credenciais de acesso:')
  console.log(`Admin: ${adminEmail} / ${adminPassword}`)
  console.log(`Buba Rufino: ${bubaEmail} / ${bubaPassword}`)
  console.log('\n🔗 Loja modelo: http://localhost:3000/bubarufino')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  }) 