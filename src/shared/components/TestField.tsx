'use client';

import React, { useState } from 'react';
import { Label } from './Label';
import { Bug, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';

interface TestFieldProps {
  formData?: Record<string, string>;
  onFormDataChange?: (field: string, value: string) => void;
  onDebugAction?: (action: string, data?: Record<string, unknown>) => void;
  className?: string;
}

export function TestField({
  formData = {},
  onFormDataChange,
  onDebugAction,
  className = '',
}: TestFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormDataChange = (field: string, value: string) => {
    if (onFormDataChange) {
      onFormDataChange(field, value);
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const handleDebugAction = (action: string) => {
    if (onDebugAction) {
      onDebugAction(action, formData);
    }

    switch (action) {
      case 'log-form-data':
        console.log('🔍 Form Data Debug:', formData);
        break;
      case 'clear-form':
        Object.keys(formData).forEach((key) => {
          handleFormDataChange(key, '');
        });
        break;
      case 'validate-form':
        console.log('✅ Form Validation Check:', {
          hasEmptyFields: Object.values(formData).some(
            (value) => value && value.toString().trim() !== ''
          ),
          fieldCount: Object.keys(formData).length,
          emptyFields: Object.entries(formData).filter(
            ([_, value]) => !value || value.toString().trim() === ''
          ),
        });
        break;
    }
  };

  return (
    <div
      className={`mb-6 border-2 border-yellow-300 dark:border-yellow-600 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 ${className}`}
    >
      {' '}
      <div
        className="p-3 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <Label className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              DEBUG PANEL - NON-PRODUCTION
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              {isExpanded ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-yellow-300 dark:border-yellow-600">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={() => handleDebugAction('log-form-data')}
              variant="secondary"
              size="sm"
              className="text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
            >
              📋 Log Form Data
            </Button>
            <Button
              onClick={() => handleDebugAction('validate-form')}
              variant="secondary"
              size="sm"
              className="text-xs bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600"
            >
              ✅ Validate Form
            </Button>
            <Button
              onClick={() => handleDebugAction('clear-form')}
              variant="secondary"
              size="sm"
              className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600"
            >
              🗑️ Clear Form
            </Button>
          </div>

          <div className="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded border border-yellow-300 dark:border-yellow-600">
            ⚠️ <strong>Development Only:</strong> This panel is for debugging
            and testing purposes. It will not appear in production builds.
            Remove this component before production deployment.
          </div>
        </div>
      )}
    </div>
  );
}
