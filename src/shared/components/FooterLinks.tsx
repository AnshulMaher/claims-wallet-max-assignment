'use client';

import React, { Fragment } from 'react';
import { Label } from './Label';

export interface LinkItem {
  id: string;
  label: string;
  href: string;
}

export interface FooterLinksProps {
  links: LinkItem[];
  className?: string;
  linkClassName?: string;
  separatorClassName?: string;
  separator?: string;
}

export function FooterLinks({
  links,
  className,
  linkClassName,
  separatorClassName,
  separator = '|',
}: FooterLinksProps) {
  return (
    <div className={className}>
      {links.map((link, index) => (
        <Fragment key={link.id || index}>
          <a
            href={link.href}
            className={`hover:text-blue-600 transition-colors duration-200 ${linkClassName || ''}`}
          >
            <Label as="span" variant="body-sm">
              {link.label}
            </Label>
          </a>
          {index !== links.length - 1 && (
            <Label as="span" variant="body-sm" className={separatorClassName}>
              {separator}
            </Label>
          )}
        </Fragment>
      ))}
    </div>
  );
}
