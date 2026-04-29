
"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Tool } from '@/lib/data';
import { AI_TOOLS_PER_PAGE } from '@/lib/constants';
import AIToolsPaginationControls from '@/components/AIToolsPaginationControls';
import AdSlot from '@/components/AdSlot';

interface Props {
  allToolsSorted: Tool[];
  currentPage: number;
  totalPages: number;
  filters?: {
    q?: string;
    category?: string;
    pricing?: string;
  };
  categories?: string[];
  pricingOptions?: string[];
}

function getPageUrl(page: number): string {
  return page === 1 ? '/ai-tools' : `/ai-tools/${page}`;
}

export default function AIToolsDirectoryView({ allToolsSorted, currentPage, totalPages, filters, categories = [], pricingOptions = [] }: Props) {
  const [q, setQ] = useState(filters?.q || '');
  const [category, setCategory] = useState(filters?.category || '');
  const [pricing, setPricing] = useState(filters?.pricing || '');
  const [activePage, setActivePage] = useState(currentPage);

  const normalizedQ = q.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedPricing = pricing.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    return allToolsSorted.filter((tool) => {
      const matchesQ = !normalizedQ || (
        tool.name.toLowerCase().includes(normalizedQ) ||
        tool.description.toLowerCase().includes(normalizedQ) ||
        tool.category.toLowerCase().includes(normalizedQ) ||
        tool.tags.some((tag) => String(tag).toLowerCase().includes(normalizedQ))
      );
      const matchesCategory = !normalizedCategory || tool.category.toLowerCase() === normalizedCategory;
      const matchesPricing = !normalizedPricing || tool.freeTier.toLowerCase() === normalizedPricing;
      return matchesQ && matchesCategory && matchesPricing;
    });
  }, [allToolsSorted, normalizedCategory, normalizedPricing, normalizedQ]);

  const filteredTotalPages = Math.max(1, Math.ceil(filteredTools.length / AI_TOOLS_PER_PAGE));

  useEffect(() => {
    setActivePage(1);
  }, [normalizedQ, normalizedCategory, normalizedPricing]);

  useEffect(() => {
    if (activePage > filteredTotalPages) {
      setActivePage(filteredTotalPages);
    }
  }, [activePage, filteredTotalPages]);

  const startIndex = (activePage - 1) * AI_TOOLS_PER_PAGE;
  const pageTools = filteredTools.slice(startIndex, startIndex + AI_TOOLS_PER_PAGE);
  const pageUrl = `https://ultimateaitools.online${getPageUrl(activePage)}`;
  const hasActiveFilters = Boolean(normalizedQ || normalizedCategory || normalizedPricing);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tools Directory A-Z',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: pageTools.length,
    itemListElement: pageTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: startIndex + index + 1,
      name: tool.name,
      url: `https://ultimateaitools.online/tools/${tool.slug}`,
    })),
    url: pageUrl,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">AI Tools Directory A-Z (Free + Paid)</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Explore the complete alphabetical list of AI tools across writing, coding, productivity, automation, image generation, video creation and research.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-3 bg-surface-card border border-surface-border rounded-xl p-4">
        <input
          type="text"
          name="q"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search by tool name, tag, or description..."
          className="md:col-span-2 px-4 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500"
        />
        <select
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="px-4 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-gray-200 focus:outline-none focus:border-primary-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
        <select
          name="pricing"
          value={pricing}
          onChange={(event) => setPricing(event.target.value)}
          className="px-4 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-gray-200 focus:outline-none focus:border-primary-500"
        >
          <option value="">All Pricing</option>
          {pricingOptions.map((pricing) => (
            <option key={pricing} value={pricing}>
              {pricing}
            </option>
          ))}
        </select>
        <div className="md:col-span-4 flex flex-wrap justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setActivePage(1)}
            className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => {
              setQ('');
              setCategory('');
              setPricing('');
              setActivePage(1);
            }}
            className="px-5 py-2.5 rounded-lg bg-surface-hover border border-surface-border text-gray-200 font-semibold hover:bg-surface-border transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {pageTools.map((tool) => (
          <div key={tool.id} className="saas-card p-6 flex flex-col h-full group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-900/30 rounded-xl flex items-center justify-center p-2 relative text-primary-400">
                <span className="font-bold text-xl">{tool.name.charAt(0)}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-primary-900/50 text-primary-300 px-2 py-1 rounded-full border border-primary-800/50">
                {tool.freeTier}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary-400 transition-colors">{tool.name}</h2>
            <span className="text-xs text-primary-400 mb-3 block uppercase tracking-wide font-semibold">{tool.category.replace('-', ' ')}</span>
            <p className="text-sm text-gray-400 mb-6 flex-grow">{tool.description}</p>

            <div className="mt-auto space-y-2">
              <Link
                href={`/tools/${tool.slug}/`}
                className="block w-full text-center py-2.5 rounded-lg bg-surface-hover text-foreground hover:bg-surface-border border border-surface-border transition-colors font-semibold text-sm"
              >
                View Details
              </Link>
              <a
                href={tool.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 border border-transparent transition-colors font-bold text-sm"
              >
                Visit Tool
              </a>
            </div>
          </div>
        ))}
      </div>

      <AdSlot adSlot="1000000001" format="auto" />

      <AIToolsPaginationControls
        currentPage={activePage}
        totalPages={hasActiveFilters ? filteredTotalPages : totalPages}
        onPageChange={setActivePage}
        useClientPagination={hasActiveFilters}
      />

      <section className="bg-surface-card border text-center border-surface-border rounded-2xl p-10 max-w-4xl mx-auto shadow-sm mt-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">What Are AI Tools?</h2>
        <p className="text-gray-400 leading-relaxed text-lg">
          AI tools are software applications that use artificial intelligence to automate tasks such as writing, coding, image generation, video editing and research. This directory includes both free and paid AI tools listed alphabetically for easier comparison.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-surface-border bg-surface-card p-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">Helpful Internal Resources</h2>
        <p className="text-gray-400 mb-6">
          Use these pages to compare tools, find prompts, and move deeper into specific workflows.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/prompts/category/" className="text-primary-400 hover:text-primary-300 font-semibold">
            Browse prompt categories &rarr;
          </Link>
          <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
            Read AI blog guides &rarr;
          </Link>
          <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
            Compare AI models &rarr;
          </Link>
          <Link href="/sitemap/" className="text-primary-400 hover:text-primary-300 font-semibold">
            Open site sitemap &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
