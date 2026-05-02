import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { toolContentData } from '@/lib/contentData';
import AdSlot from '@/components/AdSlot';
import { SITE_NAME, SITE_URL, formatSlugLabel, getCategoryIntent, makeToolSeoDescription, makeToolSeoTitle } from '@/lib/seo';
import { getToolReviewExtra } from '@/lib/toolReviewData';

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
    const seoTitle = makeToolSeoTitle(tool.name, tool.freeTier, tool.category);
    const seoDesc = makeToolSeoDescription(tool.name, tool.description, tool.freeTier, tool.category);
    const keywords = [
        `${tool.name.toLowerCase()}`,
        `${tool.name.toLowerCase()} review`,
        `${tool.name.toLowerCase()} pricing`,
        `${tool.name.toLowerCase()} alternatives`,
        `${catName} ai tool`,
        `ai tools for ${catName}`,
        `${tool.freeTier.toLowerCase()} ${catName} ai tool`,
    ];

    return {
        title: seoTitle,
        description: seoDesc,
        keywords,
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `${SITE_URL}/tools/${tool.slug}/`,
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
            canonical: `${SITE_URL}/tools/${tool.slug}/`,
        },
    };
}

export default function ToolDetailPage({ params }: Props) {
    const { tools } = getData();
    const tool = tools.find((t) => t.slug === params.slug);

    if (!tool) {
        notFound();
    }

    const categoryName = formatSlugLabel(tool.category);
    const categoryIntent = getCategoryIntent(tool.category);
    const content = toolContentData[tool.slug] || {
        whatIs: [
            `${tool.name} is a ${categoryName.toLowerCase()} AI tool built for ${categoryIntent.audience}.`,
            `It is most useful when you need help with ${categoryIntent.job}.`,
            `Before choosing it, compare ${categoryIntent.comparisonAngle} against the alternatives in this category.`
        ],
        features: [
            `Workflow support for ${categoryName.toLowerCase()} tasks`,
            "Fast first drafts, suggestions, or generated outputs",
            "Beginner-friendly interface for testing the tool quickly",
            "Useful free or trial access for evaluating real use cases",
            "Works best when paired with clear prompts and human review"
        ],
        bestFor: [
            categoryIntent.audience,
            "Teams comparing AI tools before paying for a subscription",
            "Users who want to test a focused AI workflow",
            "Creators and operators looking for practical time savings"
        ],
        useCases: [
            `Testing whether ${tool.name} improves a real ${categoryName.toLowerCase()} workflow.`,
            "Comparing output quality against similar tools before committing to a paid plan.",
            "Creating a faster first draft, prototype, summary, or workflow step for daily work.",
            "Reducing repetitive manual tasks while keeping final review under human control."
        ]
    };

    const relatedTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
    const isFreeTool = tool.freeTier.toLowerCase() === 'free';
    const reviewExtra = getToolReviewExtra(tool.slug);
    const pricingSummary = isFreeTool
        ? 'Free access is the main reason to test this tool early, especially for light or occasional workflows.'
        : `${tool.freeTier} access means you should compare the value against alternatives before making it part of a recurring workflow.`;
    const toolReviewPoints = [
        `Best workflow fit: ${categoryIntent.job}.`,
        `Primary comparison criteria: ${categoryIntent.comparisonAngle}.`,
        pricingSummary,
    ];
    const limitations = [
        'AI output should be reviewed before publishing, submitting, or using in client work.',
        'Free-plan limits, export rules, watermark policies, and feature access may change over time.',
        `For serious ${categoryName.toLowerCase()} work, compare at least two alternatives before choosing one tool.`,
    ];
    const reviewCriteria = [
        'Does the free or trial access let a real user test the core workflow?',
        `Does the output quality hold up for practical ${categoryName.toLowerCase()} tasks?`,
        'Is the interface simple enough for a new user to reach a useful result quickly?',
        'Are pricing, export limits, privacy terms, and commercial-use rules clear enough to trust?',
    ];
    const whoShouldUse = [
        `${categoryIntent.audience} who want to improve ${categoryName.toLowerCase()} work without starting from scratch.`,
        'Users comparing AI tools before committing to a paid workflow.',
        'Teams that want faster drafts, summaries, prototypes, or operational support with human review.',
    ];
    const whoShouldAvoid = [
        'Users who need guaranteed factual accuracy without checking the output.',
        'Teams handling sensitive data without reviewing the tool privacy policy first.',
        'Anyone expecting AI to replace domain expertise, quality control, or final approval.',
    ];
    const displayedPros = reviewExtra?.pros || toolReviewPoints;
    const displayedCons = reviewExtra?.cons || limitations;

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "operatingSystem": "Web",
        "applicationCategory": "SoftwareApplication",
        "applicationSubCategory": categoryName,
        "isAccessibleForFree": isFreeTool,
        "description": tool.description,
        "url": `${SITE_URL}/tools/${tool.slug}/`,
        "sameAs": tool.websiteURL.startsWith('http') ? tool.websiteURL : undefined,
        "offers": {
            "@type": "Offer",
            "price": isFreeTool ? "0" : undefined,
            "priceCurrency": "USD",
            "availability": "https://schema.org/OnlineOnly"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": `${SITE_URL}/ai-tools/` },
            { "@type": "ListItem", "position": 3, "name": categoryName, "item": `${SITE_URL}/category/${tool.category}/` },
            { "@type": "ListItem", "position": 4, "name": tool.name, "item": `${SITE_URL}/tools/${tool.slug}/` },
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is ${tool.name} best for?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${tool.name} is best for users who need help with ${categoryIntent.job}.`
                }
            },
            {
                "@type": "Question",
                "name": `Is ${tool.name} free to use?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${tool.name} is listed with a ${tool.freeTier} pricing model. Check the official site for the latest usage limits, credits, and paid-plan details.`
                }
            }
        ]
    };

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="bg-surface-card border border-surface-border rounded-3xl p-8 md:p-12 shadow-sm mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center p-4 text-primary-600 flex-shrink-0">
                        {tool.logo ? (
                            <Image src={tool.logo} alt={`${tool.name} logo`} width={48} height={48} className="object-contain" priority />
                        ) : (
                            <span className="font-bold text-4xl">{tool.name.charAt(0)}</span>
                        )}
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

                    {reviewExtra && (
                        <section className="mb-10 rounded-2xl border border-primary-900/60 bg-primary-950/20 p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-3">Expert Verdict</h2>
                            <p className="text-gray-300 mb-4">{reviewExtra.verdict}</p>
                            <p className="text-gray-400"><strong className="text-foreground">Best use:</strong> {reviewExtra.bestUse}</p>
                            <p className="text-gray-400 mt-2"><strong className="text-foreground">Pricing note:</strong> {reviewExtra.pricingNote}</p>
                        </section>
                    )}

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
                            {tool.name} is listed with a <strong>{tool.freeTier}</strong> pricing model. Use the free or trial access to test one real {categoryName.toLowerCase()} workflow, compare output quality, and check whether the tool fits your process before upgrading. Pricing and usage limits can change, so verify the latest quota, watermark, export, and team restrictions on the official site.
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

                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">{tool.name} Pros</h3>
                            <ul className="space-y-3 text-gray-300">
                                {displayedPros.map((point) => (
                                    <li key={point} className="flex gap-3">
                                        <span className="text-primary-400 font-bold">+</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">{tool.name} Cons</h3>
                            <ul className="space-y-3 text-gray-300">
                                {displayedCons.map((point) => (
                                    <li key={point} className="flex gap-3">
                                        <span className="text-gray-500 font-bold">-</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {reviewExtra && (
                        <section className="mb-10 bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Best Alternatives to {tool.name}</h3>
                            <div className="flex flex-wrap gap-3">
                                {reviewExtra.alternatives.map((alternative) => (
                                    <span key={alternative} className="rounded-full border border-surface-border bg-surface-card px-4 py-2 text-sm font-semibold text-gray-300">
                                        {alternative}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mb-10 bg-surface-hover border border-surface-border rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-foreground mb-4">Our Review Method for {tool.name}</h3>
                        <p className="text-gray-300 mb-5">
                            We evaluate {tool.name} as a practical {categoryName.toLowerCase()} tool, not just a feature list. The goal is to understand whether it can help a real user finish useful work faster.
                        </p>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            {reviewCriteria.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 mt-5">
                            Pricing and free-plan details change often, so we recommend checking the official website before making a final decision.
                        </p>
                    </section>

                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Who Should Use {tool.name}</h3>
                            <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                {whoShouldUse.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Who Should Avoid It</h3>
                            <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                {whoShouldAvoid.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <AdSlot adSlot="1000000006" format="horizontal" />

                    <div className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">Explore Similar Tools</h3>
                        <p className="text-gray-300 mb-4">
                            Want to discover more tools like {tool.name}? Head over to our dedicated category page to find the best alternatives and compare features.
                        </p>
                        <a href={`/category/${tool.category}/`} className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                            Explore more tools in {tool.category.replace('-', ' ')} &rarr;
                        </a>
                    </div>

                    <div className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">Related Guides and Resources</h3>
                        <p className="text-gray-300 mb-4">
                            Learn how to use {tool.name} better with practical tutorials, prompts, and model comparisons.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link href={`/category/${tool.category}/`} className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                More {tool.category.replace('-', ' ')} tools &rarr;
                            </Link>
                            <Link href="/blog/" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Read AI Blog Guides &rarr;
                            </Link>
                            <Link href="/prompts/" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Try Prompt Library &rarr;
                            </Link>
                            <Link href="/models/" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
                                Compare AI Models &rarr;
                            </Link>
                        </div>
                    </div>

                    <section className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-4">{tool.name} FAQ</h3>
                        <div className="space-y-5">
                            <div>
                                <h4 className="font-bold text-foreground mb-2">What is {tool.name} best for?</h4>
                                <p className="text-gray-300">{tool.name} is best for users who need help with {categoryIntent.job}.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-2">Is {tool.name} free to use?</h4>
                                <p className="text-gray-300">{tool.name} is listed with a {tool.freeTier} pricing model. Always check the official site for current limits and pricing.</p>
                            </div>
                        </div>
                    </section>

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
                            <Link key={related.id} href={`/tools/${related.slug}/`} className="saas-card p-5 group flex flex-col h-full hover:border-primary-500/50">
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

