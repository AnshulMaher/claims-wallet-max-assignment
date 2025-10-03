export interface PaymentFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'tel' | 'email';
  placeholder: string;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  prefix?: string;
  suffix?: string;
}

export interface PaymentFormConfig {
  fields: PaymentFormField[];
  timeframes: {
    processing: string;
    completion: string;
  };
  description: string;
  icon: string;
}

export const paymentFormTextData = {
  availableBalance: 'Available Balance',
  transferAmount: 'Transfer Amount',
  cardNumber: 'Card Number',
  expiryDate: 'Expiration Date',
  zipCode: 'ZIP Code',
  bankName: 'Bank Name',
  routingNumber: 'Routing Number',
  accountNumber: 'Account Number',
  mailingAddress: 'Mailing Address',
  placeholders: {
    cardNumber: 'Card number',
    expiryDate: 'MM/YY',
    zipCode: 'Billing zip code',
    bankName: 'Enter bank name',
    routingNumber: '9 digits',
    accountNumber: 'Account number',
    mailingAddress: 'Enter your mailing address',
  },
  processingInfo: {
    clock: 'Processing time: 1-3 business days',
    shield: 'Secure, encrypted transfer',
  },
};
