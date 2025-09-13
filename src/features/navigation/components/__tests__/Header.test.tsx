import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/features/navigation/components/Header';

jest.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

describe('Header', () => {
  it('renders header elements', () => {
    render(<Header />);
    expect(screen.getAllByAltText('Juice')).toHaveLength(2);
    expect(screen.getByText('PAYMENT SOLUTIONS')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Header />);
    const menuButtons = screen.getAllByRole('button');
    const mobileMenuButton = menuButtons[2];
    fireEvent.click(mobileMenuButton);
    expect(screen.getAllByText('PAYMENT SOLUTIONS')).toHaveLength(2);
  });
});
