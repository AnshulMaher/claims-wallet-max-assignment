import React from 'react';
import { CreditCard, Landmark, MailCheck } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  timeframe: string;
  priority: number;
  color: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'virtual-card',
    name: 'Virtual Card',
    description: 'Instant access to funds with Mastercard',
    icon: CreditCard,
    timeframe: 'Instant',
    priority: 1,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'direct-card',
    name: 'Direct to Visa/Mastercard',
    description: 'Send money to your existing credit or debit card',
    icon: CreditCard,
    timeframe: '10-30 minutes',
    priority: 2,
    color: 'from-green-600 to-emerald-600',
  },
  {
    id: 'ach',
    name: 'ACH to Bank',
    description: 'Transfer directly to your bank account',
    icon: Landmark,
    timeframe: '1-3 business days',
    priority: 3,
    color: 'from-purple-600 to-violet-600',
  },
  {
    id: 'check',
    name: 'eCheck',
    description: 'Traditional check sent to your mailing address',
    icon: MailCheck,
    timeframe: '5-7 business days',
    priority: 4,
    color: 'from-amber-600 to-orange-600',
  },
];
