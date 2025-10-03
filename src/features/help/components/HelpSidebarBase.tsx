'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Label } from '@/shared/components/Label';
import { Button } from '@/shared/components/Button';

interface HelpItem {
  title: string;
  description: string;
}

interface HelpSection {
  title: string;
  items: HelpItem[];
}

interface PageHelp {
  title: string;
  description: string;
  sections?: HelpSection[];
  features?: HelpItem[];
}

interface HelpSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  content: PageHelp;
}

export function HelpSidebarBase({
  isOpen,
  onClose,
  content,
}: HelpSidebarProps) {
  const [width, setWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(width);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const minWidth = 300;
  const maxWidth = 600;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(width);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartWidth(width);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = startWidth - (e.clientX - startX);
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    },
    [isDragging, startWidth, startX, minWidth, maxWidth]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const newWidth = startWidth - (e.touches[0].clientX - startX);
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    },
    [isDragging, startWidth, startX, minWidth, maxWidth]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as Element;

      if (target.closest('.help-toggle-button')) {
        return;
      }

      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const backdropVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const contentVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            key="backdrop"
          />

          <motion.div
            ref={sidebarRef}
            className="fixed top-5 right-5 bottom-5 rounded-lg bg-white dark:bg-gray-900 shadow-xl flex flex-col overflow-hidden origin-top-right z-50"
            style={{ width: `${width}px` } as React.CSSProperties}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            key="sidebar"
            role="complementary"
            aria-label="Help Center"
          >
            <div
              ref={resizeHandleRef}
              className={`absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500/50 group z-10 ${
                isDragging ? 'bg-blue-500' : ''
              }`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              data-testid="resize-handle"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover:bg-blue-500/50"></div>
            </div>

            <motion.div
              className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
              variants={contentVariants}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <Label as="h2" className="text-lg font-semibold">
                  Help & Information
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    if (width > minWidth) setWidth(width - 50);
                  }}
                  variant="icon"
                  className="p-1"
                  disabled={width <= minWidth}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => {
                    if (width < maxWidth) setWidth(width + 50);
                  }}
                  variant="icon"
                  className="p-1"
                  disabled={width >= maxWidth}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={onClose}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Escape') {
                      onClose();
                    }
                  }}
                  variant="icon"
                  className="p-1"
                  data-testid="close-help"
                  aria-label="Close help"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="flex-grow overflow-y-auto px-6 py-4 overflow-y-auto"
              variants={contentVariants}
            >
              <motion.div className="mb-6" variants={itemVariants}>
                <Label as="h3" variant="h3" className="mb-2">
                  {content.title}
                </Label>
                <Label className="text-gray-600 dark:text-gray-400">
                  {content.description}
                </Label>
              </motion.div>

              {content.sections &&
                content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <Label
                      as="h4"
                      className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400"
                    >
                      {section.title}
                    </Label>
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                          variants={itemVariants}
                        >
                          <Label as="h5" variant="h5" className="mb-2">
                            {item.title}
                          </Label>
                          <Label
                            variant="body-sm"
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {item.description}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

              {!content.sections && content.features && (
                <motion.div className="space-y-4" variants={itemVariants}>
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                      variants={itemVariants}
                    >
                      <Label as="h4" variant="h4" className="mb-2">
                        {feature.title}
                      </Label>
                      <Label
                        variant="body-sm"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {feature.description}
                      </Label>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="p-4 border-t border-gray-200 dark:border-gray-700"
              variants={contentVariants}
            >
              <Label
                variant="body-sm"
                className="text-gray-500 dark:text-gray-400"
              >
                Need more help? Contact support at{' '}
                <a
                  href="mailto:support@juicefin.com"
                  className="text-blue-600 hover:underline"
                >
                  support@juicefin.com
                </a>
              </Label>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
