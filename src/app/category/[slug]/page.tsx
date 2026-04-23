import React from 'react';
import { getBrowsableCategorySlugs, getSegments, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

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
    const title = `Best ${categoryName} AI Tools (Free + Paid) 2026 | UltimateAITools`;
    const description = `Discover the best ${categoryName} AI tools including free and paid options. Handpicked ${categoryName.toLowerCase()} tools for professionals, students and developers.`;

    return {
        title,
        description,
        keywords: [
            `${categoryName.toLowerCase()} ai tools`,
            `best ${categoryName.toLowerCase()} ai`,
            `free ${categoryName.toLowerCase()} ai tools`,
            `ai tools for ${categoryName.toLowerCase()}`,
            `${categoryName.toLowerCase()} artificial intelligence`,
        ],
        alternates: {
            canonical: `https://ultimateaitools.online/category/${params.slug}/`,
        },
        openGraph: {
            title,
            description,
            url: `https://ultimateaitools.online/category/${params.slug}/`,
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

    if (!segment && tools.length === 0) {
        return <div className="p-20 text-center text-gray-500 font-medium">Category not found</div>;
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ultimateaitools.online/' },
            { '@type': 'ListItem', position: 2, name: 'AI Tools', item: 'https://ultimateaitools.online/ai-tools/' },
            { '@type': 'ListItem', position: 3, name: categoryName, item: `https://ultimateaitools.online/category/${params.slug}/` },
        ],
    };

    const categorySchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryName} AI Tools`,
        description: `Best ${categoryName} AI tools including free and paid options.`,
        url: `https://ultimateaitools.online/category/${params.slug}/`,
        numberOfItems: tools.length,
        hasPart: tools.slice(0, 10).map(tool => ({
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            url: `https://ultimateaitools.online/tools/${tool.slug}/`,
            applicationCategory: 'BusinessApplication',
            isAccessibleForFree: tool.freeTier?.toLowerCase() === 'free',
        })),
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <div className="mb-12 border-b border-surface-border pb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{categoryName}</h1>
                <p className="text-lg text-gray-400">
                    Discover handpicked tools specifically selected for {categoryName.toLowerCase()}.
                </p>
            </div>

            {tools.length > 0 ? (
                <>
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
                    <Link href="/ai-tools" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Browse all AI tools &rarr;
                    </Link>
                    <Link href={`/prompts/category/${params.slug}`} className="text-primary-400 hover:text-primary-300 font-semibold">
                        View matching prompts &rarr;
                    </Link>
                    <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Read AI blog guides &rarr;
                    </Link>
                    <Link href="/models" className="text-primary-400 hover:text-primary-300 font-semibold">
                        Compare AI models &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
}
