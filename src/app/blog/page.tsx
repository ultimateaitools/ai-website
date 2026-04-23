import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogsData } from '@/lib/data';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'AI Blog - Practical Guides, Tutorials & Workflows | UltimateAITools',
    description: 'Read practical AI guides on prompts, tools, automation, SEO, coding, productivity, and business workflows. Updated weekly with new tutorials.',
    keywords: [
        'ai blog',
        'ai tutorials',
        'ai guides 2026',
        'ai workflow guides',
        'chatgpt tutorials',
        'ai automation guides',
        'ai productivity tips',
        'free ai learning resources',
    ],
    openGraph: {
        title: 'AI Blog - Practical Guides, Tutorials & Workflows | UltimateAITools',
        description: 'In-depth AI tutorials, workflow guides, and tool comparisons. Learn how to use AI tools for real productivity gains.',
        url: 'https://ultimateaitools.online/blog/',
        siteName: 'UltimateAITools',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Blog - Guides, Tutorials & Workflows',
        description: 'Practical AI guides on prompts, automation, coding, SEO and productivity. New content every week.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/blog/',
    },
};

export default function BlogDirectoryPage() {
    const { blogs } = getBlogsData();

    return (
        <div className="bg-surface-card">
            <header className="bg-background py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                        AI Blog - Tools, Guides & Tutorials
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium">
                        Deep dive into practical use cases, comprehensive tutorials, and expert insights on scaling your operations.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AdSlot adSlot="1000000002" format="horizontal" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog.id} className="saas-card overflow-hidden flex flex-col h-full group">
                            {/* Featured Image Placeholder */}
                            <div className="h-48 bg-surface-border w-full overflow-hidden relative border-b border-surface-border">
                                {blog.imageUrl ? (
                                    <Image
                                        src={blog.imageUrl}
                                        alt={blog.imageAlt || blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-indigo-900/20 group-hover:scale-105 transition-transform duration-500"></div>
                                        <div className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-gray-300 bg-black/40 px-2 py-1 rounded">
                                            AI Generated Image
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="inline-block px-3 py-1 bg-primary-900/50 text-primary-300 font-semibold text-xs rounded-full tracking-wider uppercase border border-primary-800/50">
                                        {blog.category.replace('-', ' ')}
                                    </span>
                                    <time className="text-xs text-gray-500 font-medium">{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                </div>

                                <h2 className="text-xl font-bold text-foreground group-hover:text-primary-600 transition-colors mb-3 line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-400 line-clamp-3 mb-6 text-sm leading-relaxed flex-grow">
                                    {blog.shortDescription}
                                </p>

                                <div className="mt-auto flex justify-between items-center">
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="text-primary-400 font-bold text-sm tracking-wide group-hover:text-primary-300 hover:bg-surface-hover px-4 py-2 rounded-lg transition-colors -ml-4"
                                    >
                                        Read More &rarr;
                                    </Link>
                                    <span className="text-xs text-gray-400 font-medium">{blog.readingTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mt-16 rounded-2xl border border-surface-border bg-surface-hover p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Next Step After Reading</h2>
                    <p className="text-gray-400 mb-6">
                        Move from guides into directories and category pages to apply what you read.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Link href="/ai-tools" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Browse AI tools directory &rarr;
                        </Link>
                        <Link href="/prompts/category" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Open prompt categories &rarr;
                        </Link>
                        <Link href="/models" className="text-primary-400 hover:text-primary-300 font-semibold">
                            Compare AI models &rarr;
                        </Link>
                        <Link href="/sitemap" className="text-primary-400 hover:text-primary-300 font-semibold">
                            View full sitemap &rarr;
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

