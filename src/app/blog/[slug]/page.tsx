import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogsData } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { blogs } = getBlogsData();
    const blog = blogs.find((p) => p.slug === params.slug);

    if (!blog) {
        return { title: 'Blog Not Found' };
    }

    const seoTitle = makeSeoTitle(blog.title);
    const seoDesc = makeSeoDesc(blog.shortDescription);
    const categoryKws = blogCategoryKeywords[blog.category] || ['ai tools', 'ai guide', 'ai tutorial 2026'];
    const topicKws = blog.topic ? [blog.topic.toLowerCase(), `${blog.topic.toLowerCase()} 2026`] : [];
    const keywords = [
        ...topicKws,
        ...categoryKws,
        `${blog.category.replace(/-/g, ' ')} guide`,
        'ultimateaitools',
    ].slice(0, 10);

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
    const blog = blogs.find((p) => p.slug === params.slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = blogs.filter(p => p.category === blog.category && p.slug !== blog.slug).slice(0, 4);
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
        },
        mainEntityOfPage: `https://ultimateaitools.online/blog/${blog.slug}`,
        publisher: {
            '@type': 'Organization',
            name: 'UltimateAITools',
        },
    };

    return (
        <article className="bg-surface-card">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
                            <span>{blog.author}</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <time>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <span>{blog.readingTime}</span>
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
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="prose prose-invert prose-lg prose-primary max-w-none flex-grow text-gray-300 leading-relaxed font-sans">

                    <section id="intro" className="mb-12">
                        <p className="text-xl leading-relaxed text-gray-400 font-medium whitespace-pre-line">
                            {blog.content.intro}
                        </p>
                    </section>

                    <section id="what-you-will-learn" className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans">What You Will Learn</h2>
                        <p className="text-gray-300 whitespace-pre-line">{blog.content.whatYouWillLearn}</p>
                    </section>

                    <section id="best-tools" className="mb-12 p-8 bg-surface-hover rounded-3xl border border-surface-border">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans mt-0">Best Tools for This Task</h2>
                        <p className="text-gray-300 whitespace-pre-line">{blog.content.bestTools}</p>
                    </section>

                    <AdSlot adSlot="1000000003" format="horizontal" />

                    <section id="use-cases" className="mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-6 font-sans">Real World Use Cases</h2>
                        <p className="text-gray-300 whitespace-pre-line">{blog.content.useCases}</p>
                    </section>

                    <section id="conclusion" className="mb-12 border-t border-surface-border pt-10">
                        <h2 className="text-2xl font-bold text-foreground mb-6 font-sans">Conclusion</h2>
                        <p className="text-gray-300 whitespace-pre-line">{blog.content.conclusion}</p>
                    </section>

                    <section className="mb-12 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-4 font-sans">Continue Learning</h2>
                        <p className="text-gray-300 mb-4">
                            Explore related resources to go deeper on this topic and discover practical tools.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
                            <Link href={`/category/${blog.category}`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                Explore {blog.category.replace('-', ' ')} tools &rarr;
                            </Link>
                            <Link href="/ai-tools" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Browse AI Tools Directory &rarr;
                            </Link>
                            <Link href="/prompts/category" className="text-primary-400 hover:text-primary-300 font-semibold">
                                View Prompt Library &rarr;
                            </Link>
                            <Link href="/models" className="text-primary-400 hover:text-primary-300 font-semibold">
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
                                <Link key={related.id} href={`/blog/${related.slug}`} className="saas-card p-6 flex flex-col h-full group hover:-translate-y-1 transition-transform border-0 shadow-sm hover:shadow-md">
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


