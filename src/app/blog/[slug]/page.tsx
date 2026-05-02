import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogsData, getData } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildToolLinkMap(tools: { name: string; slug: string }[]): [string, string][] {
    const entries: [string, string][] = [];
    const seen = new Set<string>();

    for (const tool of tools) {
        const primary = tool.name.trim();
        if (primary && !seen.has(`${primary}|${tool.slug}`)) {
            entries.push([primary, tool.slug]);
            seen.add(`${primary}|${tool.slug}`);
        }

        // Add alias without parenthetical part for better natural matching.
        const alias = primary.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
        if (alias && alias.length >= 4 && alias !== primary && !seen.has(`${alias}|${tool.slug}`)) {
            entries.push([alias, tool.slug]);
            seen.add(`${alias}|${tool.slug}`);
        }
    }

    return entries.sort((a, b) => b[0].length - a[0].length);
}

// Renders a text block with tool names auto-linked (first occurrence only per block)
function renderWithToolLinks(text: string, toolLinkMap: [string, string][]): string {
    if (!text) return '';
    let result = text;
    const linked = new Set<string>();

    for (const [name, slug] of toolLinkMap) {
        if (linked.has(slug)) continue;
        // Word-boundary safe: match tool name not inside an existing <a> tag
        const escaped = escapeRegExp(name);
        const regex = new RegExp(`(?<!<[^>]*)\\b(${escaped})\\b`, 'g');
        if (regex.test(result)) {
            result = result.replace(
                new RegExp(`(?<!href=["'][^"']*)\\b(${escaped})\\b`, ''),
                `<a href="/tools/${slug}/" class="text-primary-400 hover:text-primary-300 underline underline-offset-2 font-medium" target="_self">$1</a>`
            );
            linked.add(slug);
        }
    }
    // Preserve newlines
    return result.replace(/\n/g, '<br />');
}

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { blogs } = getBlogsData();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Category-based keywords for blog SEO
const blogCategoryKeywords: Record<string, string[]> = {
    'coding': ['ai coding tools', 'ai programming', 'code with ai', 'ai developer tools 2026'],
    'writing-tools': ['ai writing tools', 'ai content writing', 'chatgpt writing', 'ai copywriting 2026'],
    'image-generators': ['ai image generation', 'ai art generator', 'text to image ai', 'best ai image tools'],
    'video-generators': ['ai video generator', 'text to video ai', 'ai video creation', 'ai video tools 2026'],
    'audio-tools': ['ai audio tools', 'ai voice generator', 'ai music generation', 'text to speech ai'],
    'automation-tools': ['ai automation', 'ai workflow automation', 'zapier ai', 'n8n ai automation'],
    'productivity': ['ai productivity tools', 'ai for work', 'ai time management', 'productivity ai 2026'],
    'marketing-tools': ['ai marketing tools', 'ai seo tools', 'ai content marketing', 'ai advertising 2026'],
    'models-comparison': ['ai model comparison', 'best ai model 2026', 'gpt vs claude', 'ai models ranked'],
    'agentic-ai': ['ai agents', 'autonomous ai', 'ai agent tools', 'agentic ai 2026'],
    'business-tools': ['ai business tools', 'ai for business', 'enterprise ai', 'ai business automation'],
    'social-media-tools': ['ai social media', 'ai content creator', 'social media ai tools', 'ai instagram'],
    'chrome-extensions': ['ai chrome extensions', 'browser ai tools', 'chatgpt chrome extension'],
    'resume-tools': ['ai resume builder', 'ai cv maker', 'resume ai tools', 'job search ai'],
    'study-tools': ['ai study tools', 'ai for students', 'ai learning tools', 'study with ai'],
    'developer-tools': ['ai developer tools', 'ai api tools', 'llm tools', 'ai for developers'],
    'tutorials': ['ai tutorials', 'how to use ai', 'ai guide 2026', 'learn ai tools'],
    'beginner-guides': ['ai for beginners', 'how to start with ai', 'ai beginner guide'],
    'reviews': ['ai tool review', 'ai software review', 'best ai tools reviewed'],
    'alternatives': ['ai tool alternatives', 'ai software comparison', 'best alternatives'],
    'news': ['ai news 2026', 'latest ai updates', 'ai industry news'],
    'content-creation': ['ai content creation', 'ai content tools', 'content ai 2026'],
};

function makeSeoTitle(title: string): string {
    // Target: under 60 chars
    const MAX = 58;
    if (title.length <= MAX) return title;
    // Try truncating at last space before limit
    const cut = title.lastIndexOf(' ', MAX - 3);
    return cut > 20 ? title.slice(0, cut) + '...' : title.slice(0, MAX - 3) + '...';
}

function makeSeoDesc(desc: string): string {
    // Target: under 155 chars
    const MAX = 155;
    if (desc.length <= MAX) return desc;
    const cut = desc.lastIndexOf(' ', MAX - 3);
    return cut > 50 ? desc.slice(0, cut) + '...' : desc.slice(0, MAX - 3) + '...';
}

function normalizeKeywords(candidates: string[]): string[] {
    const seen = new Set<string>();
    const cleaned: string[] = [];

    for (const raw of candidates) {
        const kw = raw.trim().toLowerCase();
        if (!kw || kw.length < 4) continue;
        if (seen.has(kw)) continue;
        seen.add(kw);
        cleaned.push(kw);
    }

    return cleaned.slice(0, 14);
}

function getBlogToolCategory(category: string): string {
    const map: Record<string, string> = {
        coding: 'coding',
        'developer-tools': 'developer-tools',
        'writing-tools': 'writing-tools',
        'image-generators': 'image-generators',
        'video-generators': 'video-generators',
        'audio-tools': 'audio-tools',
        'automation-tools': 'automation-tools',
        productivity: 'productivity',
        'marketing-tools': 'marketing-tools',
        'business-tools': 'business-tools',
        'social-media-tools': 'social-media-tools',
        'chrome-extensions': 'chrome-extensions',
        'resume-tools': 'resume-tools',
        'study-tools': 'study-tools',
        'agentic-ai': 'agentic-ai',
        'content-creation': 'content-creation',
        reviews: 'productivity',
        alternatives: 'productivity',
        tutorials: 'productivity',
        'beginner-guides': 'productivity',
        news: 'productivity',
        'models-comparison': 'productivity',
    };

    return map[category] || 'productivity';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { blogs } = getBlogsData();
    const blog = blogs.find((p) => p.slug === params.slug);

    if (!blog) {
        return { title: 'Blog Not Found' };
    }

    const seoTitle = makeSeoTitle(blog.title);
    const seoDesc = makeSeoDesc(blog.shortDescription);
    const categoryKws = blogCategoryKeywords[blog.category] || ['ai workflow strategy 2026', 'ai implementation playbook 2026'];
    const topicKws = blog.topic ? [
        blog.topic.toLowerCase(),
        `${blog.topic.toLowerCase()} 2026`,
        `${blog.topic.toLowerCase()} use cases`,
    ] : [];
    const customKeywords = (blog as { seoKeywords?: string[] }).seoKeywords || [];
    const titlePhrase = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

    const keywords = normalizeKeywords([
        ...customKeywords,
        ...topicKws,
        ...categoryKws,
        `${titlePhrase} guide`,
        `${blog.category.replace(/-/g, ' ')} strategy 2026`,
        `${blog.category.replace(/-/g, ' ')} tools for professionals`,
        'ultimateaitools editorial analysis',
    ]);

    return {
        title: seoTitle,
        description: seoDesc,
        keywords,
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `https://ultimateaitools.online/blog/${blog.slug}/`,
            siteName: 'UltimateAITools',
            locale: 'en_US',
            type: 'article',
            publishedTime: blog.publishDate,
            authors: [blog.author],
            images: blog.imageUrl
                ? [{ url: `https://ultimateaitools.online${blog.imageUrl}`, alt: blog.imageAlt || blog.title, width: 1200, height: 630 }]
                : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDesc,
        },
        alternates: {
            canonical: `https://ultimateaitools.online/blog/${blog.slug}/`,
        },
    };
}

export default function BlogDetailPage({ params }: Props) {
    const { blogs } = getBlogsData();
    const { tools } = getData();
    const blog = blogs.find((p) => p.slug === params.slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = blogs.filter(p => p.category === blog.category && p.slug !== blog.slug).slice(0, 4);
    const recommendedCategory = getBlogToolCategory(blog.category);
    const recommendedTools = tools
        .filter((tool) => tool.category === recommendedCategory)
        .slice(0, 4);
    const toolLinkMap = buildToolLinkMap(tools.map((tool) => ({ name: tool.name, slug: tool.slug })));
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        description: blog.shortDescription,
        datePublished: blog.publishDate,
        dateModified: blog.publishDate,
        author: {
            '@type': 'Person',
            name: blog.author,
            url: 'https://ultimateaitools.online/author/ultimateaitools-editorial-team/',
        },
        mainEntityOfPage: `https://ultimateaitools.online/blog/${blog.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'UltimateAITools',
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ultimateaitools.online/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://ultimateaitools.online/blog/' },
            { '@type': 'ListItem', position: 3, name: blog.title, item: `https://ultimateaitools.online/blog/${blog.slug}/` },
        ],
    };

    const faqs: { q: string; a: string }[] = (blog as { faqs?: { q: string; a: string }[] }).faqs || [];
    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    } : null;

    return (
        <article className="bg-surface-card">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            {/* Header / Hero */}
            <header className="bg-surface-hover border-b border-surface-border py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-900/30 text-primary-400 font-bold text-sm rounded-full tracking-widest uppercase mb-6 border border-primary-800">
                        {blog.category.replace('-', ' ')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-8">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-primary-400 font-bold">
                                {blog.author.charAt(0)}
                            </div>
                            <Link href="/author/ultimateaitools-editorial-team/" className="hover:text-primary-400 transition-colors">{blog.author}</Link>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <time>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <span>{blog.readingTime}</span>
                    </div>
                    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <span>Human reviewed</span>
                        <span className="text-gray-600">|</span>
                        <span>Updated when tools change</span>
                    </div>
                </div>
            </header>

            <section className="max-w-4xl mx-auto px-4 pt-10">
                <div className="rounded-2xl border border-surface-border bg-surface-hover p-6">
                    {blog.imageUrl ? (
                        <div className="relative w-full h-72 rounded-xl overflow-hidden border border-surface-border">
                            <Image
                                src={blog.imageUrl}
                                alt={blog.imageAlt || blog.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <>
                            <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold mb-2">AI Generated Image Placeholder</p>
                            <p className="text-sm text-gray-300 mb-2">{blog.imageAlt || `Featured visual for: ${blog.title}`}</p>
                            <p className="text-xs text-gray-500">Image Prompt: {blog.imagePrompt || `Create a clean editorial illustration for "${blog.title}" in modern SaaS style.`}</p>
                        </>
                    )}
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">

                {/* Table of Contents Sidebar */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24 p-6 bg-surface-hover rounded-2xl border border-surface-border">
                        <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Table of Contents</h4>
                        <nav className="space-y-3 text-sm font-medium text-gray-400">
                            <a href="#intro" className="block hover:text-primary-600 transition-colors">Introduction</a>
                            <a href="#what-you-will-learn" className="block hover:text-primary-600 transition-colors">What You Will Learn</a>
                            <a href="#best-tools" className="block hover:text-primary-600 transition-colors">Best Tools for This Task</a>
                            <a href="#use-cases" className="block hover:text-primary-600 transition-colors">Real World Use Cases</a>
                            <a href="#conclusion" className="block hover:text-primary-600 transition-colors">Conclusion</a>
                            {faqs.length > 0 && <a href="#faq" className="block hover:text-primary-600 transition-colors">FAQ</a>}
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="prose prose-invert prose-lg prose-primary max-w-none flex-grow text-gray-300 leading-relaxed font-sans">

                    <section id="intro" className="mb-12">
                        <p className="text-xl leading-relaxed text-gray-400 font-medium"
                            dangerouslySetInnerHTML={{ __html: renderWithToolLinks(blog.content.intro, toolLinkMap) }} />
                    </section>

                    <section id="what-you-will-learn" className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans">What You Will Learn</h2>
                        <p className="text-gray-300"
                            dangerouslySetInnerHTML={{ __html: renderWithToolLinks(blog.content.whatYouWillLearn, toolLinkMap) }} />
                    </section>

                    <section id="best-tools" className="mb-12 p-8 bg-surface-hover rounded-3xl border border-surface-border">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans mt-0">Best Tools for This Task</h2>
                        <p className="text-gray-300"
                            dangerouslySetInnerHTML={{ __html: renderWithToolLinks(blog.content.bestTools, toolLinkMap) }} />
                    </section>

                    {recommendedTools.length > 0 && (
                        <section className="mb-12 p-8 bg-surface-hover rounded-3xl border border-surface-border">
                            <h2 className="text-3xl font-bold text-foreground mb-6 font-sans mt-0">Recommended Tools to Try</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                                {recommendedTools.map((tool) => (
                                    <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="rounded-xl border border-surface-border bg-surface-card p-5 hover:border-primary-500/50 transition-colors">
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <h3 className="font-bold text-foreground">{tool.name}</h3>
                                            <span className="text-[11px] uppercase tracking-wider text-primary-300 bg-primary-900/40 px-2 py-1 rounded-full">{tool.freeTier}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-3">{tool.description}</p>
                                    </Link>
                                ))}
                            </div>
                            <Link href={`/category/${recommendedCategory}/`} className="inline-block mt-5 text-primary-400 hover:text-primary-300 font-semibold not-prose">
                                Compare more {recommendedCategory.replace(/-/g, ' ')} tools &rarr;
                            </Link>
                        </section>
                    )}

                    <AdSlot adSlot="1000000003" format="horizontal" />

                    <section id="use-cases" className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans">Real World Use Cases</h2>
                        <p className="text-gray-300"
                            dangerouslySetInnerHTML={{ __html: renderWithToolLinks(blog.content.useCases, toolLinkMap) }} />
                    </section>

                    <section id="conclusion" className="mb-12 border-t border-surface-border pt-10">
                        <h2 className="text-2xl font-bold text-foreground mb-6 font-sans">Conclusion</h2>
                        <p className="text-gray-300"
                            dangerouslySetInnerHTML={{ __html: renderWithToolLinks(blog.content.conclusion, toolLinkMap) }} />
                    </section>

                    {faqs.length > 0 && (
                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-6 font-sans">Frequently Asked Questions</h2>
                            <div className="space-y-4 not-prose">
                                {faqs.map((faq, i) => (
                                    <details key={i} className="group border border-surface-border rounded-xl bg-surface-hover overflow-hidden">
                                        <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-4 font-semibold text-foreground hover:text-primary-400 transition-colors list-none">
                                            <span>{faq.q}</span>
                                            <span className="text-primary-400 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-surface-border pt-4">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mb-12 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-4 font-sans">Editorial Note</h2>
                        <p className="text-gray-300 mb-4">
                            UltimateAITools reviews AI tools and workflows for practical usefulness, free-plan value, clarity, and real-world fit. We avoid treating AI output as final until it has been checked for accuracy, context, and current tool limits.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mb-6">
                            <Link href="/review-methodology/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Read our review methodology &rarr;
                            </Link>
                            <Link href="/editorial-policy/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Read our editorial policy &rarr;
                            </Link>
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-4 font-sans">Continue Learning</h2>
                        <p className="text-gray-300 mb-4">
                            Explore related resources to go deeper on this topic and discover practical tools.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
                            <Link href={`/category/${blog.category}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                Explore {blog.category.replace('-', ' ')} tools &rarr;
                            </Link>
                            <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Browse AI Tools Directory &rarr;
                            </Link>
                            <Link href="/prompts/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                View Prompt Library &rarr;
                            </Link>
                            <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Compare AI Models &rarr;
                            </Link>
                        </div>
                    </section>

                </div>
            </main>

            {/* Related Articles */}
            <div className="bg-surface-hover border-t border-surface-border py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Related Articles</h2>
                    {relatedBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedBlogs.map(related => (
                                <Link key={related.id} href={`/blog/${related.slug}/`} className="saas-card p-6 flex flex-col h-full group hover:-translate-y-1 transition-transform border-0 shadow-sm hover:shadow-md">
                                    <div className="mb-4">
                                        <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{related.category.replace('-', ' ')}</span>
                                    </div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary-600 transition-colors text-lg mb-3 line-clamp-2">{related.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">{related.shortDescription}</p>
                                    <span className="font-bold text-primary-600 text-sm mt-auto inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read Article &rarr;
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No related articles found.</p>
                    )}
                </div>
            </div>
        </article>
    );
}


