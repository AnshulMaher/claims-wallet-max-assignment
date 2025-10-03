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
  });

  it('toggles mobile menu', () => {
    render(<Header />);
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    fireEvent.click(mobileMenuButton);

    const paymentSolutionsText = screen.getAllByText(/payment solutions/i);
    expect(paymentSolutionsText.length).toBeGreaterThan(0);
  });
});
