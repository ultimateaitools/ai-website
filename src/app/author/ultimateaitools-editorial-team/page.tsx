import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'UltimateAITools Editorial Team | Author Profile',
    description: 'Meet the UltimateAITools editorial team behind AI tool reviews, prompt guides, model comparisons, and workflow tutorials.',
    openGraph: {
        title: 'UltimateAITools Editorial Team',
        description: 'Author profile for the team reviewing AI tools, prompts, and practical AI workflows.',
        url: 'https://ultimateaitools.online/author/ultimateaitools-editorial-team/',
        siteName: 'UltimateAITools',
        type: 'profile',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/author/ultimateaitools-editorial-team/',
    },
};

export default function EditorialTeamAuthorPage() {
    const authorSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'UltimateAITools Editorial Team',
        url: 'https://ultimateaitools.online/author/ultimateaitools-editorial-team/',
        worksFor: {
            '@type': 'Organization',
            name: 'UltimateAITools',
            url: 'https://ultimateaitools.online/',
        },
        knowsAbout: [
            'AI tools',
            'AI prompts',
            'AI model comparison',
            'AI productivity workflows',
            'AI writing tools',
            'AI coding tools',
        ],
    };

    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 border-b border-surface-border pb-10">
                    <div className="w-20 h-20 rounded-full bg-primary-900/50 border border-primary-800 text-primary-300 flex items-center justify-center text-3xl font-black mb-6">
                        U
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-5">
                        UltimateAITools Editorial Team
                    </h1>
                    <p className="text-xl text-gray-400">
                        We research AI tools, prompt workflows, model comparisons, and practical AI use cases for students, creators, developers, marketers, and small teams.
                    </p>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">What We Cover</h2>
                        <p>
                            Our work focuses on practical AI adoption: choosing the right tool, understanding free-plan value, writing better prompts, comparing AI models, and building workflows that save time without removing human review.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">How We Review</h2>
                        <p>
                            We evaluate tools by workflow fit, free-plan usefulness, ease of use, output quality, trust considerations, and pricing clarity. For more detail, read our <Link href="/review-methodology/" className="text-primary-400 hover:text-primary-300 underline">review methodology</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Editorial Standards</h2>
                        <p>
                            We update content as tools change and encourage readers to verify pricing, limits, and commercial-use terms on official tool websites before making decisions. Read our <Link href="/editorial-policy/" className="text-primary-400 hover:text-primary-300 underline">editorial policy</Link>.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
