import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pulse: 'pulseAnimation 2s infinite ease-in-out',
        'chat-typing-scaling': 'chatTypingScaling 1.4s infinite ease-in-out',
        'chat-typing-bouncing': 'chatTypingBouncing 1.4s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseAnimation: {
          '0%': {
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0px rgba(0,120,255,0))',
          },
          '50%': {
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 0 3px rgba(0,120,255,.3))',
          },
          '100%': {
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0px rgba(0,120,255,0))',
          },
        },
        chatTypingScaling: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.4)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        chatTypingBouncing: {
          '0%': {
            transform: 'translateY(0)',
          },
          '33%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
