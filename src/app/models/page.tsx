import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getModelsData } from '@/lib/data';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'Best AI Models Comparison 2026 - GPT vs Claude vs Gemini',
    description: 'Compare the best AI models like GPT-5, Claude Opus 4.6, Gemini 3, Grok 4 and more. Features, pricing, use cases and performance comparison.',
    openGraph: {
        title: 'Best AI Models Comparison 2026 - GPT vs Claude vs Gemini',
        description: 'Compare top AI models with features, pricing, use cases, and performance benchmarks.',
        url: 'https://ultimateaitools.online/models/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best AI Models Comparison 2026',
        description: 'Compare GPT, Claude, Gemini, Grok and more in one place.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/models/',
    }
};

export default function ModelsComparisonPage() {
    const { models } = getModelsData();

    return (
        <div className="bg-surface-card">
            <header className="bg-background py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                        AI Models Comparison - GPT vs Claude vs Gemini (2026)
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium">
                        Analyze features, pricing, context windows, and performance benchmarks to choose the absolute best foundation model for your workload.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AdSlot adSlot="1000000007" format="horizontal" />

                <div className="overflow-x-auto rounded-2xl shadow-sm border border-surface-border mb-16">
                    <table className="min-w-full divide-y divide-surface-border bg-surface-card">
                        <thead className="bg-surface-hover">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Feature</th>
                                {models.map(model => (
                                    <th key={model.id} scope="col" className="px-6 py-4 text-left text-sm font-bold text-foreground">
                                        <Link href={`/models/${model.slug}/`} className="hover:text-primary-400 transition-colors">
                                            {model.name}
                                        </Link>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-border bg-surface-card">
                            {[
                                { key: 'textGeneration', label: 'Text Generation' },
                                { key: 'codingAbility', label: 'Coding Ability' },
                                { key: 'multimodalSupport', label: 'Multimodal Support' },
                                { key: 'contextWindow', label: 'Context Window' },
                                { key: 'speed', label: 'Speed/Latency' },
                                { key: 'freeTierStatus', label: 'Free Tier' },
                                { key: 'pricingStatus', label: 'Pricing Model' },
                                { key: 'apiAccess', label: 'API Access' }
                            ].map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-surface-card' : 'bg-surface-hover'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                                        {row.label}
                                    </td>
                                    {models.map(model => (
                                        <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {/* @ts-expect-error - Dynamic key access */}
                                            {model.comparisonFeatures[row.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {/* Actions Row */}
                            <tr className="bg-surface-hover border-t-2 border-surface-border">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground"></td>
                                {models.map(model => (
                                    <td key={model.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        <Link href={`/models/${model.slug}/`} className="text-primary-400 font-bold hover:text-primary-300 text-sm">
                                            View Details &rarr;
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <section className="rounded-2xl border border-surface-border bg-surface-hover p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Explore Related AI Resources</h2>
                    <p className="text-gray-400 mb-6">
                        Compare models first, then move into tools, prompts, and tutorials that fit your workflow.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Browse AI tools directory &rarr;
                        </Link>
                        <Link href="/prompts/category/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Open prompt categories &rarr;
                        </Link>
                        <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Read AI blog guides &rarr;
                        </Link>
                        <Link href="/sitemap/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            View full sitemap &rarr;
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

