'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import NextLink from 'next/link';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import {
  navigationItems,
  mobileMenuCategories,
  mobileMenuLinks,
  mobileMenuCategoriesTitle,
} from '@/features/navigation/data/navigationData';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { DesktopNavigation } from '@/shared/components/DesktopNavigation';
import { MobileMenu } from '@/shared/components/MobileMenu';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsLanguageOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-none">
          <NextLink href="/" className="block">
            <Image
              src="/Juice-2024-Logo-2000x800.png"
              alt="Juice"
              width={80}
              height={32}
              className="h-8 hidden dark:block"
              priority={true}
            />
            <Image
              src="/Juice-2024-Logo-2000x800.png"
              alt="Juice"
              width={80}
              height={32}
              className="h-8 block dark:hidden"
              priority={true}
            />
          </NextLink>
        </div>

        <nav className="hidden md:flex items-center justify-center flex-grow gap-8">
          <DesktopNavigation
            items={navigationItems}
            className="flex items-center gap-8"
          />
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle className="p-0" />

          <div className="relative hidden md:block">
            <Button
              variant="icon"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              onBlur={() => setTimeout(() => setIsLanguageOpen(false), 200)}
              className="flex items-center p-0"
            >
              <Globe className="h-5 w-5" />
            </Button>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    variant="text"
                    size="sm"
                    className={`w-full justify-start px-4 py-2 ${
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

          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="icon"
            className="md:hidden p-2"
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        categories={mobileMenuCategories}
        links={mobileMenuLinks}
        languages={languages}
        currentLanguage={i18n.language}
        onLanguageChange={handleLanguageChange}
        categoriesTitle={mobileMenuCategoriesTitle}
        className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-[#f9fafb] dark:bg-gray-950"
      />
    </header>
  );
}
