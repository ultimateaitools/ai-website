import React from 'react';
import { getBrowsableCategorySlugs, getSegments, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { SITE_URL, getCategoryIntent, makeCategorySeoDescription, makeCategorySeoTitle } from '@/lib/seo';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return getBrowsableCategorySlugs().map((slug) => ({ slug }));
}

function formatSlugTitle(slug: string): string {
    return slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const segments = getSegments();
    const segment = segments.find(s => s.slug === params.slug);
    const categoryName = segment?.name || formatSlugTitle(params.slug);
    const title = makeCategorySeoTitle(categoryName);
    const description = makeCategorySeoDescription(categoryName, params.slug);
    const intent = getCategoryIntent(params.slug);

    return {
        title,
        description,
        keywords: [
            `${categoryName.toLowerCase()} ai tools`,
            `free ${categoryName.toLowerCase()} ai tools`,
            `ai tools for ${categoryName.toLowerCase()}`,
            `${categoryName.toLowerCase()} software comparison`,
            `${categoryName.toLowerCase()} workflow automation`,
            intent.job,
        ],
        alternates: {
            canonical: `${SITE_URL}/category/${params.slug}/`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/category/${params.slug}/`,
            siteName: 'UltimateAITools',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default function CategoryPage({ params }: Props) {
    const segments = getSegments();
    const segment = segments.find(s => s.slug === params.slug);
    const tools = getToolsByCategory(params.slug);
    const categoryName = segment?.name || formatSlugTitle(params.slug);
    const intent = getCategoryIntent(params.slug);
    const freeTools = tools.filter((tool) => tool.freeTier.toLowerCase().includes('free')).slice(0, 3);
    const paidTools = tools.filter((tool) => !tool.freeTier.toLowerCase().includes('free')).slice(0, 3);
    const rankingPicks = [
        { label: 'Best overall', tool: tools[0] },
        { label: 'Best free-friendly', tool: tools.find((tool) => tool.freeTier.toLowerCase().includes('free')) || tools[0] },
        { label: 'Best for beginners', tool: tools.find((tool) => tool.tags.some((tag) => tag.toLowerCase() === 'beginner')) || tools[1] || tools[0] },
        { label: 'Best for teams', tool: tools.find((tool) => tool.tags.some((tag) => ['business', 'team', 'productivity'].includes(tag.toLowerCase()))) || tools[2] || tools[0] },
    ].filter((item) => item.tool);

    if (!segment && tools.length === 0) {
        return <div className="p-20 text-center text-gray-500 font-medium">Category not found</div>;
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'AI Tools', item: `${SITE_URL}/ai-tools/` },
            { '@type': 'ListItem', position: 3, name: categoryName, item: `${SITE_URL}/category/${params.slug}/` },
        ],
    };

    const categorySchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryName} AI Tools`,
        description: `Compare ${categoryName} AI tools for ${intent.job}.`,
        url: `${SITE_URL}/category/${params.slug}/`,
        numberOfItems: tools.length,
        hasPart: tools.slice(0, 10).map(tool => ({
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            url: `${SITE_URL}/tools/${tool.slug}/`,
            applicationCategory: 'BusinessApplication',
            isAccessibleForFree: tool.freeTier?.toLowerCase() === 'free',
        })),
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: intent.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="mb-12 border-b border-surface-border pb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{categoryName}</h1>
                <p className="text-lg text-gray-400">
                    Compare {categoryName.toLowerCase()} AI tools for {intent.job}. This page focuses on practical workflow fit, free-plan value, and the trade-offs that matter before you choose a tool.
                </p>
            </div>

            <section className="mb-12 rounded-2xl border border-surface-border bg-surface-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">How to Choose {categoryName} AI Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                    <div>
                        <h3 className="font-bold text-foreground mb-2">Best Fit</h3>
                        <p>{categoryName} tools are most useful for {intent.audience} who need help with {intent.job}.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground mb-2">Compare First</h3>
                        <p>Check {intent.comparisonAngle} before relying on a tool for daily work.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground mb-2">Quick Rule</h3>
                        <p>{intent.decisionHint}</p>
                    </div>
                </div>
            </section>

            <section className="mb-12 rounded-2xl border border-surface-border bg-surface-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Best {categoryName} AI Tools by Use Case</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rankingPicks.map(({ label, tool }) => (
                        <div key={`${label}-${tool.slug}`} className="rounded-xl border border-surface-border bg-surface-hover p-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-primary-400 mb-2">{label}</p>
                            <h3 className="text-xl font-bold text-foreground mb-2">{tool.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
                            <Link href={`/tools/${tool.slug}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                Read {tool.name} review &rarr;
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-surface-border bg-surface-card p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Free vs Paid {categoryName} Tools</h2>
                    <p className="text-gray-300 mb-4">
                        Free tools are best for testing output quality, learning the workflow, and handling occasional tasks. Paid plans usually matter when you need higher usage limits, team features, exports, commercial rights, or advanced integrations.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Free-friendly options</h3>
                            <ul className="list-disc pl-5 text-gray-400 space-y-1">
                                {(freeTools.length ? freeTools : tools.slice(0, 3)).map((tool) => (
                                    <li key={tool.slug}>{tool.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-2">Worth comparing before paying</h3>
                            <ul className="list-disc pl-5 text-gray-400 space-y-1">
                                {(paidTools.length ? paidTools : tools.slice(0, 3)).map((tool) => (
                                    <li key={tool.slug}>{tool.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-surface-border bg-surface-card p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Beginner vs Professional Choice</h2>
                    <div className="space-y-5 text-gray-300">
                        <div>
                            <h3 className="font-bold text-foreground mb-2">For beginners</h3>
                            <p>Choose a simple tool with a generous free plan, clear templates, and fast results. Avoid tools that need heavy setup before you know the workflow is useful.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-2">For professionals</h3>
                            <p>Prioritize repeatable quality, export controls, privacy terms, collaboration features, integrations, and predictable pricing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {tools.length > 0 ? (
                <>
                    <section className="mb-12 overflow-x-auto rounded-2xl border border-surface-border bg-surface-card">
                        <table className="min-w-full divide-y divide-surface-border">
                            <thead className="bg-surface-hover">
                                <tr>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Tool</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Pricing</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Best Use</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-border">
                                {tools.slice(0, 8).map((tool) => (
                                    <tr key={tool.slug}>
                                        <td className="px-5 py-4">
                                            <Link href={`/tools/${tool.slug}/`} className="font-bold text-foreground hover:text-primary-400">
                                                {tool.name}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-4 text-gray-300">{tool.freeTier}</td>
                                        <td className="px-5 py-4 text-gray-400">{tool.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                    <AdSlot adSlot="1000000009" format="horizontal" />
                </>
            ) : (
                <div className="bg-surface-hover border border-surface-border rounded-xl p-10 text-center">
                    <p className="text-gray-500 font-medium">No tools found in this category yet. Check back soon!</p>
                </div>
            )}

            <section className="mt-16 rounded-2xl border border-surface-border bg-surface-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-3">Related Pages for {categoryName}</h2>
                <p className="text-gray-400 mb-6">
                    Explore supporting resources beyond this category listing to compare options and find implementation help.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Browse all AI tools &rarr;
                    </Link>
                    <Link href={`/prompts/category/${params.slug}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                        View matching prompts &rarr;
                    </Link>
                    <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Read AI blog guides &rarr;
                    </Link>
                    <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Compare AI models &rarr;
                    </Link>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-surface-border bg-surface-hover p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{categoryName} AI Tools FAQ</h2>
                <div className="space-y-5">
                    {intent.faq.map((item) => (
                        <div key={item.q}>
                            <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                            <p className="text-gray-400">{item.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
