export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing';
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Refund';
  paymentMethod?: string;
}

export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    date: '2024-03-15',
    description: 'Home Depot Purchase',
    amount: '$250.00',
    status: 'Completed',
    type: 'Withdrawal',
    paymentMethod: 'Virtual Card',
  },
  {
    id: 'txn-002',
    date: '2024-03-14',
    description: 'Lowes Hardware',
    amount: '$175.50',
    status: 'Completed',
    type: 'Withdrawal',
    paymentMethod: 'Virtual Card',
  },
  {
    id: 'txn-003',
    date: '2024-03-13',
    description: 'Claim Payment',
    amount: '$5,000.00',
    status: 'Completed',
    type: 'Deposit',
    paymentMethod: 'Deposit',
  },
];
