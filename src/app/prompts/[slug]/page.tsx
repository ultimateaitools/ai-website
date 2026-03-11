import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPromptsData } from '@/lib/data';
import Link from 'next/link';
import { promptContentData } from '@/lib/promptContentData';
import AdSlot from '@/components/AdSlot';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { prompts } = getPromptsData();
    return prompts.map((prompt) => ({
        slug: prompt.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { prompts } = getPromptsData();
    const prompt = prompts.find((p) => p.slug === params.slug);

    if (!prompt) {
        return { title: 'Prompt Not Found' };
    }

    return {
        title: `${prompt.title} - Free AI Prompt Template`,
        description: `Use this high-quality AI prompt to generate ${prompt.outputType.toLowerCase()} with ChatGPT, Claude, Gemini, Grok, and similar models.`,
        openGraph: {
            title: `${prompt.title} - Free AI Prompt Template`,
            description: `Use this high-quality AI prompt to generate ${prompt.outputType.toLowerCase()} with ChatGPT, Claude, Gemini, Grok, and similar models.`,
            url: `https://ultimateaitools.online/prompts/${prompt.slug}`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${prompt.title} - Free AI Prompt Template`,
            description: `Use this high-quality AI prompt to generate ${prompt.outputType.toLowerCase()} with ChatGPT, Claude, Gemini, Grok, and similar models.`,
        },
        alternates: {
            canonical: `https://ultimateaitools.online/prompts/${prompt.slug}`,
        }
    };
}

export default function PromptDetailPage({ params }: Props) {
    const { prompts } = getPromptsData();
    const prompt = prompts.find((p) => p.slug === params.slug);

    if (!prompt) {
        notFound();
    }

    const staticContent = promptContentData[prompt.slug] || {
        description: `Use this production-ready prompt to generate ${prompt.outputType.toLowerCase()} with high consistency.`,
        whatItDoes: [
            `This prompt is structured to help AI models deliver better ${prompt.outputType.toLowerCase()} output with fewer revisions.`,
            'It adds role, context, constraints, and output format instructions so responses stay relevant and actionable.',
            'The template is compatible with ChatGPT, Claude, Gemini, and Grok with minor wording adjustments if needed.'
        ],
        whenToUse: [
            `Use this prompt when you need reliable ${prompt.outputType.toLowerCase()} output quickly.`,
            'Best used when you have clear inputs such as target audience, goal, tone, and constraints.',
            'Ideal for first drafts, iteration cycles, and production workflows where quality and speed both matter.'
        ]
    };
    const relatedPrompts = prompts.filter(p => p.category === prompt.category && p.slug !== prompt.slug).slice(0, 4);
    const promptSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: prompt.title,
        description: prompt.description,
        keywords: [prompt.category, prompt.outputType, prompt.bestFor],
        text: prompt.promptText,
        url: `https://ultimateaitools.online/prompts/${prompt.slug}`,
    };

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(promptSchema) }} />
            <div className="bg-surface-card border border-surface-border rounded-3xl p-8 md:p-12 shadow-sm mb-12">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-6">
                        <Link href={`/prompts/category/${prompt.category}`} className="inline-flex items-center text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                            &larr; Back to {prompt.category.replace('-', ' ')} prompts
                        </Link>
                    </div>
                    <span className="inline-block px-4 py-1.5 bg-primary-100 text-black font-bold text-sm rounded-full tracking-widest uppercase mb-6">
                        {prompt.category.replace('-', ' ')}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                        {prompt.title}
                    </h1>
                </div>

                <div className="prose prose-primary max-w-none">

                    {/* Unique Content: What it Does & When to Use */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-surface-hover border border-surface-border p-8 rounded-2xl">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 border-b pb-2">What This Prompt Does</h3>
                            <div className="text-gray-300 text-base leading-relaxed space-y-4">
                                {staticContent.whatItDoes.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 border-b pb-2">When to Use It</h3>
                            <div className="text-gray-300 text-base leading-relaxed space-y-4">
                                {staticContent.whenToUse.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Best For section */}
                    <div className="mb-12 flex items-center justify-center gap-4 bg-primary-50 py-4 px-6 rounded-xl border border-primary-100">
                        <span className="font-bold text-black">Best For:</span>
                        <span className="text-black font-medium">{prompt.bestFor}</span>
                    </div>

                    {/* The Prompt Box */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-foreground">The Prompt</h2>
                            <span className="text-sm font-semibold text-gray-500 bg-surface-border px-3 py-1 rounded">Copy-Paste Ready</span>
                        </div>
                        <div className="relative group">
                            <div className="bg-gray-900 text-gray-100 p-6 md:p-8 rounded-2xl shadow-inner font-mono text-base md:text-lg leading-loose whitespace-pre-wrap">
                                {prompt.promptText}
                            </div>
                            {/* Static copy block placeholder since no client React code allowed in static export unless 'use client' is added. 
                                It's best to keep this entirely static as requested or just styling a pseudo-button for visual */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-sm"
                                    title="Highlight text and press Ctrl+C to copy"
                                >
                                    Copy Prompt Box Text
                                </button>
                            </div>
                        </div>
                    </div>

                    <AdSlot adSlot="1000000005" format="horizontal" />

                </div>
            </div>

            {/* Related Prompts */}
            <div className="mt-16 pt-10 border-t border-surface-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Prompts in {prompt.category.replace('-', ' ')}</h2>
                {relatedPrompts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedPrompts.map(related => (
                            <Link key={related.id} href={`/prompts/${related.slug}`} className="saas-card p-5 group flex flex-col h-full hover:border-primary-300">
                                <h3 className="font-bold text-foreground group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">{related.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 text-ellipsis block overflow-hidden mb-4">{related.description}</p>
                                <span className="text-sm font-semibold text-primary-600 mt-auto flex-shrink-0">View Prompt &rarr;</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No related prompts found in this category.</p>
                )}
            </div>
        </article>
    );
}

