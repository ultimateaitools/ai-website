import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPromptCategories, getSegments } from '@/lib/data';

export const metadata: Metadata = {
    title: 'HTML Sitemap | UltimateAITools',
    description: 'Browse all major sections of UltimateAITools including AI tools directory, prompts, blog guides, and policy pages.',
    openGraph: {
        title: 'HTML Sitemap | UltimateAITools',
        description: 'Access all major pages and categories on UltimateAITools.',
        url: 'https://ultimateaitools.online/sitemap/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/sitemap/',
    }
};

export default function Sitemap() {
    const segments = getSegments();
    const promptCategories = getPromptCategories();
    const toolCategories = segments.filter(seg => !['directory', 'blog', 'prompt-library', 'models-comparison'].includes(seg.slug));

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-foreground">Sitemap</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-surface-border pb-2">Main Pages</h2>
                    <ul className="space-y-2 text-primary-500">
                        <li><Link href="/" className="hover:text-primary-400">Homepage</Link></li>
                        <li><Link href="/ai-tools/" className="hover:text-primary-400">AI Tools Directory</Link></li>
                        <li><Link href="/prompts/" className="hover:text-primary-400">Prompt Categories</Link></li>
                        <li><Link href="/blog/" className="hover:text-primary-400">AI Blog</Link></li>
                        <li><Link href="/models/" className="hover:text-primary-400">AI Models Comparison</Link></li>
                        <li><Link href="/about/" className="hover:text-primary-400">About Us</Link></li>
                        <li><Link href="/contact-us/" className="hover:text-primary-400">Contact</Link></li>
                        <li><Link href="/privacy-policy/" className="hover:text-primary-400">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-conditions/" className="hover:text-primary-400">Terms & Conditions</Link></li>
                        <li><Link href="/disclaimer/" className="hover:text-primary-400">Disclaimer</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-surface-border pb-2">AI Tool Categories</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-primary-500 list-disc list-inside">
                        {toolCategories.map(seg => (
                            <li key={seg.slug}>
                                <Link href={`/category/${seg.slug}/`} className="hover:text-primary-400">{seg.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-surface-border pb-2">Prompt Categories</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-primary-500 list-disc list-inside">
                        {promptCategories.map(category => (
                            <li key={category.slug}>
                                <Link href={`/prompts/category/${category.slug}/`} className="hover:text-primary-400">{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
