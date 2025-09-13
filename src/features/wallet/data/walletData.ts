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
