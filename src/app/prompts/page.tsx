import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPromptCategories } from '@/lib/data';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'AI Prompt Categories | Browse Prompt Library by Use Case',
    description: 'Browse the AI prompt library by category. Explore prompt collections for marketing, business, coding, study, productivity, social media, and image generation.',
    openGraph: {
        title: 'AI Prompt Categories | Browse Prompt Library by Use Case',
        description: 'Explore AI prompt collections by category and open the exact prompt set you need.',
        url: 'https://ultimateaitools.online/prompts/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Prompt Categories',
        description: 'Open category-wise prompt collections for ChatGPT, Gemini, Claude, and Grok.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/prompts/',
    }
};

export default function PromptsDirectoryPage() {
    const categories = getPromptCategories();

    return (
        <div className="bg-surface-card">
            <header className="bg-background py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                        AI Prompt Library by Category
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium">
                        Choose a workflow category first, then explore prompt templates built for that exact use case.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AdSlot adSlot="1000000004" format="horizontal" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map(category => (
                        <div key={category.slug} className="saas-card p-6 flex flex-col h-full group">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="inline-block px-3 py-1 bg-primary-900/50 text-primary-300 font-semibold text-xs rounded-full tracking-wider uppercase border border-primary-800/50">
                                    {category.name}
                                </span>
                                <span className="text-xs text-gray-400 font-semibold">
                                    {category.promptCount} prompts
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary-400 transition-colors mb-3 line-clamp-2">
                                {category.name} Prompts
                            </h2>
                            <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                                {category.description}
                            </p>
                            <div className="mt-auto space-y-3">
                                <Link
                                    href={`/prompts/category/${category.slug}/`}
                                    className="block w-full text-center py-3 rounded-lg bg-surface-hover text-gray-300 hover:bg-surface-border border border-surface-border transition-colors font-bold text-sm"
                                >
                                    Explore Category
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mt-16 rounded-2xl border border-surface-border bg-surface-hover p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Use Prompts With the Rest of the Site</h2>
                    <p className="text-gray-400 mb-6 max-w-3xl">
                        Start with a category, then pair those prompts with the right AI tools, model comparisons, and implementation guides.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Browse AI tools directory &rarr;
                        </Link>
                        <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Compare AI models &rarr;
                        </Link>
                        <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Read practical AI guides &rarr;
                        </Link>
                        <Link href="/sitemap/" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Open full site sitemap &rarr;
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
