import { Shield, Globe, Clock } from 'lucide-react';
import { FeatureCardData } from '@/shared/components/FeatureCard';

export const additionalFeaturesData: FeatureCardData[] = [
  {
    id: 'secure-access',
    title: 'Secure Access',
    description: 'Bank-grade security protecting your virtual card details',
    icon: Shield,
    iconColorScheme: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
  },
  {
    id: 'global-acceptance',
    title: 'Global Acceptance',
    description: 'Use your virtual card anywhere Mastercard is accepted',
    icon: Globe,
    iconColorScheme: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
  },
  {
    id: 'real-time-updates',
    title: 'Real-time Updates',
    description: 'Track transactions and balance updates instantly',
    icon: Clock,
    iconColorScheme: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
  },
];
