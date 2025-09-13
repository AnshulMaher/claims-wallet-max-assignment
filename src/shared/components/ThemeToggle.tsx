'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [isChanging, setIsChanging] = React.useState(false);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    setIsChanging(true);
    setTheme(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => setIsChanging(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleThemeChange}
      className={cn(
        'relative w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
        isChanging && 'pointer-events-none',
        className
      )}
      aria-label="Toggle theme"
      disabled={isChanging}
      data-testid="theme-toggle"
    >
      <Sun
        className="absolute inset-0 h-full w-full transition-all duration-300 opacity-100 rotate-0 dark:opacity-0 dark:-rotate-90"
        data-testid="sun-icon"
      />
      <Moon
        className="absolute inset-0 h-full w-full transition-all duration-300 opacity-0 rotate-90 dark:opacity-100 dark:rotate-0"
        data-testid="moon-icon"
      />
    </button>
  );
}
