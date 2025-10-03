'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Modal } from './Modal';
import { Label } from './Label';
import { Button } from './Button';
import { cn } from '@/shared/utils/utils';

export type ActionState = 'idle' | 'loading' | 'completed' | 'error';

export interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  state: ActionState;
  onAction?: () => void;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingMessage?: string;
  completedMessage?: string;
  errorMessage?: string;
  completedContent?: React.ReactNode;
  errorContent?: React.ReactNode;
  autoCloseDelay?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  loadingClassName?: string;
  completedClassName?: string;
  errorClassName?: string;
  actionButtonText?: string;
  completeButtonText?: string;
  retryButtonText?: string;
  isActionDisabled?: boolean;
  actionButtonClassName?: string;
}

export function ActionModal({
  isOpen,
  onClose,
  title,
  icon,
  state,
  onAction,
  onRetry,
  children,
  loadingMessage = 'Processing...',
  completedMessage = 'Action completed successfully!',
  errorMessage = 'An error occurred. Please try again.',
  completedContent,
  errorContent,
  autoCloseDelay = 2000,
  size = 'md',
  className,
  loadingClassName,
  completedClassName,
  errorClassName,
  actionButtonText = 'Submit',
  completeButtonText = 'Close',
  retryButtonText = 'Try Again',
  isActionDisabled = false,
  actionButtonClassName,
}: ActionModalProps) {
  useEffect(() => {
    if (state === 'completed' && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [state, autoCloseDelay, onClose]);

  const handleBackdropClick = () => {
    if (state === 'idle' || state === 'completed' || state === 'error') {
      onClose();
    }
  };
  const showCloseButton = state !== 'loading' && state !== 'completed';

  const handleActionClick = () => {
    if (state === 'idle' && onAction) {
      onAction();
    }
  };

  const handleRetryClick = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div
            className={cn(
              'py-10 flex flex-col items-center justify-center',
              loadingClassName
            )}
          >
            <div className="mb-6">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
            <Label className="text-center text-gray-600 dark:text-gray-400">
              {loadingMessage}
            </Label>
          </div>
        );

      case 'completed':
        return (
          <div className={cn('py-6 text-center', completedClassName)}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <Label as="h3" className="text-xl font-bold mb-2">
              {completedMessage}
            </Label>
            {completedContent && <div className="mb-6">{completedContent}</div>}
          </div>
        );

      case 'error':
        return (
          <div className={cn('py-6 text-center', errorClassName)}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <Label as="h3" className="text-xl font-bold mb-2">
              {errorMessage}
            </Label>
            {errorContent && <div className="mb-6">{errorContent}</div>}
            <div className="flex gap-3 justify-center">
              {onRetry && (
                <Button onClick={handleRetryClick} variant="primary" size="md">
                  {retryButtonText}
                </Button>
              )}
              <Button onClick={onClose} variant="secondary" size="md">
                {completeButtonText}
              </Button>
            </div>
          </div>
        );

      case 'idle':
      default:
        return (
          <div className={className}>
            {children}
            {onAction && (
              <div className="mt-6">
                <Button
                  onClick={handleActionClick}
                  disabled={isActionDisabled}
                  variant="gradient"
                  size="lg"
                  fullWidth
                  className={actionButtonClassName}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  {actionButtonText}
                </Button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={icon}
      showCloseButton={showCloseButton}
      closeOnBackdropClick={state === 'idle'}
      size={size}
      onBackdropClick={handleBackdropClick}
    >
      {renderContent()}
    </Modal>
  );
}
