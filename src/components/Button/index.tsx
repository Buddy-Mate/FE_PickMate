import { MouseEvent, ReactNode } from 'react'

type ButtonProps = {
  type: 'primary' | 'secondary' | 'tertiary'
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
}

const buttonStyles = {
  primary:
    'text-white to-custom-gradation-end from-custom-gradation-start hover:from-custom-gradation-end hover:to-custom-gradation-start bg-gradient-to-r via-indigo-500',
  primaryDisabled: 'text-white bg-custom-gray-200 cursor-not-allowed',
  secondary: 'text-primary bg-transparent text-primary border border-primary',
  secondaryDisabled:
    'text-custom-gray-100 border border-custom-gray-100 cursor-not-allowed',
  tertiary: 'bg-transparent text-custom-gray-200 border border-custom-gray-200',
  tertiaryDisabled:
    'text-custom-gray-100 border border-custom-gray-100 cursor-not-allowed',
}

export default function Button({
  type,
  onClick,
  children,
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = `w-full rounded-lg px-6 py-3 text-sm md:text-lg font-bold shadow-lg transition-all duration-300`
  const disabledStyles = disabled
    ? buttonStyles[`${type}Disabled`]
    : `${buttonStyles[type]} hover:scale-105 cursor-pointer`

  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${baseStyles} ${className} ${disabledStyles}`}
    >
      {children}
    </button>
  )
}
