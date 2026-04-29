import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-background border-t border-surface-border pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: About */}
                    <div>
                        <Link href="/" className="inline-flex items-center mb-4">
                            <Image
                                src="/logos/ultimate-ai-tools-logo.png"
                                alt="UltimateAITools Logo"
                                width={220}
                                height={56}
                                className="object-contain h-10 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            Discover the best free AI tools for productivity, coding, writing, automation, design and research. Carefully curated and 100% free to explore.
                        </p>
                    </div>

                    {/* Column 2: Legal Pages */}
                    <div>
                        <h3 className="text-base font-bold text-foreground mb-4 uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/privacy-policy/" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions/" className="text-gray-400 hover:text-primary-400 transition-colors">Terms and Conditions</Link></li>
                            <li><Link href="/disclaimer/" className="text-gray-400 hover:text-primary-400 transition-colors">Disclaimer</Link></li>
                            <li><Link href="/about/" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact-us/" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/sitemap/" className="text-gray-400 hover:text-primary-400 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Categories Links & Newsletter */}
                    <div>
                        <h3 className="text-base font-bold text-foreground mb-4 uppercase tracking-wider">Popular Categories</h3>
                        <ul className="space-y-3 text-sm mb-6">
                            <li><Link href="/category/writing-tools/" className="text-gray-400 hover:text-primary-400 transition-colors">AI Writing Tools</Link></li>
                            <li><Link href="/category/image-generators/" className="text-gray-400 hover:text-primary-400 transition-colors">AI Image Generators</Link></li>
                            <li><Link href="/category/coding/" className="text-gray-400 hover:text-primary-400 transition-colors">AI Coding Assistants</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-surface-border text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} UltimateAITools.online. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
