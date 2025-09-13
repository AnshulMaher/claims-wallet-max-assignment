'use client';

import { useEffect } from 'react';
import '@/shared/utils/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {}, []);

  return <>{children}</>;
}
