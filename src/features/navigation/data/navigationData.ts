import { NavigationItemType } from '@/shared/components/DesktopNavigation';
import {
  MobileMenuCategory,
  MobileMenuLink,
} from '@/shared/components/MobileMenu';
import {
  DollarSign,
  CreditCard,
  FileText,
  Link,
  Building2,
  Home,
  Globe,
  Wallet,
} from 'lucide-react';

const paymentSolutionsCategories = [
  {
    id: 'incoming-payments',
    label: 'Incoming Payments',
    description:
      'Solutions for processing premium payments and policy purchases',
    items: [
      {
        id: 'incoming-payments-summary',
        label: 'Incoming Payments Summary',
        description: 'Overview of our incoming payment solutions',
        icon: DollarSign,
        href: '/incoming-payments',
        divider: true,
        isSummary: true,
      },
      {
        id: 'premium-pay-agent',
        label: 'Premium Pay - Agent',
        description: 'Process premium payments for insurance agents',
        icon: CreditCard,
        href: '/premium-pay-agent',
      },
      {
        id: 'premium-pay-client',
        label: 'Premium Pay - Client',
        description: 'Pay your insurance premium securely and conveniently',
        icon: CreditCard,
        href: '/premium-pay-client',
      },
      {
        id: 'policy-hub',
        label: 'Policy Hub',
        description: 'Access and manage your policy details and documents',
        icon: FileText,
        href: '/policy-hub',
      },
    ],
  },
  {
    id: 'outgoing-payments',
    label: 'Outgoing Payments',
    description: 'Solutions for processing claims and beneficiary payments',
    items: [
      {
        id: 'outgoing-payments-summary',
        label: 'Outgoing Payments Summary',
        description: 'Overview of our outgoing payment solutions',
        icon: DollarSign,
        href: '/outgoing-payments',
        divider: true,
        isSummary: true,
      },
      {
        id: 'pay-link',
        label: 'Pay Link',
        description: 'Create a one-time payment link with customizable options',
        icon: Link,
        href: '/pay-link',
      },
      {
        id: 'pay-partners',
        label: 'Pay Partners',
        description:
          'Process payments to partners, agents, and service providers',
        icon: Building2,
        href: '/pay-partners',
      },
      {
        id: 'pay-claims',
        label: 'Pay Claims',
        description: 'Pay claims instantly with flexible payment methods',
        icon: CreditCard,
        href: '/claim-payment-lander',
      },
    ],
  },
  {
    id: 'domestic-international',
    label: 'Domestic & International',
    description: 'Solutions for processing payments domestically and globally',
    items: [
      {
        id: 'domestic-payments-summary',
        label: 'Domestic Payments Summary',
        description: 'Payment solutions for the United States',
        icon: Home,
        href: '/domestic-payments',
        isSummary: true,
      },
      {
        id: 'international-payments-summary',
        label: 'International Payments Summary',
        description: 'Global payment solutions for cross-border transactions',
        icon: Globe,
        href: '/international-payments',
        divider: true,
      },
      {
        id: 'virtual-claims-card',
        label: 'Virtual Claims Card',
        description: 'Issue instant virtual cards for claims payments',
        icon: CreditCard,
        href: '/virtual-claims-card',
      },
      {
        id: 'claims-wallet-solutions',
        label: 'Claims Wallet Solutions',
        description: 'Digital wallet solutions for managing claim funds',
        icon: Wallet,
        href: '/claims-wallet',
      },
    ],
  },
];

export const navigationItems: NavigationItemType[] = [
  {
    id: 'payment-solutions',
    label: 'PAYMENT SOLUTIONS',
    categories: paymentSolutionsCategories,
  },
  {
    id: 'faqs',
    label: 'FAQs',
    href: '/rfp',
  },
];
export const mobileMenuCategoriesTitle = 'PAYMENT SOLUTIONS';

export const mobileMenuCategories: MobileMenuCategory[] =
  paymentSolutionsCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    description: cat.description,
    items: cat.items.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      icon: item.icon,
      description: item.description,
      isSummary: item.isSummary,
      divider: item.divider,
    })),
  }));

export const mobileMenuLinks: MobileMenuLink[] = [
  {
    id: 'faqs',
    label: 'FAQs',
    href: '/rfp',
    description: 'Frequently Asked Questions',
  },
];
