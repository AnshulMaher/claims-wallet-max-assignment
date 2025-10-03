'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Label } from './Label';
import { Button } from './Button';
export interface NavigationDropdownItem {
  id: string;
  label: string;
  categories: {
    id: string;
    label: string;
    description: string;
    items: {
      id: string;
      label: string;
      description: string;
      icon: React.ComponentType<{ className?: string }>;
      href: string;
      divider?: boolean;
      isSummary?: boolean;
    }[];
  }[];
}

export interface NavigationLinkItem {
  id: string;
  label: string;
  href: string;
}

export type NavigationItemType = NavigationDropdownItem | NavigationLinkItem;

export interface DesktopNavigationProps {
  items: NavigationItemType[];
  className?: string;
}

export function DesktopNavigation({
  items,
  className,
}: DesktopNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isDropdownItem = (
    item: NavigationItemType
  ): item is NavigationDropdownItem => {
    return 'categories' in item;
  };

  const isLinkItem = (item: NavigationItemType): item is NavigationLinkItem => {
    return 'href' in item;
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className="relative">
          {isDropdownItem(item) ? (
            <>
              <Button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.id ? null : item.id)
                }
                onBlur={() => setTimeout(() => setOpenDropdown(null), 200)}
                variant="text"
                size="sm"
                className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 flex items-center gap-1 p-0"
                rightIcon={<ChevronDown className="h-4 w-4" />}
              >
                {item.label}
              </Button>

              {openDropdown === item.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] max-w-[90vw] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-8">
                    {item.categories.map((category, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                          <Label
                            as="h3"
                            className="font-semibold text-gray-900 dark:text-white"
                          >
                            {category.label}
                          </Label>
                          <Label
                            variant="body-sm"
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {category.description}
                          </Label>
                        </div>
                        <div className="grid gap-3">
                          {category.items.map((navItem, itemIdx) => {
                            const Icon = navItem.icon;
                            return (
                              <React.Fragment key={itemIdx}>
                                <a
                                  href={navItem.href}
                                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  {Icon && (
                                    <div className="flex-none">
                                      <div
                                        className={`p-2 rounded-lg ${
                                          navItem.isSummary
                                            ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                                            : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                                        }`}
                                      >
                                        <Icon className="h-5 w-5" />
                                      </div>
                                    </div>
                                  )}
                                  <div>
                                    <Label
                                      as="h4"
                                      className="font-medium text-gray-900 dark:text-gray-100 mb-1"
                                    >
                                      {navItem.label}
                                    </Label>
                                    <Label
                                      variant="body-sm"
                                      className="text-gray-600 dark:text-gray-400"
                                    >
                                      {navItem.description}
                                    </Label>
                                  </div>
                                </a>
                                {navItem.divider && (
                                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : isLinkItem(item) ? (
            <a
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              {item.label}
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
