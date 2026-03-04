import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy – UltimateAITools',
    description: 'Read the Privacy Policy of UltimateAITools.online to understand how we collect, use and protect your personal information.',
    alternates: {
        canonical: 'https://ultimateaitools.online/privacy-policy',
    }
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-surface-card min-h-screen py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-12 text-center border-b border-surface-border pb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                </header>

                <main className="prose prose-invert prose-lg prose-primary max-w-none text-gray-300 leading-relaxed font-sans">

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                        <p>
                            UltimateAITools.online respects user privacy and is committed to protecting personal information. This Privacy Policy outlines how we manage and safeguard your data when you visit our AI tools directory, blog, and prompt library platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Information:</strong> We may collect personal information only if voluntarily submitted via our forms (e.g., when you submit a tool or contact us).</li>
                            <li><strong>Non-Personal Information:</strong> We automatically collect standard, non-identifiable technical data about your visit.</li>
                            <li><strong>Cookies:</strong> Small data files stored on your device that help us track user sessions.</li>
                            <li><strong>Usage Data:</strong> We monitor overall traffic patterns and interactions to understand how visitors use our platform.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Information</h2>
                        <p>The collected information is used in the following ways:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To <strong>improve the website experience</strong> and optimize platform performance.</li>
                            <li>To <strong>analyze traffic</strong> and better understand our audience&apos;s needs.</li>
                            <li>To <strong>respond to inquiries</strong> or customer support requests.</li>
                            <li>To <strong>display relevant advertisements</strong>.</li>
                        </ul>
                    </section>

                    <section className="mb-10 p-6 bg-surface-hover rounded-2xl border border-surface-border">
                        <h2 className="text-2xl font-bold text-foreground mb-4 mt-0">4. Google AdSense</h2>
                        <p className="text-gray-300">
                            We use Google AdSense to display ads on UltimateAITools.online. Google, as a third-party vendor, uses cookies such as the DoubleClick cookie to serve ads based on a user&apos;s prior visits to our website or other websites across the Internet.
                        </p>
                        <p className="mt-4 text-gray-300">
                            Users may opt out of personalized advertising by visiting:
                        </p>
                        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary-500 font-bold hover:underline break-all mt-2 inline-block">
                            https://policies.google.com/technologies/ads
                        </a>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Affiliate Disclosure</h2>
                        <p>
                            To support the curation of our directory, some links present on UltimateAITools.online may be affiliate links. We may earn a commission from these partnerships at no extra cost to you.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">6. Third Party Privacy Policies</h2>
                        <p>
                            Our platform contains links to external AI tools and applications. We are not responsible for the content or privacy practices of these third-party websites linked from our platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies Policy</h2>
                        <p>
                            Cookies are used to store user preferences and optimize the overall browsing experience. You can choose to disable cookies through your browser options.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">8. Children&apos;s Information</h2>
                        <p>
                            We do not knowingly collect personal information from children under 13. If you believe your child has provided such information on our website, please contact us so we can promptly remove it.
                        </p>
                    </section>

                    <section className="mb-10 bg-surface-hover p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-2 mt-0">9. Consent</h2>
                        <p className="mb-0 text-gray-300">
                            By using our website, you consent to this Privacy Policy and agree to its terms.
                        </p>
                    </section>

                    <section className="mt-16 pt-10 border-t border-surface-border">
                        <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
                        <p>
                            If you have any questions regarding this Privacy Policy, please contact us at:
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
