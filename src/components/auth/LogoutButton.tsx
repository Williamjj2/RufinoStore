'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'

interface LogoutButtonProps {
  showIcon?: boolean
  showText?: boolean
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function LogoutButton({ 
  showIcon = true, 
  showText = true,
  variant = 'ghost',
  size = 'default'
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      size={size}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {showIcon && <LogOut className="h-4 w-4" />}
          {showText && <span className={showIcon ? 'ml-2' : ''}>Sair</span>}
        </>
      )}
    </Button>
  )
} 