import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nProvider } from '@/shared/components/I18nProvider';

jest.mock('@/shared/utils/i18n', () => ({}));

describe('I18nProvider', () => {
  it('renders children', () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
