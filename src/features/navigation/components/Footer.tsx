'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { footerData } from '@/features/navigation/data/footerData';

export function Footer() {
  const {} = useTranslation();

  return (
    <footer className="bg-[#F2F4F7] text-gray-700 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-sm mb-4">{footerData.disclaimer}</p>
              <p className="text-sm mb-4">{footerData.customerService}</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                {footerData.links.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <a href={link.href} className="hover:text-blue-600">
                      {link.label}
                    </a>
                    {index < footerData.links.length - 1 && (
                      <span className="text-gray-400">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-sm mt-4">{footerData.copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
