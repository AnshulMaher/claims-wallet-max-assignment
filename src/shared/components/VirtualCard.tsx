'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, CreditCard } from 'lucide-react';
import { Label } from './Label';

export interface VirtualCardProps {
  cardNumber: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  brandLogo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  actionText: string;
  statusText: string;
  onSelect: () => void;
  className?: string;
  cardClassName?: string;
  statusClassName?: string;
  actionClassName?: string;
}

export function VirtualCard({
  cardNumber,
  logo,
  brandLogo,
  title,
  description,
  actionText,
  statusText,
  onSelect,
  className,
  cardClassName,
  statusClassName,
  actionClassName,
}: VirtualCardProps) {
  return (
    <div className={className}>
      <button
        onClick={onSelect}
        className={`w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600/50 dark:border-blue-500/30 flex flex-col md:flex-row items-center text-left gap-6 relative overflow-hidden group ${cardClassName || ''}`}
      >
        <div className="w-full max-w-[200px] h-[120px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex-shrink-0 shadow-lg relative">
          <div className="absolute top-2 left-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-6"
            />
          </div>
          <div className="absolute bottom-2 right-2">
            <Image
              src={brandLogo.src}
              alt={brandLogo.alt}
              width={brandLogo.width}
              height={brandLogo.height}
              className="h-6"
            />
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/70">
            {cardNumber}
          </div>
        </div>

        <div className="flex-grow w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <Label as="h3" variant="h3">
                {title}
              </Label>
            </div>
            <div className="sm:ml-auto">
              <Label
                as="span"
                variant="caption"
                className={`inline-flex items-center px-3 py-1 rounded-full font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 ${statusClassName || ''}`}
              >
                {statusText}
              </Label>
            </div>
          </div>
          <Label className="text-gray-600 dark:text-gray-400 mb-2">
            {description}
          </Label>
          <div
            className={`flex items-center text-blue-600 ${actionClassName || ''}`}
          >
            <Label as="span" variant="h5">
              {actionText}
            </Label>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
