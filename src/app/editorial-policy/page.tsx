import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Editorial Policy | UltimateAITools',
    description: 'Learn how UltimateAITools researches, reviews, updates, and publishes AI tool guides, prompt resources, and comparison content.',
    openGraph: {
        title: 'Editorial Policy | UltimateAITools',
        description: 'Our editorial standards for AI tool reviews, prompt guides, and practical AI content.',
        url: 'https://ultimateaitools.online/editorial-policy/',
        siteName: 'UltimateAITools',
        type: 'website',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/editorial-policy/',
    },
};

export default function EditorialPolicyPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-5">
                        Editorial Policy
                    </h1>
                    <p className="text-xl text-gray-400">
                        UltimateAITools publishes AI tool listings, prompt resources, model comparisons, and workflow guides with a focus on practical usefulness, clarity, and responsible recommendations.
                    </p>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">How We Choose What to Publish</h2>
                        <p>
                            We prioritize pages that help users complete real work: writing, coding, studying, designing, researching, automating workflows, comparing AI models, or choosing a tool before paying for it.
                        </p>
                        <p>
                            We avoid publishing pages that exist only to target a keyword. A page should help a reader understand what a tool, prompt, or workflow is useful for and what trade-offs to check before using it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Human Review and AI Assistance</h2>
                        <p>
                            AI may be used to support research organization, drafting, formatting, or prompt examples, but pages are reviewed for clarity, usefulness, and obvious factual issues before publication.
                        </p>
                        <p>
                            We do not treat AI-generated output as automatically correct. Pricing, limits, product names, and feature claims can change, so users should verify critical details on official tool websites before making decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Updates and Corrections</h2>
                        <p>
                            The AI market changes quickly. We update pages when tools change pricing, free plans, model access, major features, or availability. If a reader reports outdated information, we review the page and prioritize corrections based on impact.
                        </p>
                        <p>
                            To report an issue, contact us through the <Link href="/contact-us/" className="text-primary-400 hover:text-primary-300 underline">contact page</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Independence</h2>
                        <p>
                            Tool listings are organized to help users compare options. When we discuss free tiers, alternatives, or use cases, the goal is to help the reader choose based on workflow fit rather than hype.
                        </p>
                        <p>
                            For a closer look at how tool pages are evaluated, read our <Link href="/review-methodology/" className="text-primary-400 hover:text-primary-300 underline">review methodology</Link>.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
