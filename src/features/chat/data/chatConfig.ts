export const chatConfig = {
  webhookUrl:
    'https://ai-agents.juicefin.com/webhook/202a6379-0c36-4265-b09a-bc0e404d0c32/chat',
  mode: 'window' as const,
  showWelcomeScreen: false,
  initialMessages: [
    "Hello! I'm Berry👋",
    'I am here to help insurance companies like yours with our comprehensive solutions for managing incoming and outgoing payments.',
    'If you have any questions or need assistance, feel free to ask',
  ],
  i18n: {
    en: {
      title: 'Berry Assistant',
      subtitle: 'Juice Financial',
      inputPlaceholder: 'Type your question...',
      getStarted: 'New Conversation',
      footer: 'Powered by Juice Financial',
      closeButtonTooltip: 'Close chat',
    },
  },
};
