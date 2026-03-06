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
