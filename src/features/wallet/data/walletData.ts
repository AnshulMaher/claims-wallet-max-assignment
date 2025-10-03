export interface WalletData {
  balance: number;
  claimNumber?: string;
  currency?: string;
}

export const walletData: WalletData = {
  balance: 4750.0,
  claimNumber: 'CLM-2024-0078',
  currency: 'USD',
};

export const walletHeroData = {
  title: 'Claims Wallet Max',
  description:
    'Access your funds instantly and choose how you want to receive your payment. Enhanced features with maximum flexibility.',
  logo: {
    src: '/Juice-2024-Logo-2000x800.png',
    alt: 'Juice Financial',
    width: 160,
    height: 64,
  },
};
