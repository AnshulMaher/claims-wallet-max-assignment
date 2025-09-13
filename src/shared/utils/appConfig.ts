export interface AppConfig {
  title: string;
  description: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  defaultClaimNumber: string;
  otpCode: string;
  transferTimeouts: {
    processing: number;
    success: number;
  };
}

export const appConfig: AppConfig = {
  title: 'Claims Wallet Max',
  description:
    'Access your funds instantly and choose how you want to receive your payment. Enhanced features with maximum flexibility.',
  logo: {
    src: '/Juice-2024-Logo-2000x800.png',
    alt: 'Juice Financial',
    width: 160,
    height: 64,
  },
  defaultClaimNumber: 'CLM-2024-0078',
  otpCode: '123456',
  transferTimeouts: {
    processing: 1500,
    success: 2000,
  },
};
