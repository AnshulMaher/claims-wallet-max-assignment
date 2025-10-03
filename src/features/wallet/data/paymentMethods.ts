import { PaymentOptionData } from '@/shared/components/PaymentOption';
import { CreditCard, Landmark, MailCheck } from 'lucide-react';

export interface PaymentMethod extends PaymentOptionData {
  processingTime: string;
}

export const paymentMethodNames = {
  virtualCard: 'Virtual Card',
  directCard: 'Direct to Visa/Mastercard',
  ach: 'ACH to Bank',
  check: 'eCheck',
};

export const paymentMethods: Record<string, PaymentMethod> = {
  [paymentMethodNames.virtualCard]: {
    id: 'virtual-card',
    name: 'Virtual Card',
    description: 'Instant access to funds with Mastercard',
    icon: CreditCard,
    timeframe: 'Instant',
    iconClassName:
      'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    processingTime: 'Available immediately',
  },
  [paymentMethodNames.directCard]: {
    id: 'direct-card',
    name: 'Direct to Visa/Mastercard',
    description: 'Send money to your existing credit or debit card',
    icon: CreditCard,
    timeframe: '10-30 minutes',
    iconClassName:
      'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    processingTime: 'Typically takes 10-30 minutes',
  },
  [paymentMethodNames.ach]: {
    id: 'ach',
    name: 'ACH to Bank',
    description: 'Transfer directly to your bank account',
    icon: Landmark,
    timeframe: '1-3 business days',
    iconClassName: 'bg-purple-50 dark:text-purple-50',
    processingTime: 'Processing time: 1-3 business days',
  },
  [paymentMethodNames.check]: {
    id: 'check',
    name: 'eCheck',
    description: 'Traditional check sent to your mailing address',
    icon: MailCheck,
    timeframe: '5-7 business days',
    iconClassName: 'bg-amber-50 dark:text-amber-50',
    processingTime: 'Delivery time: 5-7 business days',
  },
};

export const virtualCardData = {
  title: 'Virtual Mastercard',
  description:
    'Get instant access to your funds with a virtual Mastercard that can be used anywhere online or added to your mobile wallet.',
  actionText: 'Select Virtual Card',
  instantLabel: 'INSTANT',
  cardNumber: '**** 4444',
  logoUrl: '/Juice-2024-Logo-2000x800.png',
  cardLogoUrl:
    'https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg',
};

export const paymentOptionsTextData = {
  title: 'Select Payment Method',
};

export const paymentTransferTextData = {
  title: 'Transfer to {paymentMethod}',
  processingTitle: 'Processing...',
  actionButtonText: 'Transfer Funds',
  completeButtonText: 'Close',
  loadingMessage: 'Transferring funds to your {paymentMethod}...',
  completedMessage: 'Transfer Successful!',
  processingTime: 'Delivery time: 5-7 business days',
  messages: {
    success: (amount: number, paymentMethod: string) =>
      `$${amount.toFixed(2)} has been sent to your ${paymentMethod.toLowerCase()}.`,
  },
};

export const paymentTransferConfig = {
  transferTimeouts: {
    processing: 1500,
    success: 2000,
  },
};
