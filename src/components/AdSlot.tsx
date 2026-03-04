"use client";

import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface Props {
  adSlot: string;
  className?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
}

export default function AdSlot({ adSlot, className = '', format = 'auto' }: Props) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!adClient || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore duplicate push errors during fast refresh/navigation.
    }
  }, [adClient, adSlot]);

  if (!adClient || !adSlot) return null;

  return (
    <div className={`my-8 ${className}`}>
      <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Advertisement</p>
      <ins
        className="adsbygoogle block bg-surface-hover rounded-lg border border-surface-border"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
