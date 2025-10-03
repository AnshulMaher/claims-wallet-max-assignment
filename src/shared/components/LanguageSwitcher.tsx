'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Label } from './Label';
import { Button } from './Button';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'zh', name: t('languages.zh') },
    { code: 'pt', name: t('languages.pt') },
    { code: 'es', name: t('languages.es') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'ja', name: t('languages.ja') },
  ];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        variant="text"
        size="sm"
        leftIcon={<Globe className="h-4 w-4" />}
        className="text-gray-700 hover:text-gray-900 dark:text-gray-700 dark:hover:text-gray-900 p-0 font-normal"
        data-testid="language-switcher"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Label as="span" variant="body-sm">
          {languages.find((lang) => lang.code === i18n.language)?.name ||
            t('languages.en')}
        </Label>
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              variant="text"
              size="sm"
              fullWidth
              className={`text-left justify-start ${
                i18n.language === lang.code
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
