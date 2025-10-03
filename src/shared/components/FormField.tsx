'use client';

import React, { Fragment } from 'react';
import { Label } from './Label';
import { cn } from '@/shared/utils/utils';

export interface FormFieldProps<T extends string | boolean = string | boolean> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'checkbox';
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
  helperText?: string;
  checkboxLabel?: string;
  id?: string;
}

export function FormField<T extends string | boolean = string | boolean>({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  maxLength,
  min,
  max,
  step,
  rows,
  className,
  inputClassName,
  labelClassName,
  error,
  helperText,
  id,
}: FormFieldProps<T>) {
  const baseInputClasses =
    'w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors';

  const inputClasses = cn(
    baseInputClasses,
    disabled && 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed',
    error &&
      'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
    inputClassName
  );

  const labelClasses = cn('block text-sm font-medium mb-2', labelClassName);

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          value={value as string}
          onChange={(e) => onChange(e.target.value as T)}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          disabled={disabled}
          rows={rows}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          id={id}
          className={cn(
            'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
            inputClassName
          )}
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked as T)}
          disabled={disabled}
        />
      );
    }

    return (
      <input
        id={id}
        type={type}
        value={value as string}
        onChange={(e) => onChange(e.target.value as T)}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
      />
    );
  };

  const renderField = () => {
    const Field = (
      <Fragment>
        <Label as="label" variant="body-sm" className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {renderInput()}
      </Fragment>
    );

    if (type === 'checkbox') {
      return (
        <div className="flex items-center flex-row-reverse gap-2">{Field}</div>
      );
    }
    return Field;
  };

  return (
    <div className={className}>
      {renderField()}
      {error && (
        <Label className="text-sm text-red-600 dark:text-red-400">
          {error}
        </Label>
      )}

      {helperText && !error && (
        <Label className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </Label>
      )}
    </div>
  );
}
