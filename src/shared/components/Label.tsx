import React from 'react';
import { cn } from '@/shared/utils/utils';

export type LabelVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'bold'
  | 'italic';

export type LabelAs =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'span'
  | 'div'
  | 'b'
  | 'i'
  | 'strong'
  | 'em'
  | 'section';

export interface LabelProps {
  as?: LabelAs;
  variant?: LabelVariant;
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

const variantStyles: Record<LabelVariant, string> = {
  h1: 'text-5xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-base font-medium',
  h5: 'text-base font-medium',
  h6: 'text-sm font-semibold',
  body: 'text-base',
  'body-sm': 'text-sm',
  caption: 'text-xs',
  label: 'text-sm font-medium',
  bold: 'font-bold',
  italic: 'italic',
};

export function Label({
  as = 'p',
  variant = 'body',
  className,
  children,
  htmlFor,
}: LabelProps) {
  const Component = as as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
}
