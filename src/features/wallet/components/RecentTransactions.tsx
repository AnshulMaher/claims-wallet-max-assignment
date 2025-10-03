import { Label } from '@/shared/components/Label';
import { Table, TableValue } from '@/shared/components/Table';
import {
  transactionColumns,
  transactions,
  recentTransactionsTextData,
} from '../data/transactionData';

const statusClasses = {
  Completed:
    'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  Processing: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  Pending:
    'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  default: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

const customRenderers = {
  status: (value: TableValue) => {
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusClasses[value as keyof typeof statusClasses]}`}
      >
        {value}
      </span>
    );
  },
};

export function RecentTransactions() {
  const title = recentTransactionsTextData.title;
  const columns = transactionColumns;
  const data = transactions;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <Label as="h2" variant="h2" className="mb-6">
        {title}
      </Label>

      <Table columns={columns} data={data} customRenderers={customRenderers} />
    </div>
  );
}
