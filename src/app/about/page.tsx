import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About UltimateAITools - Editorial Mission and Quality Standards',
    description: 'Learn about UltimateAITools, our editorial process, and how we curate AI tools, prompts, and educational content for users in 2026.',
    keywords: [
        'about ultimateaitools',
        'ai tools directory mission',
        'ai tools editorial standards',
        'free ai tools curation',
    ],
    openGraph: {
        title: 'About UltimateAITools - Editorial Mission and Quality Standards',
        description: 'Understand how UltimateAITools reviews and curates AI tools and educational resources.',
        url: 'https://ultimateaitools.online/about/',
        siteName: 'UltimateAITools',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'About UltimateAITools',
        description: 'Our mission and quality standards for AI tools and content.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/about/',
    },
};

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-invert prose-primary">
            <h1 className="text-4xl font-bold mb-8 text-foreground">About UltimateAITools</h1>
            <div className="text-gray-400 space-y-6">
                <p className="text-lg">UltimateAITools was founded with a singular mission: to make artificial intelligence accessible to everyone by curating the definitive directory of free AI tools.</p>
                <h2 className="text-2xl font-semibold text-gray-200 mt-8">Our Mission</h2>
                <p>In a world where new AI applications are launched daily, it&apos;s difficult to separate signal from noise. We meticulously research, review, and categorize the best freely available AI tools, empowering students, developers, businesses, and creators to boost their workflow.</p>
                <h2 className="text-2xl font-semibold text-gray-200 mt-8">Strictly Curated</h2>
                <p>We do not accept every tool submitted. Our directory emphasizes high-quality interfaces, generous free tiers, and tangible utility over buzzwords.</p>
            </div>
        </div>
    );
}
