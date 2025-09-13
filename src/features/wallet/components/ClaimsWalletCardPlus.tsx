'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { appConfig } from '@/shared/utils/appConfig';

interface ClaimsWalletCardPlusProps {
  balance: number;
  claimNumber?: string;
  onRefresh?: () => void;
  className?: string;
}

export function ClaimsWalletCardPlus({
  balance,
  claimNumber = appConfig.defaultClaimNumber,
  onRefresh = () => {},
  className = '',
}: ClaimsWalletCardPlusProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-4 md:p-7 text-white relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="wallet-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 relative z-10 gap-4">
        <div className="flex items-center gap-3">
          <Wallet
            className="h-8 w-8 md:h-10 md:w-10"
            data-testid="wallet-icon"
          />
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Your Claims Wallet
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Claim #{claimNumber}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="px-4 md:px-6 py-2 md:py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm md:text-base"
          data-testid="refresh-wallet"
        >
          <RefreshCw
            className="h-4 w-4 md:h-5 md:w-5"
            data-testid="refresh-icon"
          />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-4 md:py-6">
        <div className="text-white/80 text-base md:text-lg mb-2">
          Available Balance
        </div>
        <div
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
          data-testid="balance"
        >
          ${balance.toLocaleString(undefined)}
        </div>
        <div className="text-white/70 flex items-center gap-2 text-sm md:text-base">
          <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
          <span>Funds ready for immediate use</span>
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
