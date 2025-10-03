'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Label } from './Label';
import { Button } from './Button';

export interface MobileMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  isSummary?: boolean;
  divider?: boolean;
}

export interface MobileMenuCategory {
  id: string;
  label: string;
  description?: string;
  items: MobileMenuItem[];
}

export interface MobileMenuLink {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface MobileMenuLanguage {
  code: string;
  name: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  categories: MobileMenuCategory[];
  links: MobileMenuLink[];
  languages: MobileMenuLanguage[];
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  categoriesTitle?: string;
  className?: string;
}

export function MobileMenu({
  isOpen,
  categories,
  links,
  languages,
  currentLanguage,
  onLanguageChange,
  categoriesTitle = 'Categories',
  className,
}: MobileMenuProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryToggle = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <Label
                as="div"
                variant="body-sm"
                className="font-medium text-gray-600 dark:text-gray-400"
              >
                {categoriesTitle}
              </Label>

              {categories.map((category) => (
                <div key={category.id} className="mb-3">
                  <Button
                    onClick={() => handleCategoryToggle(category.id)}
                    variant="secondary"
                    className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800"
                    rightIcon={
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openCategory === category.id ? 'rotate-180' : ''
                        }`}
                      />
                    }
                  >
                    <Label as="span" className="font-medium">
                      {category.label}
                    </Label>
                  </Button>

                  {openCategory === category.id && (
                    <div className="mt-2 ml-4 space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <React.Fragment key={itemIdx}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && (
                                <div
                                  className={`p-1.5 rounded-md ${
                                    item.isSummary
                                      ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                                      : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                                  }`}
                                >
                                  <item.icon className="h-4 w-4" />
                                </div>
                              )}
                              <Label as="div" className="font-medium">
                                {item.label}
                              </Label>
                            </div>
                            {item.description && (
                              <Label
                                as="div"
                                variant="body-sm"
                                className="text-gray-600 dark:text-gray-400 mt-1"
                              >
                                {item.description}
                              </Label>
                            )}
                          </a>
                          {item.divider && (
                            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {links.length > 0 && (
              <div className="space-y-2">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Label as="div" className="font-medium">
                      {link.label}
                    </Label>
                    {link.description && (
                      <Label
                        as="div"
                        variant="body-sm"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {link.description}
                      </Label>
                    )}
                  </a>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label
                as="div"
                variant="body-sm"
                className="font-medium text-gray-600 dark:text-gray-400"
              >
                Language
              </Label>
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  variant={currentLanguage === lang.code ? 'text' : 'secondary'}
                  className={`w-full text-left px-4 py-2 ${
                    currentLanguage === lang.code
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Label as="span">{lang.name}</Label>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
