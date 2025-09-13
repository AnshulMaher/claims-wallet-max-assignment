import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and toggles theme', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    fireEvent.click(button);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
