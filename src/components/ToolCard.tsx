import React from 'react';
import { Tool } from '@/lib/data';
import Link from 'next/link';

interface Props {
    tool: Tool;
}

export default function ToolCard({ tool }: Props) {
    // SoftwareApplication schema
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "applicationCategory": tool.category,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": tool.description,
        "url": tool.websiteURL
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <div className="saas-card p-6 flex flex-col h-full group relative overflow-hidden transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
                {/* Watermark First Letter */}
                <div className="absolute -bottom-6 -right-2 text-[140px] leading-none font-black text-white/[0.02] group-hover:text-primary-500/[0.05] transition-all select-none z-0 pointer-events-none transform group-hover:scale-110 duration-500">
                    {tool.name.charAt(0).toUpperCase()}
                </div>

                <div className="relative z-10 flex flex-col h-full w-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-900/30 rounded-xl flex items-center justify-center p-2 relative text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <span className="font-bold text-xl">{tool.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider bg-primary-900/50 text-primary-300 px-2 py-1 rounded-full border border-primary-800/50 shadow-sm">
                            {tool.freeTier}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary-400 transition-colors tracking-tight line-clamp-1">{tool.name}</h3>
                    <span className="text-xs text-primary-400 mb-3 block uppercase tracking-wide font-semibold">{tool.category.replace('-', ' ')}</span>
                    <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed line-clamp-3">{tool.description}</p>

                    <div className="mt-auto space-y-2 relative z-20">
                        <Link
                            href={`/tools/${tool.slug}`}
                            className="block w-full text-center py-2.5 rounded-lg bg-surface-hover text-foreground hover:bg-surface-border border border-surface-border transition-colors font-semibold text-sm"
                        >
                            View Details
                        </Link>
                        <a
                            href={tool.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 border border-transparent transition-all font-bold text-sm"
                        >
                            Visit Tool
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
