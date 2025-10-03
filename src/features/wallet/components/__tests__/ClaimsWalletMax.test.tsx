import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClaimsWalletMax } from '@/features/wallet/components/ClaimsWalletMax';
import { Button } from '@/shared/components/Button';

jest.mock('@/features/chat/components/ChatBubble', () => ({
  ChatBubble: () => <div data-testid="chat-bubble">Chat</div>,
}));

jest.mock('@/features/help/components/HelpSidebarBase', () => ({
  HelpSidebarBase: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => (
    <div
      data-testid="help-sidebar"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <Button onClick={onClose} variant="secondary">
        Close
      </Button>
      {children}
    </div>
  ),
}));

jest.mock('@/features/help/components/PageHelpButton', () => ({
  PageHelpButton: ({
    onClick,
    isOpen,
  }: {
    onClick: () => void;
    isOpen: boolean;
  }) => (
    <Button onClick={onClick} variant="secondary" data-testid="help-button">
      {isOpen ? 'Close' : 'Open'}
    </Button>
  ),
}));

jest.mock('@/features/wallet/components/ClaimsWalletCardPlus', () => ({
  ClaimsWalletCardPlus: () => <div data-testid="wallet-card">Wallet Card</div>,
}));

describe('ClaimsWalletMax', () => {
  it('renders main components', () => {
    render(<ClaimsWalletMax />);
    expect(screen.getByText('Claims Wallet Max')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-card')).toBeInTheDocument();
  });

  it('toggles help sidebar', () => {
    render(<ClaimsWalletMax />);
    const helpButton = screen.getByTestId('help-button');
    fireEvent.click(helpButton);
    expect(screen.getByTestId('help-sidebar')).toBeInTheDocument();
  });
});
