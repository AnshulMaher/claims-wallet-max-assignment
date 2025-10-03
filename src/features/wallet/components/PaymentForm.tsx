'use client';

import React from 'react';
import { FormField } from '@/shared/components/FormField';
import { Label } from '@/shared/components/Label';
import { DollarSign, Clock, Shield } from 'lucide-react';
import { walletData } from '@/features/wallet/data/walletData';
import { paymentMethodNames } from '../data/paymentMethods';
import { paymentFormTextData } from '../data/paymentFormData';
import { TestField } from '@/shared/components/TestField';

interface PaymentFormProps {
  paymentMethod: string;
  transferAmount: string;
  onAmountChange: (value: string) => void;
  formData: {
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    cardNumber: string;
    expiryDate: string;
    zipCode: string;
    mailingAddress: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  processingTime: string;
}

function WithPaymentForm(
  WrappedComponent: React.ComponentType<PaymentFormProps>
) {
  function WrapperComponent(props: PaymentFormProps) {
    const {
      formData,
      onFormDataChange,
      transferAmount,
      onAmountChange,
      processingTime,
    } = props;
    return (
      <>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex items-center">
          <DollarSign className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {paymentFormTextData.availableBalance}
            </div>
            <div className="text-xl font-bold">
              ${walletData.balance.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Label as="label" className="block text-sm font-medium mb-2">
            {paymentFormTextData.transferAmount}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xl"
              min="0.01"
              max={walletData.balance}
              step="0.01"
            />
          </div>
        </div>

        <WrappedComponent {...props} />

        <TestField
          formData={{ ...formData, transferAmount }}
          onFormDataChange={(field, value) => {
            if (field === 'transferAmount') {
              onAmountChange(value);
            } else {
              onFormDataChange(field, value);
            }
          }}
        />

        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{processingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>{paymentFormTextData.processingInfo.shield}</span>
          </div>
        </div>
      </>
    );
  }

  return WrapperComponent;
}

export const CardForm = WithPaymentForm(
  ({ formData, onFormDataChange }: PaymentFormProps) => {
    return (
      <div className="space-y-4 mb-6">
        <FormField
          label={paymentFormTextData.cardNumber}
          value={formData.cardNumber}
          onChange={(value) => onFormDataChange('cardNumber', value)}
          placeholder={paymentFormTextData.placeholders.cardNumber}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={paymentFormTextData.expiryDate}
            value={formData.expiryDate}
            onChange={(value) => onFormDataChange('expiryDate', value)}
            placeholder={paymentFormTextData.placeholders.expiryDate}
            maxLength={5}
          />
          <FormField
            label={paymentFormTextData.zipCode}
            value={formData.zipCode}
            onChange={(value) => onFormDataChange('zipCode', value)}
            placeholder={paymentFormTextData.placeholders.zipCode}
          />
        </div>
      </div>
    );
  }
);

export const ACHForm = WithPaymentForm(
  ({ formData, onFormDataChange }: PaymentFormProps) => {
    return (
      <div className="space-y-4 mb-6">
        <FormField
          label={paymentFormTextData.bankName}
          value={formData.bankName}
          onChange={(value) => onFormDataChange('bankName', value)}
          placeholder={paymentFormTextData.placeholders.bankName}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label={paymentFormTextData.routingNumber}
            value={formData.routingNumber}
            onChange={(value) => onFormDataChange('routingNumber', value)}
            placeholder={paymentFormTextData.placeholders.routingNumber}
            maxLength={9}
          />
          <FormField
            label={paymentFormTextData.accountNumber}
            value={formData.accountNumber}
            onChange={(value) => onFormDataChange('accountNumber', value)}
            placeholder={paymentFormTextData.placeholders.accountNumber}
          />
        </div>
      </div>
    );
  }
);

export const CheckForm = WithPaymentForm(
  ({ formData, onFormDataChange }: PaymentFormProps) => {
    return (
      <div className="space-y-4 mb-6">
        <FormField
          label={paymentFormTextData.mailingAddress}
          value={formData.mailingAddress}
          onChange={(value) => onFormDataChange('mailingAddress', value)}
          placeholder={paymentFormTextData.placeholders.mailingAddress}
          type="textarea"
          rows={3}
        />
      </div>
    );
  }
);

export const VirtualCardForm = WithPaymentForm(() => <></>);

const formComponents = {
  [paymentMethodNames.virtualCard]: VirtualCardForm,
  [paymentMethodNames.directCard]: CardForm,
  [paymentMethodNames.ach]: ACHForm,
  [paymentMethodNames.check]: CheckForm,
};

export function PaymentForm(props: PaymentFormProps) {
  const FormComponent =
    formComponents[props.paymentMethod] ||
    formComponents[paymentMethodNames.virtualCard];

  return <FormComponent {...props} />;
}
