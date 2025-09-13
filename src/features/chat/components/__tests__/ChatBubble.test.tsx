import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatBubble } from '@/features/chat/components/ChatBubble';

jest.mock('@n8n/chat', () => ({
  createChat: jest.fn(() => ({ mount: jest.fn(), unmount: jest.fn() })),
}));

jest.mock('@/features/chat/components/ChatBubble/ChatBubbleIcon', () => ({
  ChatBubbleIcon: () => <div data-testid="chat-icon">Chat Icon</div>,
}));

jest.mock('@/features/chat/data/chatConfig', () => ({
  chatConfig: { webhookUrl: 'https://test.com', mode: 'window' },
}));

describe('ChatBubble', () => {
  it('renders chat bubble', () => {
    render(<ChatBubble />);
    expect(screen.getByTestId('chat-icon')).toBeInTheDocument();
  });
});
