import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClaimsWalletCardPlus } from '@/features/wallet/components/ClaimsWalletCardPlus';

describe('ClaimsWalletCardPlus', () => {
  const props = {
    balance: 4750.0,
    claimNumber: 'CLM-2024-0078',
    onRefresh: jest.fn(),
  };

  it('renders balance and claim number', () => {
    render(<ClaimsWalletCardPlus {...props} />);
    expect(screen.getByText('$4,750')).toBeInTheDocument();
    expect(screen.getByText('Claim #CLM-2024-0078')).toBeInTheDocument();
  });

  it('handles refresh click', () => {
    render(<ClaimsWalletCardPlus {...props} />);
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    expect(props.onRefresh).toHaveBeenCalledTimes(1);
  });

  it('handles negative balance', () => {
    render(<ClaimsWalletCardPlus {...props} balance={-100} />);
    expect(screen.getByText('$-100')).toBeInTheDocument();
  });
});
