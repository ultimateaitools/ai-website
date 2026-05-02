import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPromptCategories, getPromptsData, getToolCategorySlugForPromptCategory } from '@/lib/data';
import Link from 'next/link';
import { promptContentData } from '@/lib/promptContentData';
import AdSlot from '@/components/AdSlot';
import { SITE_NAME, SITE_URL, formatSlugLabel, getCategoryIntent, makePromptSeoDescription, makePromptSeoTitle } from '@/lib/seo';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { prompts } = getPromptsData();
    return prompts.map((prompt) => ({
        slug: prompt.slug,
    }));
}

function truncatePromptTitle(title: string): string {
    const MAX = 55;
    if (title.length <= MAX) return title;
    const cut = title.lastIndexOf(' ', MAX - 3);
    return cut > 15 ? title.slice(0, cut) + '...' : title.slice(0, MAX - 3) + '...';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { prompts } = getPromptsData();
    const prompt = prompts.find((p) => p.slug === params.slug);

    if (!prompt) {
        return { title: 'Prompt Not Found' };
    }

    const seoTitle = makePromptSeoTitle(truncatePromptTitle(prompt.title), prompt.category);
    const seoDesc = makePromptSeoDescription(prompt.title, prompt.description, prompt.category);
    const catName = prompt.category.replace(/-/g, ' ');
    const keywords = [
        `${prompt.title.toLowerCase()} prompt`,
        `${catName} prompt template`,
        `chatgpt ${catName} prompt`,
        `claude ${catName} prompt`,
        `gemini ${catName} prompt`,
        `${prompt.outputType.toLowerCase()} ai prompt`,
        `${prompt.bestFor.toLowerCase()} ai prompt`,
    ].slice(0, 9);

    return {
        title: seoTitle,
        description: seoDesc,
        keywords,
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `${SITE_URL}/prompts/${prompt.slug}/`,
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
            canonical: `${SITE_URL}/prompts/${prompt.slug}/`,
        },
    };
}

export default function PromptDetailPage({ params }: Props) {
    const { prompts } = getPromptsData();
    const prompt = prompts.find((p) => p.slug === params.slug);

    if (!prompt) {
        notFound();
    }

    const staticContent = promptContentData[prompt.slug] || {
        description: `Use this prompt to generate ${prompt.outputType.toLowerCase()} for ${prompt.bestFor.toLowerCase()} with clearer context, constraints, and output structure.`,
        whatItDoes: [
            `This prompt guides an AI model toward a specific ${prompt.outputType.toLowerCase()} output instead of a broad generic answer.`,
            `It is written for ${prompt.bestFor.toLowerCase()} who need a faster first draft, clearer structure, and fewer follow-up corrections.`,
            'The template works with ChatGPT, Claude, Gemini, and Grok when you replace the bracketed inputs with real details.'
        ],
        whenToUse: [
            `Use it when you need a reliable ${prompt.outputType.toLowerCase()} draft without starting from a blank chat.`,
            `It works best when your goal, audience, tone, examples, and constraints are specific.`,
            'Use the first answer as a draft, then ask the model to refine, shorten, expand, or adapt it for your final channel.'
        ]
    };
    const relatedPrompts = prompts.filter(p => p.category === prompt.category && p.slug !== prompt.slug).slice(0, 4);
    const relatedCategories = getPromptCategories().filter((item) => item.slug !== prompt.category).slice(0, 3);
    const relatedToolCategorySlug = getToolCategorySlugForPromptCategory(prompt.category);
    const categoryLabel = formatSlugLabel(prompt.category);
    const categoryIntent = getCategoryIntent(prompt.category);
    const exampleInput = `Goal: create a ${prompt.outputType.toLowerCase()} for ${prompt.bestFor.toLowerCase()}\nAudience: [describe who will read or use it]\nTone: [clear, practical, persuasive, friendly, formal]\nConstraints: [word count, format, platform, examples, must-include points]`;
    const sampleOutput = prompt.category === 'ipl-2026'
        ? `Sample output:\n- Match context: venue, team form, pitch behavior, toss impact, and likely playing XI changes\n- Key factors: top-order stability, death bowling, spin matchups, and impact-player options\n- Prediction: cautious forecast with confidence level, risk notes, and what could change the result`
        : prompt.category === 'coding'
            ? `Sample output:\n- Problem summary: restate the bug or build goal in plain language\n- Recommended approach: list the safest implementation steps\n- Code or checklist: provide the draft solution with edge cases and testing notes`
            : prompt.category === 'image-generation'
                ? `Sample output:\n- Main subject: clear description of the object, person, scene, or product\n- Style direction: lighting, camera angle, color palette, mood, and composition\n- Negative guidance: what to avoid so the image model stays controlled`
                : prompt.category === 'study' || prompt.category === 'upsc-ssc-prep'
                    ? `Sample output:\n- Concept explanation: simple definition with one example\n- Revision bullets: important facts, traps, and formulas\n- Practice: 5 questions with answers and a short review plan`
                    : `Sample output:\n- Objective: define the goal and audience clearly\n- Draft: produce a structured first version with headings or bullets\n- Refinement checklist: improve clarity, tone, examples, and final formatting`;
    const modelRecommendation = prompt.category === 'coding'
        ? 'Use Claude, ChatGPT, or Gemini with a clear code context and expected output format.'
        : prompt.category === 'image-generation'
            ? 'Use an image model or a chat model that can refine visual direction before sending it to your image generator.'
            : prompt.category === 'study' || prompt.category === 'upsc-ssc-prep'
                ? 'Use ChatGPT, Claude, or Gemini and ask for step-by-step explanation plus self-testing questions.'
                : 'Use ChatGPT, Claude, Gemini, or Grok, then refine the first answer with follow-up instructions.';
    const exampleOutputShape = [
        `A structured ${prompt.outputType.toLowerCase()} tailored to ${prompt.bestFor.toLowerCase()}.`,
        'Clear sections, bullets, or steps that are easy to edit.',
        'A final answer that can be shortened, expanded, reformatted, or adapted for a specific platform.',
    ];
    const promptVariations = [
        `Make the output shorter and more actionable for ${prompt.bestFor.toLowerCase()}.`,
        `Rewrite the answer for a beginner audience and include concrete examples.`,
        `Turn the result into a checklist, table, or step-by-step workflow.`,
    ];
    const commonMistakes = [
        'Running the prompt without replacing placeholders with real context.',
        'Asking for a final answer before defining audience, goal, tone, and constraints.',
        'Publishing the output without checking facts, examples, links, claims, or brand voice.',
    ];
    const promptSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: prompt.title,
        description: prompt.description,
        keywords: [prompt.category, prompt.outputType, prompt.bestFor, 'AI prompt template'],
        text: prompt.promptText,
        url: `${SITE_URL}/prompts/${prompt.slug}/`,
        about: categoryLabel,
        audience: {
            '@type': 'Audience',
            audienceType: prompt.bestFor,
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${SITE_URL}/prompts/` },
            { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${SITE_URL}/prompts/category/${prompt.category}/` },
            { '@type': 'ListItem', position: 4, name: prompt.title, item: `${SITE_URL}/prompts/${prompt.slug}/` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `Who should use this ${categoryLabel} prompt?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `This prompt is best for ${prompt.bestFor.toLowerCase()} who need help with ${categoryIntent.job}.`,
                },
            },
            {
                '@type': 'Question',
                name: 'Which AI models can use this prompt?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can use this prompt with ChatGPT, Claude, Gemini, Grok, and most modern AI chat tools. Replace the placeholders with your own context for better results.',
                },
            },
        ],
    };

    return (
        <article className="max-w-4xl mx-auto px-4 py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(promptSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="bg-surface-card border border-surface-border rounded-3xl p-8 md:p-12 shadow-sm mb-12">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-6">
                        <Link href={`/prompts/category/${prompt.category}/`} className="inline-flex items-center text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                            &larr; Back to {prompt.category.replace('-', ' ')} prompts
                        </Link>
                    </div>
                    <span className="inline-block px-4 py-1.5 bg-primary-100 text-black font-bold text-sm rounded-full tracking-widest uppercase mb-6">
                        {prompt.category.replace('-', ' ')}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                        {prompt.title}
                    </h1>
                    <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto">
                        {staticContent.description}
                    </p>
                </div>

                <div className="prose prose-primary max-w-none">

                    {/* Unique Content: What it Does & When to Use */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-surface-hover border border-surface-border p-8 rounded-2xl">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 border-b pb-2">What This Prompt Does</h3>
                            <div className="text-gray-300 text-base leading-relaxed space-y-4">
                                {staticContent.whatItDoes.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-4 border-b pb-2">When to Use It</h3>
                            <div className="text-gray-300 text-base leading-relaxed space-y-4">
                                {staticContent.whenToUse.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Best For section */}
                    <div className="mb-12 flex items-center justify-center gap-4 bg-primary-50 py-4 px-6 rounded-xl border border-primary-100">
                        <span className="font-bold text-black">Best For:</span>
                        <span className="text-black font-medium">{prompt.bestFor}</span>
                    </div>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Example Input</h2>
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 bg-gray-900 rounded-xl p-4 overflow-x-auto">{exampleInput}</pre>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Example Output</h2>
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 bg-gray-900 rounded-xl p-4 overflow-x-auto">{sampleOutput}</pre>
                        </section>
                    </div>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Useful Variations</h2>
                            <ul className="list-disc pl-6 text-gray-300 space-y-3">
                                {promptVariations.map((variation) => (
                                    <li key={variation}>{variation}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Customization Tips</h2>
                            <ul className="list-disc pl-6 text-gray-300 space-y-3">
                                <li>Add real names, examples, target platform, and desired length before running the prompt.</li>
                                <li>Tell the model what a bad answer looks like so it avoids generic output.</li>
                                <li>Ask for one revision focused only on accuracy, clarity, or conversion depending on your goal.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-foreground mb-3">Best Model to Use</h2>
                            <p className="text-gray-300">{modelRecommendation}</p>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-foreground mb-3">Expected Output</h2>
                            <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                {exampleOutputShape.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="bg-surface-hover border border-surface-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-foreground mb-3">Common Mistakes</h2>
                            <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                {commonMistakes.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* The Prompt Box */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-foreground">The Prompt</h2>
                            <span className="text-sm font-semibold text-gray-500 bg-surface-border px-3 py-1 rounded">Copy-Paste Ready</span>
                        </div>
                        <div className="relative group">
                            <div className="bg-gray-900 text-gray-100 p-6 md:p-8 rounded-2xl shadow-inner font-mono text-base md:text-lg leading-loose whitespace-pre-wrap">
                                {prompt.promptText}
                            </div>
                            {/* Static copy block placeholder since no client React code allowed in static export unless 'use client' is added. 
                                It's best to keep this entirely static as requested or just styling a pseudo-button for visual */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-sm"
                                    title="Highlight text and press Ctrl+C to copy"
                                >
                                    Copy Prompt Box Text
                                </button>
                            </div>
                        </div>
                    </div>

                    <AdSlot adSlot="1000000005" format="horizontal" />

                    <section className="mb-12 rounded-2xl border border-surface-border bg-surface-hover p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">How to Get Better Results</h2>
                        <ul className="list-disc pl-6 text-gray-300 space-y-3">
                            <li>Replace generic placeholders with real audience, goal, product, topic, tone, and constraints.</li>
                            <li>Ask the model to create one draft first, then request revisions for clarity, length, examples, or formatting.</li>
                            <li>For important work, verify facts and adapt the final output to your own voice before publishing.</li>
                            <li>For {categoryLabel.toLowerCase()} workflows, compare the output against your actual task instead of judging only the first response.</li>
                        </ul>
                    </section>

                    <div className="mb-10 p-6 bg-surface-hover border border-surface-border rounded-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-3">Related AI Resources</h2>
                        <p className="text-gray-300 mb-4">
                            Pair this prompt with supporting pages across the site to get better output and compare alternatives.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
                            <Link href={`/prompts/category/${prompt.category}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                More {prompt.category.replace('-', ' ')} prompts &rarr;
                            </Link>
                            <Link href="/ai-tools/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Browse AI tools directory &rarr;
                            </Link>
                            {relatedToolCategorySlug ? (
                                <Link href={`/category/${relatedToolCategorySlug}/`} className="text-primary-400 hover:text-primary-300 font-semibold">
                                    Explore {prompt.category.replace('-', ' ')} tools &rarr;
                                </Link>
                            ) : (
                                <Link href="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                    Read AI workflow guides &rarr;
                                </Link>
                            )}
                            <Link href="/models/" className="text-primary-400 hover:text-primary-300 font-semibold">
                                Compare AI models &rarr;
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Prompts */}
            <div className="mt-16 pt-10 border-t border-surface-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Prompts in {prompt.category.replace('-', ' ')}</h2>
                {relatedPrompts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedPrompts.map(related => (
                            <Link key={related.id} href={`/prompts/${related.slug}/`} className="saas-card p-5 group flex flex-col h-full hover:border-primary-300">
                                <h3 className="font-bold text-foreground group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">{related.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 text-ellipsis block overflow-hidden mb-4">{related.description}</p>
                                <span className="text-sm font-semibold text-primary-600 mt-auto flex-shrink-0">View Prompt &rarr;</span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No related prompts found in this category.</p>
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Explore More Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedCategories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/prompts/category/${category.slug}/`}
                            className="rounded-2xl border border-surface-border bg-surface-card p-5 text-gray-300 hover:text-primary-300 hover:border-primary-500/40 transition-colors"
                        >
                            {category.name} ({category.promptCount})
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
}

