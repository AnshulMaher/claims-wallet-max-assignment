'use client';

import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import './styles.css';
import { createChat } from '@n8n/chat';
import { ChatBubbleIcon } from './ChatBubbleIcon';
import { chatConfig } from '@/features/chat/data/chatConfig';

export function ChatBubble() {
  const createdRef = useRef(false);

  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    createChat(chatConfig);
  }, []);

  const handleClick = () => {
    const injectedToggle = document.querySelector(
      '.chat-window-toggle'
    ) as HTMLElement | null;
    if (injectedToggle) {
      injectedToggle.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      );
      return;
    }

    const Chatbot = (
      window as { Chatbot?: { open: () => void; close: () => void } }
    ).Chatbot;
    if (
      Chatbot &&
      typeof Chatbot.open === 'function' &&
      typeof Chatbot.close === 'function'
    ) {
      const chatEl = document.querySelector(
        '#n8n-chat .chat-window'
      ) as HTMLElement | null;
      const isOpen = chatEl
        ? getComputedStyle(chatEl).display !== 'none'
        : false;
      if (isOpen) Chatbot.close();
      else Chatbot.open();
      return;
    }

    console.warn(
      'n8n chat toggle not found. Did createChat run? ' +
        'Look for .chat-window-toggle in the DOM or window.Chatbot.open()/close().'
    );
  };

  return (
    <div
      id="n8n-chat-launcher"
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onClick={handleClick}
      aria-label="Open chat"
    >
      <div className="chat-button-wrapper" aria-hidden>
        <ChatBubbleIcon className="w-[95%] h-[95%]" />
      </div>
    </div>
  );
}
