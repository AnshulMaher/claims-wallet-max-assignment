'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChatBubble } from '@/features/chat/components/ChatBubble';
import {
  Shield,
  Clock,
  ArrowRight,
  CreditCard,
  X,
  Globe,
  KeyRound,
  Wallet,
  DollarSign,
  Check,
} from 'lucide-react';
import { HelpSidebarBase } from '@/features/help/components/HelpSidebarBase';
import { claimsWalletPlusHelp } from '@/features/help/data/pageHelpContent';
import { paymentMethods } from '@/features/wallet/data/paymentMethods';
import { walletData } from '@/features/wallet/data/walletData';
import { transactions } from '@/features/wallet/data/transactionData';
import { appConfig } from '@/shared/utils/appConfig';
import { PageHelpButton } from '@/features/help/components/PageHelpButton';
import { ClaimsWalletCardPlus } from './ClaimsWalletCardPlus';
import { cn } from '@/shared/utils/utils';

const colors: Record<string, { bg: string; text: string }> = {
  'direct-card': {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
  },
  ach: {
    bg: 'bg-purple-50',
    text: 'dark:text-purple-50',
  },
  default: {
    bg: 'bg-amber-50',
    text: 'dark:text-amber-50',
  },
};

export function ClaimsWalletMax() {
  const {} = useTranslation();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [modalPaymentMethod, setModalPaymentMethod] = useState('');

  const toggleHelpSidebar = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit code');
      return;
    }

    if (otp === appConfig.otpCode) {
      setShowOTPModal(false);
      setOtp('');
      setOtpError('');
    } else {
      setOtpError('Invalid verification code');
    }
  };

  const handleSelectPaymentMethod = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method) {
      setModalPaymentMethod(method.name);
      setShowTransferModal(true);
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0 || amount > walletData.balance) {
      return;
    }

    setTransferInProgress(true);

    setTimeout(() => {
      setTransferInProgress(false);
      setTransferSuccess(true);

      setTimeout(() => {
        setShowTransferModal(false);
        setTransferSuccess(false);
        setTransferAmount('');
      }, appConfig.transferTimeouts.success);
    }, appConfig.transferTimeouts.processing);
  };

  const handleRefreshWallet = () => {
    setShowTransferModal(true);
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FF] dark:bg-gray-950">
      <main className="flex-grow md:pt-8">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-14">
            <div className="mb-6 md:mb-8 flex justify-center">
              <Image
                src={appConfig.logo.src}
                alt={appConfig.logo.alt}
                width={appConfig.logo.width}
                height={appConfig.logo.height}
                className="h-12 md:h-16"
                priority={true}
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {appConfig.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              {appConfig.description}
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-10">
            <ClaimsWalletCardPlus
              balance={walletData.balance}
              onRefresh={handleRefreshWallet}
            />
          </div>

          <motion.div
            className="max-w-5xl mx-auto mb-12 md:mb-16"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center px-4">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
              <motion.div className="md:col-span-2" variants={cardVariants}>
                <button
                  onClick={() => handleSelectPaymentMethod('virtual-card')}
                  className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600/50 dark:border-blue-500/30 flex flex-col md:flex-row items-center text-left gap-4 md:gap-6 relative overflow-hidden group"
                >
                  <div className="w-full max-w-[200px] h-[120px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex-shrink-0 shadow-lg relative">
                    <div className="absolute top-2 left-2">
                      <Image
                        src="/Juice-2024-Logo-2000x800.png"
                        alt="Juice Financial"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Image
                        src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg"
                        alt="Mastercard"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/70">
                      **** 4444
                    </div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <CreditCard className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold">
                          Virtual Mastercard
                        </h3>
                      </div>
                      <div className="sm:ml-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          INSTANT
                        </span>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3">
                      Get instant access to your funds with a virtual Mastercard
                      that can be used anywhere online or added to your mobile
                      wallet.
                    </p>
                    <div className="flex items-center text-blue-600">
                      <span className="font-medium text-sm md:text-base">
                        Select Virtual Card
                      </span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Background glow effect on hover */}
                  <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>

              {paymentMethods.slice(1).map((method) => (
                <motion.div key={method.id} variants={cardVariants}>
                  <button
                    onClick={() => handleSelectPaymentMethod(method.id)}
                    className="w-full h-full bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col text-left gap-3 md:gap-4 relative overflow-hidden group"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className={cn(
                          'p-2 rounded-full',
                          colors[method.id]?.bg || colors.default.bg,
                          colors[method.id]?.text || colors.default.text
                        )}
                      >
                        <method.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold">{method.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {method.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {method.timeframe}
                      </span>
                      <span className="text-blue-600 flex items-center text-sm">
                        <span>Select</span>
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gray-600/5 dark:bg-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-12 md:mb-16 px-4 md:px-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Recent Transactions
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-4">Date</th>
                      <th className="text-left py-4 px-4">Description</th>
                      <th className="text-left py-4 px-4">Amount</th>
                      <th className="text-left py-4 px-4">Status</th>
                      <th className="text-left py-4 px-4">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-4 px-4">{transaction.date}</td>
                        <td className="py-4 px-4">{transaction.description}</td>
                        <td className="py-4 px-4">{transaction.amount}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              transaction.status === 'Completed'
                                ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : transaction.status === 'Processing'
                                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                  : transaction.status === 'Pending'
                                    ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                    : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {transaction.paymentMethod || transaction.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6">
                <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Bank-grade security protecting your virtual card details
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6">
                <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Global Acceptance
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use your virtual card anywhere Mastercard is accepted
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6">
                <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Real-time Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track transactions and balance updates instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-16 md:top-20 right-2 md:right-4 z-40">
        <PageHelpButton onClick={toggleHelpSidebar} isOpen={isHelpOpen} />
      </div>

      <HelpSidebarBase
        isOpen={isHelpOpen}
        onClose={toggleHelpSidebar}
        content={claimsWalletPlusHelp}
      />

      <ChatBubble />

      {showOTPModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 max-w-md w-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <KeyRound className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold">Enter OTP Code</h3>
              </div>
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setOtp('');
                  setOtpError('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                data-testid="close-otp-modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please enter the 6-digit OTP code sent to your registered mobile
              number.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    setOtpError('');
                  }}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 text-center text-2xl tracking-wider rounded-lg border border-gray-200 dark:border-gray-700"
                  maxLength={6}
                />
                {otpError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {otpError}
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyOTP}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                disabled={!acceptedTerms}
                style={{
                  opacity: acceptedTerms ? 1 : 0.5,
                  cursor: acceptedTerms ? 'pointer' : 'not-allowed',
                }}
              >
                Verify & Transfer
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Resend Code
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="terms">
                  I accept the{' '}
                  <a
                    href="https://juicefin.com/wp-content/uploads/2024/10/CLL-09272024-001.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Cardholder Terms & Conditions
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showTransferModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!transferInProgress && !transferSuccess) {
                setShowTransferModal(false);
                setTransferAmount('');
              }
            }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 max-w-md w-full overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!transferSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-bold">
                        {transferInProgress
                          ? 'Processing...'
                          : `Transfer to ${modalPaymentMethod}`}
                      </h3>
                    </div>
                    {!transferInProgress && (
                      <button
                        onClick={() => {
                          setShowTransferModal(false);
                          setTransferAmount('');
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    )}
                  </div>

                  {transferInProgress ? (
                    <div className="py-10 flex flex-col items-center justify-center">
                      <div className="mb-6">
                        <motion.div
                          className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </div>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Transferring funds to your{' '}
                        {modalPaymentMethod.toLowerCase()}...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex items-center">
                        <DollarSign className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Available Balance
                          </div>
                          <div className="text-xl font-bold">
                            ${walletData.balance.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                          Transfer Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xl"
                            min="0.01"
                            max={walletData.balance}
                            step="0.01"
                          />
                        </div>
                      </div>

                      {modalPaymentMethod === paymentMethods[2].name && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                              placeholder="Enter bank name"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Routing Number
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                                placeholder="9 digits"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Account Number
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                                placeholder="Account number"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {modalPaymentMethod === paymentMethods[1].name && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                              placeholder="Card number"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Zip Code
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                                placeholder="Billing zip code"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {modalPaymentMethod === paymentMethods[3].name && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Mailing Address
                            </label>
                            <textarea
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                              placeholder="Enter your mailing address"
                              rows={3}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {modalPaymentMethod === paymentMethods[0].name
                              ? 'Available immediately'
                              : modalPaymentMethod === paymentMethods[1].name
                                ? 'Typically takes 10-30 minutes'
                                : modalPaymentMethod === paymentMethods[2].name
                                  ? 'Processing time: 1-3 business days'
                                  : 'Delivery time: 5-7 business days'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Secure, encrypted transfer</span>
                        </div>
                      </div>

                      <button
                        onClick={handleTransfer}
                        disabled={
                          !transferAmount ||
                          parseFloat(transferAmount) <= 0 ||
                          parseFloat(transferAmount) > walletData.balance
                        }
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all 
                          ${
                            !transferAmount ||
                            parseFloat(transferAmount) <= 0 ||
                            parseFloat(transferAmount) > walletData.balance
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                          }`}
                      >
                        <span>Transfer Funds</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Transfer Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    ${parseFloat(transferAmount).toFixed(2)} has been sent to
                    your {modalPaymentMethod.toLowerCase()}.
                  </p>
                  <button
                    onClick={() => {
                      setShowTransferModal(false);
                      setTransferSuccess(false);
                      setTransferAmount('');
                    }}
                    className="px-6 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
