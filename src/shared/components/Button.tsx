'use client';

import React from 'react';
import { cn } from '@/shared/utils/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'gradient' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  darkMode?: {
    className?: string;
    hoverClassName?: string;
  };
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary:
    'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white',
  text: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
  gradient:
    'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg',
  icon: 'relative text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-0',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2',
  lg: 'px-6 py-3',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  fullWidth,
  className,
  children,
  disabled,
  darkMode,
  ...props
}: ButtonProps) {
  const baseStyles =
    'flex items-center justify-center gap-2 rounded-lg font-medium transition-all';
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles =
    disabled || isLoading
      ? 'bg-none bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed pointer-events-none'
      : '';

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        disabledStyles,
        darkMode?.className,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
