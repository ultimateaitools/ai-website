import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPromptCategories, getPromptsByCategory, getToolCategorySlugForPromptCategory } from '@/lib/data';
import AdSlot from '@/components/AdSlot';
import { SITE_URL, getCategoryIntent, truncateAtWord } from '@/lib/seo';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    return getPromptCategories().map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = getPromptCategories().find((item) => item.slug === params.slug);

    if (!category) {
        return { title: 'Prompt Category Not Found' };
    }

    const intent = getCategoryIntent(params.slug);
    const title = truncateAtWord(`${category.name} AI Prompts for Practical Workflows`, 60);
    const description = truncateAtWord(`Browse ${category.promptCount} ${category.name.toLowerCase()} AI prompts for ${intent.job}. Copy, customize, and use them with ChatGPT, Claude, or Gemini.`, 155);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/prompts/category/${category.slug}/`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: `${SITE_URL}/prompts/category/${category.slug}/`,
        },
    };
}

export default function PromptCategoryPage({ params }: Props) {
    const allCategories = getPromptCategories();
    const category = allCategories.find((item) => item.slug === params.slug);

    if (!category) {
        notFound();
    }

    const prompts = getPromptsByCategory(category.slug);
    const relatedCategories = allCategories.filter((item) => item.slug !== category.slug).slice(0, 4);
    const relatedToolCategorySlug = getToolCategorySlugForPromptCategory(category.slug);
    const intent = getCategoryIntent(category.slug);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `How should I use ${category.name} AI prompts?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Use these prompts for ${intent.job}. Replace placeholders with your real context, then ask follow-up questions to refine the answer.`,
                },
            },
            {
                '@type': 'Question',
                name: `Which AI tools work with ${category.name} prompts?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'These prompts can be used with ChatGPT, Claude, Gemini, Grok, and most AI chat tools that support long-form instructions.',
                },
            },
        ],
    };

    return (
        <div className="bg-surface-card">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <header className="bg-background py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/prompts/" className="inline-flex items-center text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors mb-6">
                        &larr; Back to Prompt Categories
                    </Link>
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-primary-900/50 text-primary-300 font-semibold text-xs rounded-full tracking-wider uppercase border border-primary-800/50 mb-5">
                            {category.promptCount} prompts
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                            {category.name} AI Prompts
                        </h1>
                        <p className="max-w-2xl text-xl text-gray-400 leading-relaxed font-medium">
                            {category.description}
                        </p>
                        <p className="max-w-2xl text-base text-gray-500 leading-relaxed mt-4">
                            Use this collection when you need help with {intent.job}. Start with a prompt, add your real context, and refine the output for your final use case.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AdSlot adSlot="1000000004" format="horizontal" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {prompts.map((prompt) => (
                        <div key={prompt.id} className="saas-card p-6 flex flex-col h-full group">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary-900/50 text-primary-300 font-semibold text-xs rounded-full tracking-wider uppercase border border-primary-800/50">
                                    {prompt.outputType}
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
                                    href={`/prompts/${prompt.slug}/`}
                                    className="block w-full text-center py-3 rounded-lg bg-surface-hover text-gray-300 hover:bg-surface-border border border-surface-border transition-colors font-bold text-sm"
                                >
                                    View Prompt Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mt-16 rounded-2xl border border-surface-border bg-surface-hover p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">How to Use {category.name} Prompts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Add Context</h3>
                            <p>Include your goal, audience, constraints, examples, and preferred tone before running the prompt.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Iterate</h3>
                            <p>Ask the AI to revise for clarity, length, accuracy, formatting, or platform-specific requirements.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Review</h3>
                            <p>Check facts, remove generic wording, and adapt the final answer to your own workflow.</p>
                        </div>
                    </div>
                </section>

                <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-surface-border bg-surface-hover p-6">
                        <h2 className="text-2xl font-bold text-foreground mb-3">Keep Exploring AI Resources</h2>
                        <p className="text-gray-400 mb-5">
                            Move from prompts to tools, model research, and practical guides to build a stronger workflow.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link href="/prompts/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Browse all prompt categories &rarr;
                            </Link>
                            <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Explore AI tools directory &rarr;
                            </Link>
                            {relatedToolCategorySlug ? (
                                <Link href={`/category/${relatedToolCategorySlug}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                    View related {category.name.toLowerCase()} tools &rarr;
                                </Link>
                            ) : (
                                <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                    Compare AI models &rarr;
                                </Link>
                            )}
                            <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Read AI blog guides &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-surface-border bg-surface-hover p-6">
                        <h2 className="text-2xl font-bold text-foreground mb-3">More Prompt Categories</h2>
                        <p className="text-gray-400 mb-5">
                            Jump into adjacent categories and discover more copy-paste prompt templates.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {relatedCategories.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/prompts/category/${item.slug}/`}
                                    className="rounded-xl border border-surface-border px-4 py-3 text-gray-300 hover:text-primary-300 hover:border-primary-500/40 transition-colors"
                                >
                                    {item.name} ({item.promptCount})
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
