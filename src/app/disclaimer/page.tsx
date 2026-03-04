import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer – UltimateAITools',
    description: 'Read the Disclaimer of UltimateAITools.online to understand limitations of liability and affiliate disclosures.',
    alternates: {
        canonical: 'https://ultimateaitools.online/disclaimer',
    }
};

export default function DisclaimerPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-12 text-center border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                        Disclaimer
                    </h1>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. General Information</h2>
                        <p>
                            All content provided on UltimateAITools.online is for informational and educational purposes only. We strive to provide accurate information about artificial intelligence tools, software, and services, but the technology landscape changes rapidly.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. No Professional Advice</h2>
                        <p>
                            The information contained on this website is not intended as, and shall not be understood or construed as, professional, legal, or financial advice. We do not provide legal or financial advice. Always consult with a qualified professional before making any significant business or technical decisions based on the content found on our platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. External Links Disclaimer</h2>
                        <p>
                            UltimateAITools.online may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We are not responsible for third-party content.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Affiliate Disclaimer</h2>
                        <p>
                            The site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. We may earn commission through affiliate links. This compensation may impact how and where products appear on this site, but we always endeavor to provide honest and unbiased reviews and directories.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Information</h2>
                        <p>
                            While we attempt to ensure that the information on UltimateAITools.online is correct and up to date, we do not guarantee its completeness or its absolute accuracy. We make no representations, warranties, or assurances as to the exact validity of the content contained on this website or any sites linked to or from this site.
                        </p>
                    </section>

                    <section className="mb-10 bg-surface-hover p-6 rounded-2xl border border-surface-border">
                        <h2 className="text-2xl font-bold text-foreground mb-2 mt-0">6. Consent</h2>
                        <p className="mb-0 text-gray-300">
                            By using our website, you hereby consent to our disclaimer and agree to its terms. Using our website means you agree to this Disclaimer.
                        </p>
                    </section>

                    <section className="mt-16 pt-10 border-t border-surface-border">
                        <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Information</h2>
                        <p>
                            For any questions regarding this Disclaimer, contact us at:
                        </p>
                        <p className="mt-4 font-medium text-gray-300">
                            Email:{' '}
                            <a href="mailto:ultimateaitools50@gmail.com" className="text-primary-500 hover:text-primary-400 hover:underline transition-colors">
                                ultimateaitools50@gmail.com
                            </a>
                        </p>
                    </section>

                </main>
            </div>
        </div>
    );
}
