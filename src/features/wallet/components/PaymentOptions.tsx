'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VirtualCard } from '@/shared/components/VirtualCard';
import { PaymentOption } from '@/shared/components/PaymentOption';
import { virtualCardData } from '@/features/wallet/data/virtualCardData';
import { paymentMethods } from '@/features/wallet/data/paymentMethods';
import { Label } from '@/shared/components/Label';
import {
  paymentMethodNames,
  paymentOptionsTextData,
} from '../data/paymentMethods';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const data = Object.values(paymentMethods).slice(1);

interface PaymentOptionsProps {
  onSelectPaymentMethod: (methodName: string) => void;
}

export function PaymentOptions({ onSelectPaymentMethod }: PaymentOptionsProps) {
  return (
    <div>
      <Label as="h2" variant="h2" className="mb-8 text-center">
        {paymentOptionsTextData.title}
      </Label>
      <div className={'grid md:grid-cols-2 gap-6'}>
        <motion.div className="md:col-span-2" variants={cardVariants}>
          <VirtualCard
            {...virtualCardData}
            onSelect={() =>
              onSelectPaymentMethod(paymentMethodNames.virtualCard)
            }
          />
        </motion.div>

        {data.map((option) => (
          <motion.div key={option.id} variants={cardVariants}>
            <PaymentOption {...option} onSelect={onSelectPaymentMethod} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
