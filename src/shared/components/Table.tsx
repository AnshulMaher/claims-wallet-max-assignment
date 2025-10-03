'use client';

import React from 'react';

export interface TableColumn {
  key: string;
  label: string;
  className?: string;
}

export type TableValue = string | number | boolean | undefined;
export interface TableRow {
  id: string;
  [key: string]: TableValue;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  customRenderers?: Record<
    string,
    (value: TableValue, row: TableRow) => React.ReactElement
  >;
}

export function Table({
  columns,
  data,
  className,
  headerClassName,
  rowClassName,
  cellClassName,
  customRenderers,
}: TableProps) {
  const renderCell = (column: TableColumn, row: TableRow) => {
    const value = row[column.key];

    if (customRenderers && customRenderers[column.key]) {
      return customRenderers[column.key](value, row);
    }

    return value;
  };

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <table className="w-full">
        <thead>
          <tr
            className={`border-b border-gray-200 dark:border-gray-700 ${headerClassName || ''}`}
          >
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left py-4 px-4 ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-gray-200 dark:border-gray-700 ${rowClassName || ''}`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`py-4 px-4 ${cellClassName || ''}`}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
