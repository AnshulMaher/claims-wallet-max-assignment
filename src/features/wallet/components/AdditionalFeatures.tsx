import React from 'react';
import { FeatureCard } from '@/shared/components/FeatureCard';
import { additionalFeaturesData } from '@/features/wallet/data/additionalFeaturesData';

export function AdditionalFeatures() {
  return (
    <div>
      <div className={'grid md:grid-cols-3 gap-8'}>
        {additionalFeaturesData.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
}
