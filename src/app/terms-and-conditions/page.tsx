import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and Conditions – UltimateAITools',
    description: 'Read the Terms and Conditions of UltimateAITools.online before using our platform.',
    alternates: {
        canonical: 'https://ultimateaitools.online/terms-and-conditions',
    }
};

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-12 text-center border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                        Terms and Conditions
                    </h1>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By using UltimateAITools.online, users agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Website</h2>
                        <p>
                            Users must not misuse or copy content from UltimateAITools.online. Our directory, blog posts, AI prompts, and comparisons are provided for informational and educational purposes only. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. Intellectual Property</h2>
                        <p>
                            All content, including text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of UltimateAITools or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. External Links</h2>
                        <p>
                            Our platform contains links to external websites and AI tools. We are not responsible for third-party content, privacy policies, or practices. We encourage our users to be aware when they leave our site and to read the terms and conditions of any other site that collects personally identifiable information.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Affiliate Disclosure</h2>
                        <p>
                            To help support the platform, some links may be affiliate links. We may earn a commission, at no extra cost to you, if you click through and make a purchase or sign up for a service.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                        <p>
                            We are not liable for any loss or damage resulting from your use of UltimateAITools.online. The information and tools are provided &quot;as is&quot; without any warranties, express or implied.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to Terms</h2>
                        <p>
                            We may update these terms at any time without prior notice. By continuing to use the site after new terms have been posted, you acknowledge and agree to the modified Terms and Conditions.
                        </p>
                    </section>

                    <section className="mt-16 pt-10 border-t border-surface-border">
                        <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
                        <p>
                            For questions regarding these Terms, contact:
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
