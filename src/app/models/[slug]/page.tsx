import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getModelsData } from '@/lib/data';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { SITE_NAME, SITE_URL, truncateAtWord } from '@/lib/seo';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { models } = getModelsData();
    return models.map((model) => ({
        slug: model.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { models } = getModelsData();
    const model = models.find((m) => m.slug === params.slug);

    if (!model) {
        return { title: 'Model Not Found' };
    }

    const seoTitle = truncateAtWord(`${model.name} Review: Features, Pricing and Use Cases`, 60);
    const seoDesc = truncateAtWord(`Compare ${model.name} by ${model.developer}: capabilities, pricing, free tier, strengths, weaknesses, and best use cases.`, 155);
    const keywords = [
        `${model.name.toLowerCase()}`,
        `${model.name.toLowerCase()} review`,
        `${model.name.toLowerCase()} vs gpt`,
        `${model.name.toLowerCase()} pricing`,
        `${model.name.toLowerCase()} free`,
        `best ai model`,
        `${model.developer.toLowerCase()} ai model`,
        'ai model comparison',
        'top ai models',
        'ai language model review',
    ];

    return {
        title: seoTitle,
        description: seoDesc,
        keywords,
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `${SITE_URL}/models/${model.slug}/`,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDesc,
        },
        alternates: {
            canonical: `${SITE_URL}/models/${model.slug}/`,
        },
    };
}

export default function ModelDetailPage({ params }: Props) {
    const { models } = getModelsData();
    const model = models.find((m) => m.slug === params.slug);

    if (!model) {
        notFound();
    }

    const isFreeModel = model.freeTier.toLowerCase().includes('free');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: model.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        isAccessibleForFree: isFreeModel,
        description: model.overview,
        url: `${SITE_URL}/models/${model.slug}/`,
        author: {
            '@type': 'Organization',
            name: model.developer
        },
        offers: {
            '@type': 'Offer',
            price: isFreeModel ? '0' : undefined,
            priceCurrency: 'USD',
        },
    };

    const compareModels = models.filter(m => m.slug !== model.slug).slice(0, 4);

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="bg-surface-card border border-surface-border rounded-3xl p-8 md:p-12 shadow-sm mb-12">

                {/* Header */}
                <div className="mb-10 text-center border-b pb-8">
                    <span className="inline-block px-4 py-1.5 bg-surface-border text-gray-200 font-bold text-sm rounded-full tracking-widest uppercase mb-6">
                        Developed by {model.developer}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                        {model.name}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {model.shortSummary}
                    </p>
                </div>

                <div className="prose prose-primary max-w-none text-gray-300">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                        <p className="leading-relaxed">{model.overview}</p>
                    </section>

                    <section className="mb-10 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                        <h2 className="text-2xl font-bold text-foreground mb-4 mt-0">Key Capabilities</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {model.keyCapabilities.map((cap, idx) => (
                                <li key={idx} className="font-medium text-black">{cap}</li>
                            ))}
                        </ul>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <section className="bg-surface-hover p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-foreground mb-3 text-green-700">Strengths</h3>
                            <p className="text-sm leading-relaxed">{model.strengths}</p>
                        </section>
                        <section className="bg-surface-hover p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-foreground mb-3 text-red-700">Weaknesses</h3>
                            <p className="text-sm leading-relaxed">{model.weaknesses}</p>
                        </section>
                    </div>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Real World Use Cases</h2>
                        <p className="leading-relaxed">{model.useCases}</p>
                    </section>

                    <section className="mb-10 bg-gray-900 text-white p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-white mb-4 mt-0">Pricing & Access</h2>
                        <p className="mb-4"><strong className="text-primary-300">Structure:</strong> {model.pricingInfo}</p>
                        <p><strong className="text-primary-300">Free Tier:</strong> {model.freeTier}</p>
                    </section>

                    <AdSlot adSlot="1000000008" format="horizontal" />

                </div>
            </div>

            {/* Compare With Other Models */}
            <div className="mt-16 pt-10 border-t border-surface-border">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-sans text-center">Compare With Other Models</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {compareModels.map(related => (
                        <Link key={related.id} href={`/models/${related.slug}/`} className="saas-card p-5 group flex flex-col h-full hover:border-primary-400 shadow-sm border border-surface-border">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{related.developer}</span>
                            <h3 className="font-bold text-foreground group-hover:text-primary-600 transition-colors text-lg mb-2">{related.name}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">{related.shortSummary}</p>
                            <span className="text-sm font-semibold text-primary-600 mt-auto flex-shrink-0 block text-center py-2 bg-primary-50 rounded group-hover:bg-primary-100 transition-colors">Compare &rarr;</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-12 rounded-2xl border border-surface-border bg-surface-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-3">Continue Research</h2>
                <p className="text-gray-400 mb-6">
                    Use related pages to move from model comparison into tools, prompts, and implementation guides.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Compare all AI models &rarr;
                    </Link>
                    <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Browse AI tools directory &rarr;
                    </Link>
                    <Link href="/prompts/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Explore prompt categories &rarr;
                    </Link>
                    <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Read AI blog guides &rarr;
                    </Link>
                </div>
            </div>
        </article>
    );
}


