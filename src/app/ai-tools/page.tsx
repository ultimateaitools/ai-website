import React from 'react';
import { Metadata } from 'next';
import { getData } from '@/lib/data';
import { AI_TOOLS_PER_PAGE } from '@/lib/constants';
import AIToolsDirectoryView from '@/components/AIToolsDirectoryView';

export const metadata: Metadata = {
    title: 'AI Tools Directory A-Z (Free + Paid) | UltimateAITools',
    description: 'Browse a complete A-Z list of AI tools including free and paid options for writing, coding, productivity, automation, design, video and research.',
    keywords: [
        'ai tools directory',
        'free ai tools',
        'paid ai tools',
        'best ai tools',
        'ai tools a-z',
        'ai writing tools',
        'ai coding tools',
        'ai productivity tools'
    ],
    openGraph: {
        title: 'AI Tools Directory A-Z (Free + Paid) | UltimateAITools',
        description: 'Complete alphabetical list of AI tools including free and paid options across major use cases.',
        url: 'https://ultimateaitools.online/ai-tools/',
        siteName: 'UltimateAITools',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Tools Directory A-Z (Free + Paid)',
        description: 'Browse all AI tools alphabetically, including both free and paid platforms.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/ai-tools/'
    },
};

export default function AIToolsDirectory() {
    const { tools } = getData();
    const allToolsSorted = [...tools].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    const categories = Array.from(new Set(tools.map((tool) => tool.category))).sort((a, b) => a.localeCompare(b));
    const pricingOptions = Array.from(new Set(tools.map((tool) => tool.freeTier))).sort((a, b) => a.localeCompare(b));

    const totalPages = Math.max(1, Math.ceil(allToolsSorted.length / AI_TOOLS_PER_PAGE));

    return (
        <AIToolsDirectoryView
            allToolsSorted={allToolsSorted}
            currentPage={1}
            totalPages={totalPages}
            categories={categories}
            pricingOptions={pricingOptions}
        />
    );
}
