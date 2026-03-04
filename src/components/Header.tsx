"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-soft border-b border-surface-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logos/ultimate-ai-tools-logo.png"
                                alt="UltimateAITools Logo"
                                width={240}
                                height={60}
                                className="object-contain h-14 w-auto brightness-0 invert"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link href="/ai-tools" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">AI Tools</Link>
                        <Link href="/blog" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Blog</Link>
                        <Link href="/about" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">About</Link>
                        <Link href="/contact-us" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Contact</Link>
                        <Link
                            href="/submit-tool"
                            className="bg-primary-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-primary-500 transition-colors shadow-sm"
                        >
                            Submit Tool
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface-card border-t border-surface-border">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/ai-tools" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-surface-hover">AI Tools</Link>
                        <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-surface-hover">Blog</Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-surface-hover">About</Link>
                        <Link href="/contact-us" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-surface-hover">Contact</Link>
                        <Link
                            href="/submit-tool"
                            className="block px-3 py-2 text-primary-400 font-bold hover:bg-surface-hover rounded-md"
                        >
                            Submit Tool
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
