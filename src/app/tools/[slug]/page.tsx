import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/data';
import Link from 'next/link';
import { toolContentData } from '@/lib/contentData';
import AdSlot from '@/components/AdSlot';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { tools } = getData();
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tools } = getData();
    const tool = tools.find((t) => t.slug === params.slug);

    if (!tool) {
        return { title: 'Tool Not Found' };
    }

    const catName = tool.category.replace(/-/g, ' ');
    const isFree = tool.freeTier.toLowerCase() === 'free';
    const tierLabel = isFree ? 'Free' : tool.freeTier;
    const seoTitle = `${tool.name} - ${tierLabel} AI Tool for ${catName.replace(/\b\w/g, c => c.toUpperCase())} 2026`;
    const seoDesc = `${tool.description.slice(0, 130)}`.trim() + (tool.description.length > 130 ? '...' : '');
    const keywords = [
        `${tool.name.toLowerCase()}`,
        `${tool.name.toLowerCase()} review`,
        `${tool.name.toLowerCase()} free`,
        `best ai tools for ${catName}`,
        `${catName} ai tool`,
        `${tool.freeTier.toLowerCase()} ai ${catName} tool`,
        'ai tools 2026',
        'ultimate ai tools',
    ];

    return {
        title: seoTitle,
        description: seoDesc,
        keywords,
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `https://ultimateaitools.online/tools/${tool.slug}/`,
            siteName: 'UltimateAITools',
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDesc,
        },
        alternates: {
            canonical: `https://ultimateaitools.online/tools/${tool.slug}/`,
        },
    };
}

export default function ToolDetailPage({ params }: Props) {
    const { tools } = getData();
    const tool = tools.find((t) => t.slug === params.slug);

    if (!tool) {
        notFound();
    }

    const content = toolContentData[tool.slug] || {
        whatIs: [`${tool.name} is a powerful AI tool for ${tool.category.replace('-', ' ')}.`, "It helps automate processes efficiently.", "Explore its features below."],
        features: ["AI-powered automation at scale", "High-quality, rapid output generation", `Designed specifically for ${tool.category.replace('-', ' ')}`, "User-friendly, intuitive interface", "Regular model and feature updates"],
        bestFor: ["Professionals and Enterprises", "Agencies and Freelancers", "Small Business Owners", "Students and Educators"],
        useCases: ["Accelerating daily workflows and reducing manual data entry.", "Analyzing large datasets to extract actionable insights quickly.", "Scaling operations without the need for proportional increases in headcount.", "Improving communication efficiency and professional output quality."]
    };

    const relatedTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
    const isFreeTool = tool.freeTier.toLowerCase() === 'free';

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "isAccessibleForFree": isFreeTool,
        "description": tool.description,
        "url": `https://ultimateaitools.online/tools/${tool.slug}/`
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ultimateaitools.online/" },
            { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": "https://ultimateaitools.online/ai-tools/" },
            { "@type": "ListItem", "position": 3, "name": tool.category.replace(/-/g, ' '), "item": `https://ultimateaitools.online/category/${tool.category}/` },
            { "@type": "ListItem", "position": 4, "name": tool.name, "item": `https://ultimateaitools.online/tools/${tool.slug}/` },
        ]
    };

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="bg-surface-card border border-surface-border rounded-3xl p-8 md:p-12 shadow-sm mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center p-4 text-primary-600 flex-shrink-0">
                        <span className="font-bold text-4xl">{tool.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">{tool.name}</h1>
                        <div className="flex flex-wrap gap-2 text-sm font-medium">
                            <span className="bg-surface-border text-gray-300 px-3 py-1 rounded-full uppercase tracking-wider">{tool.category.replace('-', ' ')}</span>
                            <span className="bg-primary-900/50 text-primary-300 px-3 py-1 rounded-full uppercase tracking-wider border border-primary-800/50">{tool.freeTier}</span>
                        </div>
                    </div>
                </div>
                <div className="prose prose-primary max-w-none">
                    <h2 className="text-2xl font-bold text-foreground border-b pb-2 mb-4">About {tool.name}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">{tool.description}</p>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-foreground mb-4">What is {tool.name}?</h3>
                        {content.whatIs.map((para, i) => (
                            <p key={i} className="text-gray-300 leading-relaxed mb-4">{para}</p>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4">Key Features</h3>
                            <ul className="space-y-2 text-gray-400">
                                {content.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></div> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4">Best For</h3>
                            <ul className="space-y-2 text-gray-400">
                                {content.bestFor.map((audience, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div> {audience}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-foreground mb-4">Free Tier Information</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Accessing powerful tools doesn&apos;t always have to break the bank. {tool.name} currently offers a <strong>{tool.freeTier}</strong> pricing model. This allows users to test the core features, evaluate the output quality, and determine if it fits their workflow before committing to a paid subscription. Be sure to check their official pricing page for the most up-to-date limits and quota resets.
                        </p>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-foreground mb-4">Common Use Cases</h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-6">
                            {content.useCases.map((useCase, i) => (
                                <li key={i}>{useCase}</li>
                            ))}
                        </ul>
                    </div>

                    <AdSlot adSlot="1000000006" format="horizontal" />

                    <div className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">Explore Similar Tools</h3>
                        <p className="text-gray-300 mb-4">
                            Want to discover more tools like {tool.name}? Head over to our dedicated category page to find the best alternatives and compare features.
                        </p>
                        <a href={`/category/${tool.category}`} className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                            Explore more tools in {tool.category.replace('-', ' ')} &rarr;
                        </a>
                    </div>

                    <div className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">Related Guides and Resources</h3>
                        <p className="text-gray-300 mb-4">
                            Learn how to use {tool.name} better with practical tutorials, prompts, and model comparisons.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link href={`/category/${tool.category}`} className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                More {tool.category.replace('-', ' ')} tools &rarr;
                            </Link>
                            <Link href="/blog" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Read AI Blog Guides &rarr;
                            </Link>
                            <Link href="/prompts" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Try Prompt Library &rarr;
                            </Link>
                            <Link href="/models" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Compare AI Models &rarr;
                            </Link>
                        </div>
                    </div>

                    <div className="bg-surface-hover p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-surface-border">
                        <div>
                            <p className="font-bold text-foreground text-lg mb-1">Ready to try {tool.name}?</p>
                            <p className="text-gray-400 text-sm">Explore its {tool.category.replace('-', ' ')} capabilities today.</p>
                        </div>
                        <a
                            href={tool.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-sm text-center w-full sm:w-auto flex-shrink-0"
                        >
                            Visit {tool.name}
                        </a>
                    </div>
                </div>
            </div>

            {/* Related Tools Section */}
            <div className="mt-16 pt-10 border-t border-surface-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related AI Tools in {tool.category.replace('-', ' ')}</h2>
                {relatedTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedTools.map(related => (
                            <Link key={related.id} href={`/tools/${related.slug}`} className="saas-card p-5 group flex flex-col h-full hover:border-primary-500/50">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-400 mb-4">
                                    <span className="font-bold text-xl">{related.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-bold text-foreground group-hover:text-primary-400 transition-colors mb-2">{related.name}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2 flex-grow mb-4">{related.description}</p>
                                <span className="text-sm font-semibold text-primary-400 mt-auto">View Details &rarr;</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No related tools found in this category.</p>
                )}
            </div>
        </article>
    );
}

