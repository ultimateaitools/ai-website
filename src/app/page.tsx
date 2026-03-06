import React from 'react';
import { Metadata } from 'next';
import { getSegments, getBlogsData, getData, Blog } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Ultimate AI Tools Directory 2026 - Free + Paid AI Tools, Prompts and Guides',
  description: 'Discover the best AI tools for writing, coding, design, productivity, automation and research. Browse free and paid AI tools, prompt library, model comparisons and practical guides.',
  keywords: [
    'ai tools directory',
    'best ai tools 2026',
    'free ai tools',
    'ai prompts',
    'ai tools for developers',
    'ai tools for students',
    'ai productivity tools',
  ],
  openGraph: {
    title: 'Ultimate AI Tools Directory 2026 - Free + Paid AI Tools',
    description: 'Browse top AI tools, prompt templates, model comparisons and actionable AI guides in one place.',
    url: 'https://ultimateaitools.online',
    siteName: 'UltimateAITools',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate AI Tools Directory 2026',
    description: 'Find the best AI tools, prompts, and AI guides for real workflows.',
  },
  alternates: {
    canonical: 'https://ultimateaitools.online',
  },
};

export default function Home() {
  const segments = getSegments();
  const { blogs } = getBlogsData();
  const { tools } = getData();
  const latestTool = [...tools].sort((a, b) => Number(b.id) - Number(a.id))[0];
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UltimateAITools',
    url: 'https://ultimateaitools.online',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ultimateaitools.online/ai-tools?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="flex flex-col items-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      {/* Premium Minimal Hero Section */}
      <section className="relative w-full bg-background pt-10 pb-20 md:pt-14 md:pb-28 flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-surface-border">

        {/* Subtle Background Glows instead of grid */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* Elegant Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card/60 backdrop-blur-md border border-surface-border text-gray-200 text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-semibold text-foreground">100+</span> Free Tools Added This Week
          </div>

          {/* Clean Typography Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 max-w-5xl text-foreground leading-[1.1]">
            The Best AI Tools.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-accent-blue">Always Free.</span>
          </h1>

          {/* Minimal Subtitle */}
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 font-medium leading-relaxed">
            Stop paying for AI. Discover the ultimate directory of free tools for coding, writing, design, and research.
          </p>

          {/* Premium Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4">
            <Link href="/ai-tools" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary-600 rounded-full hover:bg-primary-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Browse Directory
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="/prompts" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-bold text-foreground transition-all duration-200 bg-surface-card border border-surface-border rounded-full hover:bg-surface-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-border">
              Get Free Prompts
            </Link>
          </div>
          {/* Intelligent Search Input */}
          <HeroSearch />
        </div>
      </section>

      {/* Infinite Marquee of AI Logos / Names */}
      <section className="w-full bg-surface-hover border-b border-surface-border py-6 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center justify-center text-xl font-black text-gray-500/50 uppercase tracking-widest">
              <span>ChatGPT</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Midjourney V6</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>AutoGPT</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Claude 3 Opus</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Figma AI</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Canva Magic Studio</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Sora</span>
              <span className="w-2 h-2 rounded-full bg-primary-500/50"></span>
              <span>Cursor AI</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Segment Grid (with SVG Icons) */}
      <section id="segments" className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore over 30 categories of handpicked artificial intelligence software for every use case.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {segments.map(segment => (
            <Link key={segment.slug} href={segment.slug === 'directory' ? '/ai-tools' : segment.slug === 'prompt-library' ? '/prompts' : segment.slug === 'blog' ? '/blog' : segment.slug === 'models-comparison' ? '/models' : segment.slug === 'news' ? '/blog' : `/category/${segment.slug}`} className="block group h-full">
              <div className="saas-card p-6 h-full flex flex-col items-start relative overflow-hidden transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">

                {/* Watermark Category SVG */}
                <div
                  className="absolute -bottom-3 -right-3 text-white/[0.04] group-hover:text-primary-500/[0.12] transition-all select-none z-0 pointer-events-none transform group-hover:scale-110 duration-500 [&_svg]:w-28 [&_svg]:h-28 [&_svg]:stroke-[1.25] [&_svg]:opacity-100"
                  dangerouslySetInnerHTML={{
                    __html:
                      segment.icon ||
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
                  }}
                />

                <div className="relative z-10 flex flex-col h-full w-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-900/30 text-primary-400 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: segment.icon || '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' }}
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-400 transition-colors tracking-tight line-clamp-1">{segment.name}</h3>
                  <p className="text-sm text-gray-400 flex-grow leading-relaxed line-clamp-2">{segment.description}</p>

                  <div className="mt-6 flex items-center text-sm font-semibold text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Latest AI Tools</h2>
            <p className="text-gray-400">Recently added AI tools you can explore right now.</p>
          </div>
          <Link href="/ai-tools" className="text-primary-400 hover:text-primary-300 font-semibold w-fit">View All Tools &rarr;</Link>
        </div>

        {latestTool && (
          <Link href={`/tools/${latestTool.slug}`} className="saas-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-primary-900/30 text-primary-400 flex items-center justify-center font-bold text-2xl shrink-0">
              {latestTool.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary-400 transition-colors">
                  {latestTool.name}
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-primary-900/50 text-primary-300 px-2 py-1 rounded-full border border-primary-800/50">
                  {latestTool.freeTier}
                </span>
              </div>
              <p className="text-xs text-primary-400 uppercase tracking-wide font-semibold mb-3">{latestTool.category.replace('-', ' ')}</p>
              <p className="text-gray-400 mb-4">{latestTool.description}</p>
              <span className="text-sm font-semibold text-primary-400">View Details &rarr;</span>
            </div>
          </Link>
        )}
      </section>

      {/* Submit Tool Section */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <AdSlot adSlot="1000000010" format="horizontal" />
      </div>

      <section className="w-full bg-surface-card/50 py-20 border-y border-surface-border text-center px-4">
        <h2 className="text-3xl font-bold text-foreground mb-4">Are you working on an AI product?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Submit your artificial intelligence tool to be featured on our directory and reach thousands of users looking for solutions like yours.</p>
        <Link
          href="/submit-tool"
          className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-colors text-lg shadow-sm inline-block"
        >
          Submit Your Tool
        </Link>
      </section>

      {/* Blog Preview Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Latest Insights</h2>
            <p className="text-gray-400">Guides, tutorials, and news from the AI frontier.</p>
          </div>
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-semibold hidden sm:block">View All Posts &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog: Blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="saas-card overflow-hidden group border-0 shadow-md flex flex-col h-full hover:-translate-y-1 transition-transform">
              <div className="h-48 bg-surface-hover w-full overflow-hidden relative border-b border-surface-border">
                {blog.imageUrl ? (
                  <Image
                    src={blog.imageUrl}
                    alt={blog.imageAlt || blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-blue/10 group-hover:scale-105 transition-transform duration-500"></div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2 block">{blog.category.replace('-', ' ')}</span>
                <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{blog.shortDescription}</p>
                <span className="text-sm font-medium text-primary-400 mt-auto">Read Article &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

