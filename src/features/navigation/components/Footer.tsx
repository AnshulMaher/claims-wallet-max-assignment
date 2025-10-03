'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { footerData } from '@/features/navigation/data/footerData';
import { Label } from '@/shared/components/Label';
import { FooterLinks } from '@/shared/components/FooterLinks';

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
              <Label variant="body-sm" className="mb-4">
                {footerData.disclaimer}
              </Label>
              <Label variant="body-sm" className="mb-4">
                {footerData.customerService}
              </Label>
              <FooterLinks
                links={footerData.links}
                className="flex items-center justify-center gap-4 text-sm"
              />
              <Label variant="body-sm" className="mt-4">
                {footerData.copyright}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
