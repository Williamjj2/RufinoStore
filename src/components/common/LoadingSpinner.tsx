interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'white' | 'gray'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const variantClasses = {
    primary: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-400'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div 
        className={`w-full h-full border-2 border-transparent ${variantClasses[variant]} border-t-transparent animate-spin rounded-full`}
        style={{ borderTopColor: 'transparent' }}
      />
    </div>
  )
} 