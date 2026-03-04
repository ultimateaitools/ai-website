import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - UltimateAITools',
    description: 'Contact UltimateAITools.online for AI tool listing inquiries, suggestions or general support.',
    openGraph: {
        title: 'Contact Us - UltimateAITools',
        description: 'Get in touch with UltimateAITools for support, listing requests, and feedback.',
        url: 'https://ultimateaitools.online/contact-us',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Contact UltimateAITools',
        description: 'Support and listing inquiry contact page.',
    },
    alternates: {
        canonical: 'https://ultimateaitools.online/contact-us',
    }
};

export default function ContactUsPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-12 text-center border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                        Contact Us
                    </h1>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans text-center">

                    <section className="mb-12">
                        <p className="text-xl">
                            If you have any questions, suggestions, or would like to submit your AI tool to our directory, feel free to reach out to us via email.
                        </p>
                    </section>

                    <section className="bg-surface-hover p-10 rounded-3xl border border-surface-border inline-block w-full max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-6 mt-0">Get in Touch</h2>
                        <p className="mb-8">
                            You can contact us directly at the email address below for tool listing inquiries, feedback or general support.
                        </p>

                        <div className="bg-surface-card py-6 px-8 rounded-2xl shadow-sm border border-surface-border inline-flex items-center justify-center w-full sm:w-auto">
                            <svg className="w-8 h-8 text-primary-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a
                                href="mailto:ultimateaitools50@gmail.com"
                                className="text-xl sm:text-2xl font-bold text-primary-500 hover:text-primary-400 transition-colors break-all"
                            >
                                ultimateaitools50@gmail.com
                            </a>
                        </div>

                        <p className="text-sm text-gray-500 mt-8 mb-0 font-medium">
                            Note: We typically respond to all inquiries within 48-72 hours.
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
