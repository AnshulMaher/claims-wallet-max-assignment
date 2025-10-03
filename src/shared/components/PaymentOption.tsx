'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Label } from './Label';
import { cn } from '@/shared/utils/utils';

export interface PaymentOptionData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  timeframe: string;
}

export interface PaymentOptionProps extends PaymentOptionData {
  onSelect: (optionName: string) => void;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  timeframeClassName?: string;
  actionClassName?: string;
}

export function PaymentOption({
  name,
  description,
  icon: IconComponent,
  timeframe,
  onSelect,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  timeframeClassName,
  actionClassName,
}: PaymentOptionProps) {
  return (
    <button
      onClick={() => onSelect(name)}
      className={cn(
        'w-full h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col text-left gap-3 md:gap-4 relative overflow-hidden group',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-1">
        <div className={cn('p-2 rounded-full', iconClassName)}>
          <IconComponent className="h-5 w-5" />
        </div>
        <Label as="h3" className={cn('font-bold', titleClassName)}>
          {name}
        </Label>
      </div>

      <Label
        variant="body-sm"
        className={cn('text-gray-600 dark:text-gray-400', descriptionClassName)}
      >
        {description}
      </Label>

      <div className="mt-auto flex items-center justify-between">
        <Label
          as="span"
          variant="caption"
          className={cn(
            'text-gray-500 flex items-center gap-1',
            timeframeClassName
          )}
        >
          <Clock className="h-3 w-3" />
          {timeframe}
        </Label>
        <Label
          as="span"
          variant="body-sm"
          className={cn('text-blue-600 flex items-center', actionClassName)}
        >
          <Label as="span" variant="body-sm">
            Select
          </Label>
          <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
        </Label>
      </div>

      <div className="absolute inset-0 bg-gray-600/5 dark:bg-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
