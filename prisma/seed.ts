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

  // Criar usuário de teste
  const testUserEmail = 'test@rufinostore.com'
  const testUserPassword = 'test123456'

  const hashedUserPassword = await bcrypt.hash(testUserPassword, 10)

  const testUser = await prisma.user.upsert({
    where: { email: testUserEmail },
    update: {},
    create: {
      email: testUserEmail,
      password_hash: hashedUserPassword,
      name: 'Usuário Teste',
      username: 'usuario_teste',
      bio: 'Conta de teste para desenvolvimento',
      is_active: true,
    },
  })

  console.log('✅ Usuário de teste criado:', testUser.email)

  // Criar produtos de teste
  const products = await Promise.all([
    prisma.product.create({
      data: {
        user_id: testUser.id,
        title: 'E-book de Marketing Digital',
        description: 'Aprenda as melhores estratégias de marketing digital para alavancar seu negócio',
        price_brl: 47.90,
        price_usd: 9.90,
        file_url: 'https://example.com/ebook-marketing.pdf',
        cover_image_url: 'https://via.placeholder.com/300x400',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: testUser.id,
        title: 'Curso de Programação Web',
        description: 'Do zero ao profissional em desenvolvimento web',
        price_brl: 197.00,
        price_usd: 39.90,
        file_url: 'https://example.com/curso-web',
        cover_image_url: 'https://via.placeholder.com/300x400',
        is_active: true,
      },
    }),
    prisma.product.create({
      data: {
        user_id: testUser.id,
        title: 'Templates de Design',
        description: 'Pack com 50 templates profissionais para seus projetos',
        price_brl: 97.00,
        price_usd: 19.90,
        file_url: 'https://example.com/templates.zip',
        cover_image_url: 'https://via.placeholder.com/300x400',
        is_active: true,
      },
    }),
  ])

  console.log(`✅ ${products.length} produtos criados`)

  // Criar algumas vendas de teste
  const sales = await Promise.all([
    prisma.sale.create({
      data: {
        product_id: products[0].id,
        user_id: testUser.id,
        buyer_email: 'comprador1@example.com',
        buyer_name: 'João Silva',
        amount: 47.90,
        currency: 'BRL',
        payment_method: 'stripe',
        payment_status: 'PAID',
        stripe_payment_id: 'pi_test_123456',
        commission_amount: 4.79, // 10% de comissão
      },
    }),
    prisma.sale.create({
      data: {
        product_id: products[1].id,
        user_id: testUser.id,
        buyer_email: 'comprador2@example.com',
        buyer_name: 'Maria Santos',
        amount: 197.00,
        currency: 'BRL',
        payment_method: 'mercadopago',
        payment_status: 'PAID',
        mp_payment_id: 'mp_test_789012',
        commission_amount: 19.70, // 10% de comissão
      },
    }),
    prisma.sale.create({
      data: {
        product_id: products[0].id,
        user_id: testUser.id,
        buyer_email: 'comprador3@example.com',
        buyer_name: 'Pedro Costa',
        amount: 47.90,
        currency: 'BRL',
        payment_method: 'stripe',
        payment_status: 'PENDING',
        commission_amount: 4.79,
      },
    }),
  ])

  console.log(`✅ ${sales.length} vendas criadas`)

  console.log('🎉 Seed concluído com sucesso!')
  console.log('\n📝 Credenciais de acesso:')
  console.log(`Admin: ${adminEmail} / ${adminPassword}`)
  console.log(`User: ${testUserEmail} / ${testUserPassword}`)
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