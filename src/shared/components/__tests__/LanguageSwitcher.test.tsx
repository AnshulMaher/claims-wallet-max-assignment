import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({ 'languages.en': 'English', 'languages.zh': '中文' })[key] || key,
    i18n: { language: 'en', changeLanguage: jest.fn() },
  }),
}));

describe('LanguageSwitcher', () => {
  it('renders and opens dropdown', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByTestId('language-switcher');
    fireEvent.click(button);
    expect(screen.getAllByText('English')).toHaveLength(2);
  });
});
