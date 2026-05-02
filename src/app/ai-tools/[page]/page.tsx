import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/data';
import { AI_TOOLS_PER_PAGE } from '@/lib/constants';
import AIToolsDirectoryView from '@/components/AIToolsDirectoryView';

interface Props {
  params: { page: string };
}

function getAllToolsSorted() {
  const { tools } = getData();
  return [...tools].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

export function generateStaticParams() {
  const tools = getAllToolsSorted();
  const totalPages = Math.max(1, Math.ceil(tools.length / AI_TOOLS_PER_PAGE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageNumber = Number(params.page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return { title: 'AI Tools - Page Not Found' };
  }

  return {
    title: `AI Tools Directory A-Z - Page ${pageNumber} | UltimateAITools`,
    description: `Browse page ${pageNumber} of the complete A-Z AI tools directory covering free and paid tools across major categories.`,
    openGraph: {
      title: `AI Tools Directory A-Z - Page ${pageNumber} | UltimateAITools`,
      description: `Browse page ${pageNumber} of the complete A-Z AI tools directory covering free and paid tools across major categories.`,
      url: `https://ultimateaitools.online/ai-tools/${pageNumber}/`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ultimateaitools.online/ai-tools/${pageNumber}/`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function AIToolsDirectoryPaginatedPage({ params }: Props) {
  const pageNumber = Number(params.page);
  const allToolsSorted = getAllToolsSorted();
  const totalPages = Math.max(1, Math.ceil(allToolsSorted.length / AI_TOOLS_PER_PAGE));
  const { tools } = getData();
  const categories = Array.from(new Set(tools.map((tool) => tool.category))).sort((a, b) => a.localeCompare(b));
  const pricingOptions = Array.from(new Set(tools.map((tool) => tool.freeTier))).sort((a, b) => a.localeCompare(b));

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <AIToolsDirectoryView
      allToolsSorted={allToolsSorted}
      currentPage={pageNumber}
      totalPages={totalPages}
      categories={categories}
      pricingOptions={pricingOptions}
    />
  );
}
