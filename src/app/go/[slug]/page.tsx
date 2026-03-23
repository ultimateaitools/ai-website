import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    return Object.keys(externalUrls).map((slug) => ({ slug }));
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Redirecting...',
        robots: {
            index: false,
            follow: false,
        },
    };
}

const externalUrls: Record<string, string> = {
    "chatgpt": "https://chat.openai.com",
    "perplexity": "https://www.perplexity.ai",
    "claude": "https://claude.ai",
    "gemini": "https://gemini.google.com",
    "midjourney": "https://www.midjourney.com",
    "leonardo-ai": "https://leonardo.ai",
    "runway": "https://runwayml.com",
    "pictory": "https://pictory.ai",
    "synthesia": "https://www.synthesia.io",
    "descript": "https://www.descript.com",
    "elevenlabs": "https://elevenlabs.io",
    "murf-ai": "https://murf.ai",
    "notion-ai": "https://www.notion.so/product/ai",
    "copy-ai": "https://www.copy.ai",
    "jasper": "https://www.jasper.ai",
    "writesonic": "https://writesonic.com",
    "grammarly": "https://www.grammarly.com",
    "quillbot": "https://quillbot.com",
    "tome-ai": "https://tome.app",
    "gamma": "https://gamma.app",
    "durable-ai": "https://durable.co",
    "replit-ghostwriter": "https://replit.com/site/ghostwriter",
    "github-copilot": "https://github.com/features/copilot",
    "codeium": "https://codeium.com",
    "blackbox-ai": "https://www.blackbox.ai",
    "phind": "https://www.phind.com",
    "zapier-ai": "https://zapier.com/ai",
    "make-ai": "https://www.make.com",
    "bardeen": "https://www.bardeen.ai",
    "taskade-ai": "https://www.taskade.com"
};

export default function GoRedirectPage({ params }: Props) {
    const url = externalUrls[params.slug];

    if (url) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <script
                    // Use a plain script tag so static export works without Next's redirect() helper.
                    dangerouslySetInnerHTML={{
                        __html: `window.location.replace(${JSON.stringify(url)});`,
                    }}
                />
                <h1 className="text-2xl font-bold text-foreground mb-3">Redirecting…</h1>
                <p className="text-gray-400 mb-6">If you are not redirected automatically, use the link below.</p>
                <a
                    href={url}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                    Continue to the tool site
                </a>
                <noscript>
                    <p className="text-gray-400 mt-4">JavaScript is required to auto‑redirect.</p>
                </noscript>
            </div>
        );
    }

    notFound();
}
