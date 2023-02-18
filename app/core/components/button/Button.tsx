import classNames from 'classnames'
import React from 'react'

export type ButtonStyleProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary'
  variant?: 'solid' | 'outline'
}

export const Button = ({ children, ...props }: {
  children: React.ReactNode,
} & ButtonStyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonSize = {
    'sm': 'text-sm px-2 py-1',
    'md': 'text-base px-4 py-2',
    'lg': 'text-lg px-6 py-3',
  }
  const buttonColor = {
    'primary': 'bg-indigo-600 text-white hover:bg-indigo-500',
    'secondary': 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  }
  const buttonVariant = {
    'solid': 'inline-block border border-transparent rounded-full shadow',
    'outline': 'inline-block border border-gray-300 rounded-full shadow',
  }
  const classes = classNames(
    buttonSize[props.size || 'md'],
    buttonColor[props.color || 'primary'],
    buttonVariant[props.variant || 'solid'],
    props.className
  )

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}
