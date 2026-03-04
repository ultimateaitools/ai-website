import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { getData } from '@/lib/data';

type Props = {
    params: { slug: string };
};

export function generateStaticParams() {
    const { tools } = getData();
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
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
        redirect(url);
    } else {
        notFound();
    }
}
