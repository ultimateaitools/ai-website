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
        'best free ai tools 2026',
        'ai tools review process',
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
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-12 text-center border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                        About UltimateAITools
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Your trusted directory for discovering the best free AI tools, prompts, and educational resources in 2026.
                    </p>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans space-y-10">

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Who We Are</h2>
                        <p>
                            UltimateAITools is an independent AI tools directory built for everyday users, students, developers, freelancers, and business owners who want to harness the power of artificial intelligence without spending a fortune. We were founded with a singular purpose: to cut through the noise of the rapidly growing AI landscape and surface only the tools that truly deliver value.
                        </p>
                        <p>
                            The AI space moves fast. New tools launch every week, pricing changes overnight, and marketing claims often overshadow actual utility. UltimateAITools exists to give users a reliable, up-to-date reference that they can trust — a place where every listing has been reviewed for real-world usefulness, not just hype.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                        <p>
                            Our mission is simple: <strong className="text-foreground">make AI accessible to everyone</strong>. We believe that powerful AI capabilities should not be locked behind expensive subscriptions. That is why our entire directory focuses on free-tier tools — tools that you can start using today, at zero cost.
                        </p>
                        <p>
                            We cover over 270 AI tools across categories like writing, coding, image generation, video production, productivity, marketing, study, and automation. Alongside the directory, we maintain a library of over 440 ready-to-use AI prompts and publish in-depth blog articles that help users get the most out of modern AI platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">How We Review and Curate Tools</h2>
                        <p>
                            Every tool in our directory goes through a structured evaluation before it is listed. We test each tool hands-on and assess it across four core criteria:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li><strong className="text-foreground">Free Tier Generosity:</strong> Does the free plan offer genuine value, or is it just a locked preview?</li>
                            <li><strong className="text-foreground">Ease of Use:</strong> Can a non-technical user get meaningful results within minutes?</li>
                            <li><strong className="text-foreground">Output Quality:</strong> Does the tool actually produce results that save time or improve work quality?</li>
                            <li><strong className="text-foreground">Reliability and Trust:</strong> Is the company behind the tool credible? Is user data handled responsibly?</li>
                        </ul>
                        <p>
                            We do not accept payment for tool listings. Every tool is evaluated independently. If a tool does not meet our standards, it does not get listed — regardless of how much marketing budget the company has.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">What You Will Find on UltimateAITools</h2>
                        <p>
                            The platform is organised into four main sections to serve different user needs:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li><strong className="text-foreground">AI Tools Directory:</strong> Browse and filter 270+ tools by category, use case, or free tier availability.</li>
                            <li><strong className="text-foreground">Prompt Library:</strong> Access 440+ tested prompts for ChatGPT, Claude, Gemini, Midjourney, and other platforms — organised by category including business, coding, marketing, study, and more.</li>
                            <li><strong className="text-foreground">AI Models Comparison:</strong> Side-by-side comparisons of leading AI models to help you choose the right one for your task.</li>
                            <li><strong className="text-foreground">Blog:</strong> Practical, no-fluff articles covering AI tool tutorials, comparisons, workflow guides, and industry trends — updated regularly.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Our Editorial Standards</h2>
                        <p>
                            Every blog article published on UltimateAITools is written with accuracy and reader utility as the top priorities. We do not publish AI-generated articles without human review and editing. Our writers verify claims, test tools personally, and update articles when tools change their features or pricing.
                        </p>
                        <p>
                            We strive to keep information current. The AI industry evolves rapidly, and outdated advice can lead users to make wrong decisions. Each article carries a publish or update date so readers always know how fresh the information is.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Submit Your AI Tool</h2>
                        <p>
                            Are you building an AI tool and want to get listed on UltimateAITools? We welcome submissions from developers and companies. All submissions go through the same review process as the rest of our directory. If your tool has a genuine free tier and delivers real value to users, we would love to evaluate it.
                        </p>
                        <p>
                            Visit our <a href="/submit-tool/" className="text-primary-400 hover:text-primary-300 underline">Submit a Tool</a> page to get started, or reach out to us directly via our <a href="/contact-us/" className="text-primary-400 hover:text-primary-300 underline">Contact page</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Contact and Feedback</h2>
                        <p>
                            We are always looking to improve. If you find outdated information, a broken link, a tool that should be listed, or simply want to share feedback, we want to hear from you. Our team reviews every message and uses reader feedback to prioritise updates and new content.
                        </p>
                        <p>
                            You can reach us at <a href="mailto:ultimateaitools50@gmail.com" className="text-primary-400 hover:text-primary-300 underline">ultimateaitools50@gmail.com</a>. We typically respond within 48 to 72 hours.
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
