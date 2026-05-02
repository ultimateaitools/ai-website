import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'AI Tool Review Methodology | UltimateAITools',
    description: 'See how UltimateAITools evaluates AI tools for workflow fit, free-plan value, output quality, ease of use, trust, and pricing clarity.',
    openGraph: {
        title: 'AI Tool Review Methodology | UltimateAITools',
        description: 'How we evaluate AI tools, prompts, and workflow recommendations.',
        url: 'https://ultimateaitools.online/review-methodology/',
        siteName: 'UltimateAITools',
        type: 'website',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/review-methodology/',
    },
};

const criteria = [
    {
        title: 'Workflow Fit',
        text: 'We look at what job the tool actually helps with: writing, coding, design, research, automation, study, marketing, video, audio, or business operations.',
    },
    {
        title: 'Free-Plan Value',
        text: 'We check whether a free or trial option gives users enough access to test the core workflow before paying.',
    },
    {
        title: 'Output Quality',
        text: 'We consider whether the tool produces useful drafts, suggestions, summaries, code, media, or workflow steps that still make sense after human review.',
    },
    {
        title: 'Ease of Use',
        text: 'We favor tools that let new users reach a useful result quickly without unnecessary setup or confusing onboarding.',
    },
    {
        title: 'Trust and Limitations',
        text: 'We highlight that users should check privacy terms, commercial-use rules, pricing limits, exports, and current official documentation before relying on a tool.',
    },
];

export default function ReviewMethodologyPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-5">
                        AI Tool Review Methodology
                    </h1>
                    <p className="text-xl text-gray-400">
                        Our reviews are built around practical workflow value, not hype. We focus on whether an AI tool helps real users finish useful work faster and more clearly.
                    </p>
                </header>

                <main className="space-y-10">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {criteria.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-surface-border bg-surface-hover p-6">
                                <h2 className="text-2xl font-bold text-foreground mb-3">{item.title}</h2>
                                <p className="text-gray-300 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-2xl border border-surface-border bg-surface-hover p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">How Readers Should Use Our Reviews</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Use our reviews as a shortlist and decision guide. Before adopting a tool for important work, test it on your own workflow, compare alternatives, and verify current pricing or usage limits on the official website.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            For editorial standards and update policy, read our <Link href="/editorial-policy/" className="text-primary-400 hover:text-primary-300 underline">editorial policy</Link>.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
