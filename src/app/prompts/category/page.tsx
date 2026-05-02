import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Prompt Categories | Browse Prompt Library by Use Case',
    description: 'Browse the AI prompt library by category. Explore prompt collections for marketing, business, coding, study, productivity, social media, and image generation.',
    keywords: [
        'ai prompt categories',
        'chatgpt prompt library',
        'ai prompt templates',
        'free ai prompts',
        'prompt categories 2026',
        'ai workflow prompts',
    ],
    openGraph: {
        title: 'AI Prompt Categories | Browse Prompt Library by Use Case',
        description: 'Explore AI prompt collections by category. Copy-paste prompt templates for marketing, coding, productivity, and more.',
        url: 'https://ultimateaitools.online/prompts/category/',
        siteName: 'UltimateAITools',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Prompt Categories | UltimateAITools',
        description: 'Browse category-wise prompt collections for ChatGPT, Gemini, Claude, and Grok.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/prompts/',
    },
    robots: {
        index: false,
        follow: true,
    },
};

export { default } from '../page';
