'use client';

import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import {
  otpVerificationTextData,
  otpVerificationConfig,
} from '../data/otpVerificationData';
import { Label } from '@/shared/components/Label';
import { FormField } from '@/shared/components/FormField';

export interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend?: () => void;
}

export function OTPVerificationModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
}: OTPVerificationModalProps) {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setOtpError(otpVerificationTextData.validation.requiredLength);
      return;
    }

    if (otp === otpVerificationConfig.otpCode) {
      onVerify(otp);
      handleClose();
    } else {
      setOtpError(otpVerificationTextData.validation.invalidCode);
    }
  };

  const handleClose = () => {
    setOtp('');
    setOtpError('');
    setAcceptedTerms(false);
    onClose();
  };

  const handleResend = () => {
    if (onResend) {
      onResend();
    }
    setOtp('');
    setOtpError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={otpVerificationTextData.title}
      icon={KeyRound}
      size="md"
    >
      <Label className="text-gray-600 dark:text-gray-400 mb-6">
        {otpVerificationTextData.description}
      </Label>

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
            placeholder={otpVerificationTextData.placeholder}
            className="w-full px-4 py-2 text-center text-2xl tracking-wider rounded-lg border border-gray-200 dark:border-gray-700"
            maxLength={6}
          />
          {otpError && (
            <Label
              variant="body-sm"
              className="text-red-600 dark:text-red-400 mt-2"
            >
              {otpError}
            </Label>
          )}
        </div>

        <Button
          onClick={handleVerify}
          variant="gradient"
          size="lg"
          fullWidth
          disabled={!acceptedTerms}
          rightIcon={<ArrowRight className="h-5 w-5" />}
        >
          {otpVerificationTextData.verifyButton}
        </Button>

        <div className="text-center">
          <Button onClick={handleResend} variant="text" size="sm">
            {otpVerificationTextData.resendButton}
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <FormField
            type="checkbox"
            label=""
            value={acceptedTerms}
            onChange={(value) => setAcceptedTerms(value)}
            id="terms"
          />
          <Label as="label" htmlFor="terms">
            {otpVerificationTextData.termsText}{' '}
            <a
              href={otpVerificationTextData.termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {otpVerificationTextData.termsLink}
            </a>
          </Label>
        </div>
      </div>
    </Modal>
  );
}
