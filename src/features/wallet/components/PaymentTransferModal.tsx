'use client';

import React, { useState } from 'react';
import { ActionModal, ActionState } from '@/shared/components/ActionModal';
import { Label } from '@/shared/components/Label';
import { Wallet } from 'lucide-react';
import { walletData } from '@/features/wallet/data/walletData';
import { PaymentForm } from './PaymentForm';
import {
  paymentTransferTextData,
  paymentTransferConfig,
} from '../data/paymentMethods';

export interface PaymentTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: string;
  processingTime: string;
}

export function PaymentTransferModal({
  isOpen,
  onClose,
  paymentMethod,
  processingTime,
}: PaymentTransferModalProps) {
  const [state, setState] = useState<ActionState>('idle');
  const [transferAmount, setTransferAmount] = useState('');
  const [formData, setFormData] = useState({
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    cardNumber: '',
    expiryDate: '',
    zipCode: '',
    mailingAddress: '',
  });

  const isTransferDisabled = () => {
    const amount = parseFloat(transferAmount);
    return isNaN(amount) || amount <= 0 || amount > walletData.balance;
  };

  const handleTransfer = () => {
    if (isTransferDisabled()) {
      return;
    }

    setState('loading');

    setTimeout(() => {
      setState('completed');

      setTimeout(() => {
        handleClose();
      }, paymentTransferConfig.transferTimeouts.success);
    }, paymentTransferConfig.transferTimeouts.processing);
  };

  const handleClose = () => {
    setState('idle');
    setTransferAmount('');
    setFormData({
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      cardNumber: '',
      expiryDate: '',
      zipCode: '',
      mailingAddress: '',
    });
    onClose();
  };

  const getSuccessMessage = () => {
    const amount = parseFloat(transferAmount);
    return paymentTransferTextData.messages.success(amount, paymentMethod);
  };

  const handleFormDataChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderCompletedContent = () => {
    return (
      <Label className="text-gray-600 dark:text-gray-400 mb-6">
        {getSuccessMessage()}
      </Label>
    );
  };

  return (
    <ActionModal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        state === 'completed'
          ? ''
          : state === 'loading'
            ? paymentTransferTextData.processingTitle
            : paymentTransferTextData.title.replace(
                '{paymentMethod}',
                paymentMethod
              )
      }
      icon={state !== 'completed' ? Wallet : undefined}
      state={state}
      onAction={handleTransfer}
      loadingMessage={paymentTransferTextData.loadingMessage.replace(
        '{paymentMethod}',
        paymentMethod.toLowerCase()
      )}
      completedMessage={paymentTransferTextData.completedMessage}
      completedContent={renderCompletedContent()}
      autoCloseDelay={0}
      size="md"
      actionButtonText={paymentTransferTextData.actionButtonText}
      completeButtonText={paymentTransferTextData.completeButtonText}
      isActionDisabled={isTransferDisabled()}
    >
      <PaymentForm
        paymentMethod={paymentMethod}
        transferAmount={transferAmount}
        onAmountChange={setTransferAmount}
        formData={formData}
        onFormDataChange={handleFormDataChange}
        processingTime={
          processingTime || paymentTransferTextData.processingTime
        }
      />
    </ActionModal>
  );
}
