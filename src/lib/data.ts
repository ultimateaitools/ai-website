import fs from 'fs';
import path from 'path';

export interface Segment {
    name: string;
    slug: string;
    description: string;
    icon: string;
}

export interface Tool {
    id: string;
    name: string;
    slug: string;
    category: string;
    freeTier: string;
    description: string;
    websiteURL: string;
    tags: string[];
    logo: string;
}

export interface Prompt {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    promptText: string;
    outputType: string;
    bestFor: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    category: string;
    topic: string;
    publishDate: string;
    author: string;
    readingTime: string;
    shortDescription: string;
    imageUrl?: string;
    imageAlt?: string;
    imagePrompt?: string;
    content: {
        intro: string;
        whatYouWillLearn: string;
        bestTools: string;
        useCases: string;
        conclusion: string;
    }
}

export interface Model {
    id: string;
    name: string;
    slug: string;
    developer: string;
    shortSummary: string;
    overview: string;
    keyCapabilities: string[];
    strengths: string;
    weaknesses: string;
    useCases: string;
    pricingInfo: string;
    freeTier: string;
    comparisonFeatures: {
        textGeneration: string;
        codingAbility: string;
        multimodalSupport: string;
        contextWindow: string;
        speed: string;
        freeTierStatus: string;
        pricingStatus: string;
        apiAccess: string;
    }
}

interface DataStore {
    segments: Segment[];
    tools: Tool[];
}

interface PromptsDataStore {
    prompts: Prompt[];
}

export interface PromptCategorySummary {
    slug: string;
    name: string;
    description: string;
    promptCount: number;
}

const EXCLUDED_CATEGORY_PAGE_SLUGS = new Set([
    'directory',
    'blog',
    'prompt-library',
    'models-comparison',
    'news',
]);

interface BlogDataStore {
    blogs: Blog[];
}

interface ModelsDataStore {
    models: Model[];
}

export function getData(): DataStore {
    const filePath = path.join(process.cwd(), 'tools.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as DataStore;
}

export function getFeaturedTools(): Tool[] {
    const data = getData();
    return data.tools; // Return all 12 as featured for this MVP
}

export function getSegments(): Segment[] {
    const data = getData();
    return data.segments;
}

export function getToolsByCategory(slug: string): Tool[] {
    const data = getData();
    if (slug === 'free') {
        return data.tools.filter(tool => tool.freeTier.toLowerCase() === 'free');
    }
    if (slug === 'no-login') {
        return data.tools.filter(tool => tool.tags.some(tag => tag.toLowerCase() === 'no login'));
    }
    if (slug === 'students' || slug === 'study-tools') {
        return data.tools.filter(tool => tool.tags.some(tag => tag.toLowerCase() === 'students' || tag.toLowerCase() === 'study'));
    }
    if (slug === 'upsc-ssc-prep') {
        return data.tools.filter(tool =>
            tool.tags.some(tag =>
                tag.toLowerCase() === 'students' ||
                tag.toLowerCase() === 'study' ||
                tag.toLowerCase() === 'education' ||
                tag.toLowerCase() === 'tutorial' ||
                tag.toLowerCase() === 'beginner'
            )
        );
    }
    if (slug === 'developers') {
        return data.tools.filter(tool => tool.tags.some(tag => tag.toLowerCase() === 'developers'));
    }
    if (slug === 'productivity') {
        return data.tools.filter(tool => tool.category === 'productivity' || tool.tags.some(tag => tag.toLowerCase() === 'productivity'));
    }
    if (slug === 'content-creation') {
        return data.tools.filter(tool => tool.category === 'content-creation' || tool.tags.some(tag => tag.toLowerCase() === 'content creation'));
    }
    if (slug === 'chrome-extensions') {
        return data.tools.filter(tool => tool.category === 'chrome-extensions' || tool.tags.some(tag => tag.toLowerCase() === 'chrome extension' || tag.toLowerCase() === 'extension'));
    }
    if (slug === 'resume-tools') {
        return data.tools.filter(tool => tool.category === 'resume-tools' || tool.tags.some(tag => tag.toLowerCase() === 'resume' || tag.toLowerCase() === 'cv'));
    }
    if (slug === 'business-tools') {
        return data.tools.filter(tool => tool.category === 'business-tools' || tool.tags.some(tag => tag.toLowerCase() === 'business'));
    }
    if (slug === 'marketing-tools') {
        return data.tools.filter(tool => tool.category === 'marketing-tools' || tool.tags.some(tag => tag.toLowerCase() === 'marketing'));
    }
    if (slug === 'social-media-tools') {
        return data.tools.filter(tool => tool.category === 'social-media-tools' || tool.tags.some(tag => tag.toLowerCase() === 'social media' || tag.toLowerCase() === 'social-media'));
    }
    if (slug === 'design-tools') {
        return data.tools.filter(tool => tool.category === 'design-tools' || tool.tags.some(tag => tag.toLowerCase() === 'design' || tag.toLowerCase() === 'ui/ux'));
    }
    if (slug === 'writing-tools') {
        return data.tools.filter(tool => tool.category === 'writing-tools' || tool.tags.some(tag => tag.toLowerCase() === 'writing'));
    }
    if (slug === 'beginner-guides') {
        return data.tools.filter(tool => tool.category === 'beginner-guides' || tool.tags.some(tag => tag.toLowerCase() === 'beginner' || tag.toLowerCase() === 'guide' || tag.toLowerCase() === 'tutorial'));
    }
    if (slug === 'tutorials') {
        return data.tools.filter(tool => tool.category === 'tutorials' || tool.tags.some(tag => tag.toLowerCase() === 'tutorial' || tag.toLowerCase() === 'guide'));
    }
    if (slug === 'news') {
        return data.tools.filter(tool => tool.category === 'news' || tool.tags.some(tag => tag.toLowerCase() === 'news'));
    }
    if (slug === 'made-in-india') {
        return data.tools.filter(tool => tool.category === 'made-in-india' || tool.tags.some(tag => tag.toLowerCase() === 'india' || tag.toLowerCase() === 'indian'));
    }
    if (slug === 'alternatives') {
        return data.tools.filter(tool => tool.category === 'alternatives' || tool.tags.some(tag => tag.toLowerCase() === 'alternative' || tag.toLowerCase() === 'open source'));
    }
    if (slug === 'reviews') {
        return data.tools.filter(tool => tool.category === 'reviews' || tool.tags.some(tag => tag.toLowerCase() === 'review'));
    }
    if (slug === 'agentic-ai') {
        return data.tools.filter(tool => tool.category === 'agentic-ai' || tool.tags.some(tag => tag.toLowerCase() === 'agent' || tag.toLowerCase() === 'autonomous'));
    }
    return data.tools.filter(tool => tool.category === slug);
}

export function getPromptsData(): PromptsDataStore {
    const filePath = path.join(process.cwd(), 'prompts.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as PromptsDataStore;
}

const PROMPT_CATEGORY_DESCRIPTIONS: Record<string, string> = {
    marketing: 'SEO, content, ads, funnels, email, and growth prompts for marketers and creators.',
    'social-media': 'Prompts for social posts, hooks, content calendars, captions, and engagement workflows.',
    business: 'Business prompts for operations, strategy, sales, reporting, and decision-making tasks.',
    productivity: 'Prompts that speed up daily work, planning, organization, summaries, and execution.',
    coding: 'Developer prompts for debugging, planning, refactoring, code generation, and technical workflows.',
    study: 'Study prompts for revision, notes, explanations, practice questions, and learning support.',
    'image-generation': 'Prompt templates for AI image direction, concept generation, style control, and creative briefs.',
    'upsc-ssc-prep': 'Exam-prep prompts for UPSC and SSC aspirants covering study plans, revision, mock analysis, and answer writing.',
    'ipl-2026': 'Top-trending IPL 2026 AI prompts to generate viral social media threads, Dream11 fantasy cricket predictions, and marketing strategies for maximum reach.',
};

const PROMPT_CATEGORY_NAMES: Record<string, string> = {
    'social-media': 'Social Media',
    'image-generation': 'Image Generation',
    'upsc-ssc-prep': 'UPSC / SSC Prep',
    'ipl-2026': 'IPL 2026',
};

const PROMPT_TO_TOOL_CATEGORY_MAP: Record<string, string> = {
    marketing: 'marketing-tools',
    'social-media': 'social-media-tools',
    business: 'business-tools',
    productivity: 'productivity',
    coding: 'developers',
    study: 'study-tools',
    'image-generation': 'image-generators',
    'upsc-ssc-prep': 'upsc-ssc-prep',
    'ipl-2026': 'social-media-tools',
};

function formatPromptCategoryName(slug: string): string {
    if (PROMPT_CATEGORY_NAMES[slug]) {
        return PROMPT_CATEGORY_NAMES[slug];
    }

    return slug
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

export function getPromptCategories(): PromptCategorySummary[] {
    const { prompts } = getPromptsData();
    const counts = new Map<string, number>();

    prompts.forEach((prompt) => {
        counts.set(prompt.category, (counts.get(prompt.category) || 0) + 1);
    });

    return Array.from(counts.entries())
        .map(([slug, promptCount]) => ({
            slug,
            name: formatPromptCategoryName(slug),
            description: PROMPT_CATEGORY_DESCRIPTIONS[slug] || `Browse AI prompts for ${formatPromptCategoryName(slug).toLowerCase()} workflows.`,
            promptCount,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPromptsByCategory(slug: string): Prompt[] {
    const { prompts } = getPromptsData();
    return prompts.filter((prompt) => prompt.category === slug);
}

export function getBrowsableCategorySlugs(): string[] {
    const segments = getSegments()
        .map((segment) => segment.slug)
        .filter((slug) => !EXCLUDED_CATEGORY_PAGE_SLUGS.has(slug));
    const { tools } = getData();
    const toolCategories = tools
        .map((tool) => tool.category)
        .filter((slug) => !EXCLUDED_CATEGORY_PAGE_SLUGS.has(slug));

    return Array.from(new Set([...segments, ...toolCategories])).filter(
        (slug) => getToolsByCategory(slug).length > 0
    );
}

export function getToolCategorySlugForPromptCategory(slug: string): string | null {
    const mappedSlug = PROMPT_TO_TOOL_CATEGORY_MAP[slug];

    if (!mappedSlug) {
        return null;
    }

    return getToolsByCategory(mappedSlug).length > 0 ? mappedSlug : null;
}

export function getBlogsData(): BlogDataStore {
    const filePath = path.join(process.cwd(), 'blog.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents) as BlogDataStore;

    data.blogs = [...data.blogs].sort((a, b) => {
        const dateDiff = new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        if (dateDiff !== 0) {
            return dateDiff;
        }
        return Number(b.id) - Number(a.id);
    });

    return data;
}

export function getModelsData(): ModelsDataStore {
    const filePath = path.join(process.cwd(), 'models.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as ModelsDataStore;
}
