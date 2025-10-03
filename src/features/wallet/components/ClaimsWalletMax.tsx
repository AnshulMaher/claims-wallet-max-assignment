'use client';

import React, { useState } from 'react';
import { ChatBubble } from '@/features/chat/components/ChatBubble';
import { HelpSidebarBase } from '@/features/help/components/HelpSidebarBase';
import { claimsWalletPlusHelp } from '@/features/help/data/pageHelpContent';
import { PageHelpButton } from '@/features/help/components/PageHelpButton';
import { walletHeroData } from '../data/walletData';
import { ClaimsWalletCardPlus } from './ClaimsWalletCardPlus';
import { HeroSection } from '@/shared/components/HeroSection';
import { PaymentOptions } from './PaymentOptions';
import { RecentTransactions } from './RecentTransactions';
import { AdditionalFeatures } from './AdditionalFeatures';
import { OTPVerificationModal } from './OTPVerificationModal';
import { PaymentTransferModal } from './PaymentTransferModal';
import { paymentMethods, PaymentMethod } from '../data/paymentMethods';

export function ClaimsWalletMax() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<PaymentMethod | null>(null);

  const toggleHelpSidebar = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleSelectPaymentMethod = (methodName: string) => {
    setModalConfig(paymentMethods[methodName] || null);
    setShowTransferModal(true);
  };

  const handleRefreshWallet = () => {
    setShowTransferModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FF] dark:bg-gray-950">
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <HeroSection
            logo={walletHeroData.logo}
            title={walletHeroData.title}
            description={walletHeroData.description}
            className="max-w-4xl mx-auto text-center mb-14"
          />

          <div className="max-w-5xl mx-auto mb-10">
            <ClaimsWalletCardPlus onRefresh={handleRefreshWallet} />
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <PaymentOptions onSelectPaymentMethod={handleSelectPaymentMethod} />
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <RecentTransactions />
          </div>

          <div className="max-w-5xl mx-auto">
            <AdditionalFeatures />
          </div>
        </div>
      </main>

      <div className="fixed top-20 right-4 z-40">
        <PageHelpButton onClick={toggleHelpSidebar} isOpen={isHelpOpen} />
      </div>

      <HelpSidebarBase
        isOpen={isHelpOpen}
        onClose={toggleHelpSidebar}
        content={claimsWalletPlusHelp}
      />

      <ChatBubble />

      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={(otp) => {
          console.log('OTP verified:', otp);
          setShowOTPModal(false);
        }}
        onResend={() => {
          console.log('Resend OTP requested');
        }}
      />

      <PaymentTransferModal
        isOpen={showTransferModal}
        onClose={() => {
          setShowTransferModal(false);
        }}
        paymentMethod={modalConfig?.name || ''}
        processingTime={modalConfig?.processingTime || ''}
      />
    </div>
  );
}
