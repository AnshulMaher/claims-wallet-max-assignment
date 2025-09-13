import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageHelpButton } from '@/features/help/components/PageHelpButton';

describe('PageHelpButton', () => {
  const props = { onClick: jest.fn(), isOpen: false };

  it('renders and handles click', () => {
    render(<PageHelpButton {...props} layout={'position'} />);
    const button = screen.getByTestId('help-button');
    fireEvent.click(button);
    expect(props.onClick).toHaveBeenCalled();
  });
});
