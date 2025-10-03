'use client';

import React from 'react';
import { Label } from './Label';
import { cn } from '@/shared/utils/utils';

export interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColorScheme?: {
    bg: string;
    text: string;
  };
}

export interface FeatureCardProps extends FeatureCardData {
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  defaultIconColorScheme?: {
    bg: string;
    text: string;
  };
}

export function FeatureCard({
  title,
  description,
  icon: IconComponent,
  iconColorScheme,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  defaultIconColorScheme = {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
  },
}: FeatureCardProps) {
  const finalIconColorScheme = iconColorScheme || defaultIconColorScheme;

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-xl p-6', className)}>
      <div
        className={cn(
          'inline-flex p-3 rounded-full mb-4',
          finalIconColorScheme.bg,
          finalIconColorScheme.text,
          iconClassName
        )}
      >
        <IconComponent className="h-6 w-6" />
      </div>

      <Label
        as="h3"
        className={cn('text-lg font-semibold mb-2', titleClassName)}
      >
        {title}
      </Label>

      <Label
        className={cn('text-gray-600 dark:text-gray-400', descriptionClassName)}
      >
        {description}
      </Label>
    </div>
  );
}
