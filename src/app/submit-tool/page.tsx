import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Submit Your AI Tool – Get Listed on UltimateAITools',
    description: 'Submit your AI tool to UltimateAITools.online and get discovered by thousands of users worldwide. Free AI tools listing directory for 2026.',
    alternates: {
        canonical: 'https://ultimateaitools.online/submit-tool',
    }
};

export default function SubmitToolPage() {
    return (
        <div className="bg-surface-card min-h-screen">
            {/* Header / Intro Section */}
            <header className="bg-surface-hover py-16 sm:py-24 border-b border-surface-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                        Submit Your AI Tool to UltimateAITools
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-200 mb-6">
                        List Your AI Tool for Free
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium mb-10 max-w-3xl mx-auto">
                        Are you building an AI tool? Submit it to UltimateAITools and reach a global audience of developers, students and professionals looking for the best AI solutions in 2026.
                    </p>
                    <a
                        href="#submission-form"
                        className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg text-lg"
                    >
                        Submit Tool Now
                    </a>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Form Info & Benefits */}
                    <div className="lg:col-span-1 space-y-12">

                        <section className="bg-surface-hover p-8 rounded-2xl border border-surface-border">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Why Submit Your Tool?</h3>
                            <ul className="space-y-4 text-gray-300 font-medium">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Free promotion</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Increased visibility</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>SEO backlinks</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Reach global audience</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Get early adopters</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-surface-hover p-8 rounded-2xl border border-surface-border">
                            <h3 className="text-2xl font-bold text-foreground mb-4">What Happens Next?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Our team reviews each submission before listing it in our directory. Once approved, your tool will be featured on UltimateAITools and accessible to thousands of monthly visitors.
                            </p>
                        </section>

                        <section className="bg-surface-hover p-8 rounded-2xl border border-surface-border">
                            <h3 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">Q1: Is submission free?</h4>
                                    <p className="text-gray-400">A: Yes, submitting your AI tool is completely free.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">Q2: How long does approval take?</h4>
                                    <p className="text-gray-400">A: Typically within 48–72 hours.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">Q3: Can I submit affiliate links?</h4>
                                    <p className="text-gray-400">A: Yes, affiliate links are allowed.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Email Submission Instructions */}
                    <div className="lg:col-span-2" id="submission-form">
                        <div className="bg-surface-card p-10 rounded-3xl shadow-sm border border-surface-border w-full flex flex-col items-center flex-grow">
                            <div className="w-16 h-16 bg-primary-900/40 rounded-2xl flex items-center justify-center mb-6 text-primary-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-extrabold text-foreground mb-4 text-center">Submit via Email</h3>
                            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto text-center">
                                To ensure high quality, we currently process all submissions manually. Please send us an email with your tool&apos;s details.
                            </p>

                            <div className="w-full text-left bg-surface-hover border border-surface-border rounded-xl p-8 mb-8 max-w-2xl">
                                <h4 className="font-bold text-gray-200 mb-4 border-b border-surface-border pb-2">Required Email Format</h4>
                                <div className="space-y-4 font-mono text-sm text-gray-400">
                                    <p><strong className="text-primary-400 font-sans">To:</strong> <a href="mailto:ultimateaitools50@gmail.com" className="text-gray-200 hover:underline">ultimateaitools50@gmail.com</a></p>
                                    <p><strong className="text-primary-400 font-sans">Subject:</strong> Tool Submission: [Your Tool Name]</p>
                                    <div className="mt-4 pt-4 border-t border-surface-border">
                                        <p className="mb-2"><strong className="text-primary-400 font-sans">Message Body:</strong></p>
                                        <ul className="space-y-2 ml-2 list-none">
                                            <li><span className="text-gray-500 mr-2">1.</span> Tool Name:</li>
                                            <li><span className="text-gray-500 mr-2">2.</span> Website URL:</li>
                                            <li><span className="text-gray-500 mr-2">3.</span> Short Description (1-2 sentences):</li>
                                            <li><span className="text-gray-500 mr-2">4.</span> Pricing Model (Free, Freemium, Open Source):</li>
                                            <li><span className="text-gray-500 mr-2">5.</span> Main Categories (e.g., Coding, Writing):</li>
                                            <li><span className="text-gray-500 mr-2">6.</span> Logo URL (Optional):</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="mailto:ultimateaitools50@gmail.com?subject=Tool%20Submission:%20[Your%20Tool%20Name]&body=1.%20Tool%20Name:%0A2.%20Website%20URL:%0A3.%20Short%20Description:%0A4.%20Pricing%20Model%20(Free,%20Freemium,%20Open%20Source):%0A5.%20Main%20Categories:%0A6.%20Logo%20URL%20(Optional):%0A"
                                className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg text-lg w-full sm:w-auto hover:-translate-y-1 transform duration-200"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Click Here to Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
