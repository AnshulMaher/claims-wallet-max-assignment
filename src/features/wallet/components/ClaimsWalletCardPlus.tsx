'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { Label } from '@/shared/components/Label';
import { walletData } from '../data/walletData';
import { claimsWalletCardPlusTextData } from '../data/claimsWalletCardPlusData';

interface ClaimsWalletCardPlusProps {
  onRefresh?: () => void;
  className?: string;
}

export function ClaimsWalletCardPlus({
  onRefresh = () => {},
  className = '',
}: ClaimsWalletCardPlusProps) {
  const balance = walletData.balance;
  const claimNumber = walletData.claimNumber || 'CLM-2024-0078';
  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-7 text-white relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="wallet-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 relative z-10 gap-4">
        <div className="flex items-center gap-3">
          <Wallet className="h-10 w-10" data-testid="wallet-icon" />
          <div>
            <Label as="h2" variant="h2" className="text-3xl">
              {claimsWalletCardPlusTextData.title}
            </Label>
            <Label className="text-white/80">Claim #{claimNumber}</Label>
          </div>
        </div>
        <Button
          type="button"
          onClick={onRefresh}
          size="lg"
          className="bg-white/20 hover:bg-white/30 text-white font-medium"
          data-testid="refresh-wallet"
          leftIcon={
            <RefreshCw
              className="h-4 w-4 md:h-5 md:w-5"
              data-testid="refresh-icon"
            />
          }
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center py-4 md:py-6">
        <div className="text-lg text-white/80 mb-2">
          {claimsWalletCardPlusTextData.availableBalance}
        </div>
        <div className="text-6xl font-bold mb-3" data-testid="balance">
          ${balance.toLocaleString(undefined)}
        </div>
        <div className="text-white/70 flex items-center gap-2 text-base">
          <CheckCircle2 className="h-5 w-5" />
          <span>{claimsWalletCardPlusTextData.fundsReady}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        >
          <ArrowRight className="h-8 w-8" />
        </motion.div>
      </div>
    </motion.div>
  );
}
