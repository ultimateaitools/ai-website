import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPromptsData } from '@/lib/data';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'AI Prompt Library - 360+ High-Quality Prompts | ChatGPT, Gemini, Claude, Grok',
    description: 'Explore 360+ high-quality AI prompts for ChatGPT, Gemini, Claude, and Grok across marketing, coding, study, business, and productivity workflows.',
    openGraph: {
        title: 'AI Prompt Library - 360+ High-Quality Prompts | ChatGPT, Gemini, Claude, Grok',
        description: 'Explore 360+ high-quality AI prompts for ChatGPT, Gemini, Claude, and Grok across marketing, coding, study, business, and productivity workflows.',
        url: 'https://ultimateaitools.online/prompts',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Prompt Library - 360+ High-Quality Prompts',
        description: 'Copy-paste prompt templates for ChatGPT, Gemini, Claude, and Grok.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/prompts',
    }
};

export default function PromptsDirectoryPage() {
    const { prompts } = getPromptsData();

    return (
        <div className="bg-surface-card">
            <header className="bg-background py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                        AI Prompt Library: 360+ High-Quality Prompts
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium">
                        Copy-paste prompt templates designed for ChatGPT, Gemini, Claude, and Grok. Built for real workflows in content, coding, study, business, and growth.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AdSlot adSlot="1000000004" format="horizontal" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {prompts.map(prompt => (
                        <div key={prompt.id} className="saas-card p-6 flex flex-col h-full group">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary-900/50 text-primary-300 font-semibold text-xs rounded-full tracking-wider uppercase border border-primary-800/50">
                                    {prompt.category.replace('-', ' ')}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary-400 transition-colors mb-3 line-clamp-2">
                                {prompt.title}
                            </h2>
                            <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                                {prompt.description}
                            </p>
                            <div className="mt-auto space-y-3">
                                <Link
                                    href={`/prompts/${prompt.slug}`}
                                    className="block w-full text-center py-3 rounded-lg bg-surface-hover text-gray-300 hover:bg-surface-border border border-surface-border transition-colors font-bold text-sm"
                                >
                                    View Prompt Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
