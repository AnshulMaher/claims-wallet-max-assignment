'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Label } from './Label';
import { Button } from './Button';
import { cn } from '@/shared/utils/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  onBackdropClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
  closeButtonClassName?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  icon: Icon,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  onBackdropClick,
  size = 'md',
  className,
  contentClassName,
  headerClassName,
  titleClassName,
  iconClassName,
  closeButtonClassName,
}: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (onBackdropClick) {
        onBackdropClick();
      } else if (closeOnBackdropClick) {
        onClose();
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={cn(
              'bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 w-full overflow-y-auto relative',
              sizeClasses[size],
              contentClassName
            )}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'flex items-center justify-between mb-6',
                headerClassName
              )}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <Icon
                    className={cn('h-6 w-6 text-blue-600', iconClassName)}
                  />
                )}
                <Label
                  as="h3"
                  className={cn('text-xl font-bold', titleClassName)}
                >
                  {title}
                </Label>
              </div>
              {showCloseButton && (
                <Button
                  onClick={onClose}
                  variant="icon"
                  className={cn('transition-colors', closeButtonClassName)}
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </Button>
              )}
            </div>

            <div className={className}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
