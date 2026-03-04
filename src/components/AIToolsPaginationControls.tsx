"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  useClientPagination?: boolean;
  filters?: {
    q?: string;
    category?: string;
    pricing?: string;
  };
}

function getPageUrl(page: number, filters?: Props['filters']): string {
  const base = page === 1 ? '/ai-tools' : `/ai-tools/${page}`;
  const params = new URLSearchParams();
  if (filters?.q) params.set('q', filters.q);
  if (filters?.category) params.set('category', filters.category);
  if (filters?.pricing) params.set('pricing', filters.pricing);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

function buildPages(currentPage: number, totalPages: number): number[] {
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
    if (i > 1 && i < totalPages) pages.add(i);
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export default function AIToolsPaginationControls({ currentPage, totalPages, filters, onPageChange, useClientPagination = false }: Props) {
  const [loadingPage, setLoadingPage] = useState<number | null>(null);

  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  const goToPage = (page: number) => {
    setLoadingPage(page);
    if (onPageChange) onPageChange(page);
    setTimeout(() => setLoadingPage(null), 150);
  };

  return (
    <nav aria-label="AI tools pagination" className="flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && !useClientPagination && (
        <Link
          href={getPageUrl(currentPage - 1, filters)}
          onClick={() => setLoadingPage(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-surface-border bg-surface-hover text-gray-200 hover:bg-surface-border transition-colors text-sm font-semibold"
        >
          {loadingPage === currentPage - 1 ? 'Loading...' : 'Previous'}
        </Link>
      )}
      {currentPage > 1 && useClientPagination && (
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-surface-border bg-surface-hover text-gray-200 hover:bg-surface-border transition-colors text-sm font-semibold"
        >
          {loadingPage === currentPage - 1 ? 'Loading...' : 'Previous'}
        </button>
      )}

      {pages.map((page) => {
        const active = page === currentPage;
        if (useClientPagination) {
          return (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={active ? 'page' : undefined}
              className={`min-w-10 px-3 py-2 rounded-lg border text-sm font-semibold text-center transition-colors ${
                active
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-surface-hover text-gray-200 border-surface-border hover:bg-surface-border'
              }`}
            >
              {loadingPage === page && !active ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                  <span>{page}</span>
                </span>
              ) : (
                page
              )}
            </button>
          );
        }

        return (
          <Link
            key={page}
            href={getPageUrl(page, filters)}
            onClick={() => setLoadingPage(page)}
            aria-current={active ? 'page' : undefined}
            className={`min-w-10 px-3 py-2 rounded-lg border text-sm font-semibold text-center transition-colors ${
              active
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-surface-hover text-gray-200 border-surface-border hover:bg-surface-border'
            }`}
          >
            {loadingPage === page && !active ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                <span>{page}</span>
              </span>
            ) : (
              page
            )}
          </Link>
        );
      })}

      {currentPage < totalPages && !useClientPagination && (
        <Link
          href={getPageUrl(currentPage + 1, filters)}
          onClick={() => setLoadingPage(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-surface-border bg-surface-hover text-gray-200 hover:bg-surface-border transition-colors text-sm font-semibold"
        >
          {loadingPage === currentPage + 1 ? 'Loading...' : 'Next'}
        </Link>
      )}
      {currentPage < totalPages && useClientPagination && (
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-surface-border bg-surface-hover text-gray-200 hover:bg-surface-border transition-colors text-sm font-semibold"
        >
          {loadingPage === currentPage + 1 ? 'Loading...' : 'Next'}
        </button>
      )}
    </nav>
  );
}
