'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Lock, CreditCard, Store, Bell, Save, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    username: session?.user?.username || '',
    bio: session?.user?.bio || '',
    phone: session?.user?.phone || '',
    avatar_url: session?.user?.avatar_url || ''
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [paymentForm, setPaymentForm] = useState({
    stripe_account_id: session?.user?.stripe_account_id || '',
    mercadopago_access_token: session?.user?.mercadopago_access_token || ''
  })

  const [notificationForm, setNotificationForm] = useState({
    email_notifications: true,
    sale_notifications: true,
    weekly_reports: true
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      })

      if (response.ok) {
        await update() // Refresh session
        alert('Perfil atualizado com sucesso!')
      } else {
        alert('Erro ao atualizar perfil')
      }
    } catch (error) {
      alert('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      if (response.ok) {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        alert('Senha alterada com sucesso!')
      } else {
        alert('Erro ao alterar senha')
      }
    } catch (error) {
      alert('Erro ao alterar senha')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'password', label: 'Senha', icon: Lock },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'store', label: 'Loja', icon: Store },
    { id: 'notifications', label: 'Notificações', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username da loja
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        rufinostore.com/
                      </span>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="meuusername"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Conte um pouco sobre você e seu trabalho..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL do Avatar
                  </label>
                  <input
                    type="url"
                    value={profileForm.avatar_url}
                    onChange={(e) => setProfileForm({...profileForm, avatar_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://exemplo.com/sua-foto.jpg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Salvando...' : 'Salvar Perfil'}
                </button>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha atual
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite sua nova senha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirme sua nova senha"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </form>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CreditCard className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Configuração de Pagamentos</h3>
                      <p className="text-sm text-blue-600 mt-1">
                        Configure suas contas do Stripe e Mercado Pago para receber pagamentos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Stripe</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Para receber pagamentos internacionais
                    </p>
                    <input
                      type="text"
                      value={paymentForm.stripe_account_id}
                      onChange={(e) => setPaymentForm({...paymentForm, stripe_account_id: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="acct_stripe_account_id"
                    />
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Mercado Pago</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Para receber pagamentos no Brasil
                    </p>
                    <input
                      type="text"
                      value={paymentForm.mercadopago_access_token}
                      onChange={(e) => setPaymentForm({...paymentForm, mercadopago_access_token: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="APP_USR-mercadopago-token"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Salvar Configurações
                </button>
              </div>
            )}

            {/* Store Tab */}
            {activeTab === 'store' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações da Loja</h3>
                  <p className="text-gray-600 mb-4">
                    Personalize como sua loja aparece para os visitantes
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-gray-600 mb-2">URL da sua loja:</p>
                    <p className="text-blue-600 font-medium">
                      rufinostore.com/{session?.user?.username || 'seuusername'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Notificações por email</h3>
                      <p className="text-sm text-gray-600">Receba emails sobre atividades importantes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationForm.email_notifications}
                      onChange={(e) => setNotificationForm({...notificationForm, email_notifications: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Notificações de vendas</h3>
                      <p className="text-sm text-gray-600">Seja notificado imediatamente sobre vendas</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationForm.sale_notifications}
                      onChange={(e) => setNotificationForm({...notificationForm, sale_notifications: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Relatórios semanais</h3>
                      <p className="text-sm text-gray-600">Receba um resumo semanal das suas vendas</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationForm.weekly_reports}
                      onChange={(e) => setNotificationForm({...notificationForm, weekly_reports: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Salvar Preferências
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 