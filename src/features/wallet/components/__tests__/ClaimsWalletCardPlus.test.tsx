import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClaimsWalletCardPlus } from '@/features/wallet/components/ClaimsWalletCardPlus';

describe('ClaimsWalletCardPlus', () => {
  const props = {
    onRefresh: jest.fn(),
  };

  it('handles refresh click', () => {
    render(<ClaimsWalletCardPlus {...props} />);
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    expect(props.onRefresh).toHaveBeenCalledTimes(1);
  });
});
