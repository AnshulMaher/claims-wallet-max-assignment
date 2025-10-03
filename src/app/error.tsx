'use client';

import React from 'react';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-6">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <Label
          as="h1"
          variant="h2"
          className="text-gray-900 dark:text-white mb-4"
        >
          Oops! Something went wrong
        </Label>
        <Label className="text-gray-600 dark:text-gray-400 mb-8">
          We encountered an unexpected error. This has been logged and our team
          will investigate.
        </Label>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-left">
            <Label
              as="h3"
              variant="h6"
              className="text-gray-700 dark:text-gray-300 mb-2"
            >
              Error Details (Development):
            </Label>
            <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <Label
                variant="caption"
                className="text-gray-500 dark:text-gray-400 mt-2"
              >
                Error ID: {error.digest}
              </Label>
            )}
          </div>
        )}

        <div className="space-y-4">
          <Button onClick={reset} variant="primary" size="lg" fullWidth>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
