const fs = require('fs');

const data = JSON.parse(fs.readFileSync('tools.json', 'utf8'));

const tools = [
    { name: "ChatGPT", category: "writing-tools", tag: "AI Assistant" },
    { name: "Perplexity", category: "research", tag: "Search Engine" },
    { name: "Claude", category: "writing-tools", tag: "AI Assistant" },
    { name: "Gemini", category: "writing-tools", tag: "AI Assistant" },
    { name: "Midjourney", category: "image-generators", tag: "Image Generation" },
    { name: "Leonardo AI", category: "image-generators", tag: "Image Generation" },
    { name: "Runway", category: "video-generators", tag: "Video Editing" },
    { name: "Pictory", category: "video-generators", tag: "Video Creation" },
    { name: "Synthesia", category: "video-generators", tag: "AI Avatars" },
    { name: "Descript", category: "audio-tools", tag: "Audio Editing" },
    { name: "ElevenLabs", category: "audio-tools", tag: "Text to Speech" },
    { name: "Murf AI", category: "audio-tools", tag: "Voice Generator" },
    { name: "Notion AI", category: "productivity", tag: "Workspace" },
    { name: "Copy.ai", category: "writing-tools", tag: "Copywriting" },
    { name: "Jasper", category: "writing-tools", tag: "Copywriting" },
    { name: "Writesonic", category: "writing-tools", tag: "Content Creation" },
    { name: "Grammarly", category: "writing-tools", tag: "Grammar Check" },
    { name: "QuillBot", category: "writing-tools", tag: "Paraphrasing" },
    { name: "Tome AI", category: "productivity", tag: "Presentations" },
    { name: "Gamma", category: "productivity", tag: "Presentations" },
    { name: "Durable AI", category: "design-tools", tag: "Website Builder" },
    { name: "Replit Ghostwriter", category: "coding", tag: "Code Assistant" },
    { name: "GitHub Copilot", category: "coding", tag: "Code Assistant" },
    { name: "Codeium", category: "coding", tag: "Code Assistant" },
    { name: "Blackbox AI", category: "coding", tag: "Code Search" },
    { name: "Phind", category: "coding", tag: "Developer Search" },
    { name: "Zapier AI", category: "automation-tools", tag: "Workflow Automation" },
    { name: "Make AI", category: "automation-tools", tag: "Workflow Automation" },
    { name: "Bardeen", category: "automation-tools", tag: "Browser Automation" },
    { name: "Taskade AI", category: "productivity", tag: "Task Management" }
].map((t, i) => ({
    id: String(i + 1),
    name: t.name,
    slug: t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: t.category,
    freeTier: "Freemium",
    description: `Learn how to use ${t.name}, an AI-powered tool for ${t.category.replace('-', ' ')}. Explore features, pricing and free access options.`,
    websiteURL: `https://ultimateaitools.online/go/${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
    tags: [t.tag, t.category.replace('-', ' '), "AI"],
    logo: `/logos/${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.svg`
}));

data.tools = tools;
fs.writeFileSync('tools.json', JSON.stringify(data, null, 4));
console.log('Successfully updated tools.json with 30 tools.');
