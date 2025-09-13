export interface FooterData {
  disclaimer: string;
  customerService: string;
  links: FooterLink[];
  copyright: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export const footerData: FooterData = {
  disclaimer:
    'Juice is not a bank. Banking services are provided by First Century Bank, N.A., Member FDIC, pursuant to a license from Mastercard International.',
  customerService: 'For customer service please call Juice: (855)-687-2114.',
  links: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/legal' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  copyright:
    '© 2025 Juice Financial. All rights reserved. Juice Insurance v1.3.0',
};
