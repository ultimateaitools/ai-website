"use client";

import React, { useState, useEffect } from 'react';

const PLACEHOLDERS = [
    "Video generator for YouTube...",
    "Code assistant for Python...",
    "Free alternative to Midjourney...",
    "SEO articles writer...",
    "Resume builder for freshers..."
];

export default function HeroSearch() {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [textFirstLength, setTextFirstLength] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [query, setQuery] = useState("");

    // Auto-typing effect
    useEffect(() => {
        const currentPlaceholder = PLACEHOLDERS[placeholderIndex];
        const typingSpeed = isDeleting ? 40 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && textFirstLength === currentPlaceholder.length) {
                // Pause at full text
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && textFirstLength === 0) {
                // Move to next string
                setIsDeleting(false);
                setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
            } else {
                setTextFirstLength(prev => prev + (isDeleting ? -1 : 1));
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [textFirstLength, isDeleting, placeholderIndex]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Search feature is coming soon.");
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative group mt-10 md:mt-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-blue rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <form onSubmit={handleSubmit} className="relative flex items-center w-full h-16 rounded-full bg-surface-card border-2 border-surface-border overflow-hidden focus-within:border-primary-500/50 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all shadow-lg">
                <div className="pl-6 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {/* Simulated Placeholder Text */}
                {!query && (
                    <div className="absolute left-[3.25rem] pointer-events-none text-gray-500 text-lg flex items-center h-full">
                        {PLACEHOLDERS[placeholderIndex].substring(0, textFirstLength)}
                        <span className="w-[2px] h-6 bg-primary-500 ml-1 animate-pulse"></span>
                    </div>
                )}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-full pl-3 pr-24 bg-transparent outline-none text-foreground text-lg placeholder-transparent"
                    placeholder="Search tools..."
                />

                {/* Minimal generate button style */}
                <button type="submit" className="absolute right-2 px-6 h-12 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-colors flex items-center justify-center">
                    <span className="hidden sm:block">Search</span>
                    <svg className="sm:hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
