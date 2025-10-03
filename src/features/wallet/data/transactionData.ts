import { TableColumn, TableRow } from '@/shared/components/Table';

export const transactionColumns: TableColumn[] = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'paymentMethod', label: 'Method' },
];

export const recentTransactionsTextData = {
  title: 'Recent Transactions',
};

export const transactions: TableRow[] = [
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
