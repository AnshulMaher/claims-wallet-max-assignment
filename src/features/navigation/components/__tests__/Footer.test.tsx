import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/features/navigation/components/Footer';

jest.mock('@/shared/components/LanguageSwitcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">Language Switcher</div>
  ),
}));
describe('Footer', () => {
  it('renders footer content', () => {
    render(<Footer />);
    expect(screen.getByText(/Juice is not a bank/)).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });
});
