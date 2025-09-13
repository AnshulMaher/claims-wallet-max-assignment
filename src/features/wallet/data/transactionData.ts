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
    date: '2024-03-13',
    description: 'Claim Payment',
    amount: '$5,000.00',
    status: 'Completed',
    type: 'Deposit',
    paymentMethod: 'Direct Deposit',
  },
  {
    id: 'txn-002',
    date: '2024-03-10',
    description: 'Virtual Card Purchase',
    amount: '$150.00',
    status: 'Completed',
    type: 'Withdrawal',
    paymentMethod: 'Virtual Card',
  },
  {
    id: 'txn-003',
    date: '2024-03-08',
    description: 'ACH Transfer',
    amount: '$2,500.00',
    status: 'Completed',
    type: 'Withdrawal',
    paymentMethod: 'ACH to Bank',
  },
  {
    id: 'txn-004',
    date: '2024-03-05',
    description: 'eCheck Processing',
    amount: '$1,000.00',
    status: 'Processing',
    type: 'Withdrawal',
    paymentMethod: 'eCheck',
  },
];
