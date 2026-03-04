const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tools.json');

// Read existing tools
let data = { segments: [], tools: [] };
try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
} catch (err) {
    console.error("Error reading tools.json", err);
    process.exit(1);
}

const existingSlugs = new Set(data.tools.map(t => t.slug));

// Generate a large array of tools with massive tags for cross-pollination
const newTools = [
    { name: 'Canva AI', category: 'design-tools', freeTier: 'Freemium', description: 'Canva Magic Studio brings AI to your design workflow with magic write, text-to-image, and auto-presentations.', websiteURL: 'https://canva.com', tags: ['Design', 'UI/UX', 'Social Media', 'Marketing', 'Beginner', 'Productivity', 'Business', 'Free AI', 'Students', 'Content Creation'] },
    { name: 'Figma AI', category: 'design-tools', freeTier: 'Freemium', description: 'Figma introduces AI to generate UI layouts, wireframes, and design systems instantly.', websiteURL: 'https://figma.com', tags: ['Design', 'UI/UX', 'Productivity', 'Developers', 'Business'] },
    { name: 'GitHub Copilot Workspace', category: 'coding', freeTier: 'Paid', description: 'AI-native developer environment for planning, coding, and testing in the browser.', websiteURL: 'https://github.com/features/copilot', tags: ['Coding', 'Developers', 'Productivity', 'Agent', 'Business'] },
    { name: 'Cursor AI', category: 'coding', freeTier: 'Freemium', description: 'The AI-first code editor designed for pair programming with advanced large language models.', websiteURL: 'https://cursor.sh', tags: ['Coding', 'Developers', 'Productivity', 'Open Source', 'Alternative'] },
    { name: 'Vercel v0', category: 'coding', freeTier: 'Freemium', description: 'Generate UI components and React code from simple text prompts using Vercel v0.', websiteURL: 'https://v0.dev', tags: ['Coding', 'Developers', 'Design', 'UI/UX', 'Productivity'] },
    { name: 'AutoGPT', category: 'agentic-ai', freeTier: 'Free', description: 'An experimental open-source application showcasing the capabilities of the GPT-4 language model as an autonomous agent.', websiteURL: 'https://agpt.co', tags: ['Agent', 'Autonomous', 'Open Source', 'Developers', 'Coding', 'Free AI', 'No Login'] },
    { name: 'BabyAGI', category: 'agentic-ai', freeTier: 'Free', description: 'An AI-powered task management system that creates, prioritizes, and executes tasks using OpenAI and vector databases.', websiteURL: 'https://github.com/yoheinakajima/babyagi', tags: ['Agent', 'Autonomous', 'Open Source', 'Developers', 'Task Management'] },
    { name: 'HeyGen', category: 'video-generators', freeTier: 'Freemium', description: 'Create AI-generated videos with real-life avatars and incredibly natural voiceovers for marketing and training.', websiteURL: 'https://heygen.com', tags: ['Video Generators', 'Marketing', 'Social Media', 'Business', 'Content Creation', 'AI Avatars'] },
    { name: 'Opus Clip', category: 'video-generators', freeTier: 'Freemium', description: 'AI generative video repurposing tool that turns long videos into viral short clips with captions.', websiteURL: 'https://opus.pro', tags: ['Video Generators', 'Social Media', 'Marketing', 'Content Creation', 'Productivity'] },
    { name: 'ElevenLabs Text-to-Speech', category: 'audio-tools', freeTier: 'Freemium', description: 'The most realistic and versatile AI speech software for creators and publishers.', websiteURL: 'https://elevenlabs.io', tags: ['Audio Tools', 'Voice Generator', 'Content Creation', 'Marketing', 'Social Media'] },
    { name: 'Suno AI', category: 'audio-tools', freeTier: 'Freemium', description: 'Make a song about anything. Suno generates complete tracks with vocals and instrumentation from text prompts.', websiteURL: 'https://suno.com', tags: ['Audio Tools', 'Music Generation', 'Content Creation', 'Social Media', 'Design'] },
    { name: 'Udio', category: 'audio-tools', freeTier: 'Freemium', description: 'Udio is an AI music generator that produces extremely lifelike and emotional musical tracks across any genre.', websiteURL: 'https://udio.com', tags: ['Audio Tools', 'Music Generation', 'Content Creation', 'No Login'] },
    { name: 'Midjourney v6', category: 'image-generators', freeTier: 'Paid', description: 'State-of-the-art AI image generator offering photorealistic, cinematic, and artistic generations via Discord.', websiteURL: 'https://midjourney.com', tags: ['Image Generators', 'Design', 'Content Creation', 'Marketing', 'Social Media', 'Review'] },
    { name: 'DALL-E 3', category: 'image-generators', freeTier: 'Freemium', description: 'OpenAI’s premier image generation model integrated directly into ChatGPT for nuanced text-to-image creation.', websiteURL: 'https://openai.com/dall-e-3', tags: ['Image Generators', 'Design', 'Content Creation', 'Students', 'Beginner', 'Tutorial'] },
    { name: 'Stable Diffusion 3', category: 'image-generators', freeTier: 'Free', description: 'The most capable open-source text-to-image model developed by Stability AI.', websiteURL: 'https://stability.ai', tags: ['Image Generators', 'Design', 'Open Source', 'Free AI', 'Developers', 'Alternative'] },
    { name: 'Fireflies.ai', category: 'productivity', freeTier: 'Freemium', description: 'AI voice assistant that helps record, transcribe, search, and analyze voice conversations.', websiteURL: 'https://fireflies.ai', tags: ['Productivity', 'Business', 'Students', 'Study', 'Task Management'] },
    { name: 'Otter.ai', category: 'productivity', freeTier: 'Freemium', description: 'Otter generates highly accurate meeting notes, automated summaries, and action items in real time.', websiteURL: 'https://otter.ai', tags: ['Productivity', 'Business', 'Students', 'Study', 'Chrome Extension'] },
    { name: 'Beautiful.ai', category: 'productivity', freeTier: 'Freemium', description: 'Expert deck designer AI that automatically formats and designs stunning presentations as you type.', websiteURL: 'https://beautiful.ai', tags: ['Productivity', 'Presentations', 'Business', 'Marketing', 'Design', 'Students'] },
    { name: 'Miro AI', category: 'productivity', freeTier: 'Freemium', description: 'Miro Assist generates sticky notes, maps processes, and summarizes whiteboards using AI.', websiteURL: 'https://miro.com', tags: ['Productivity', 'Business', 'Workspace', 'Design', 'UI/UX'] },
    { name: 'Fotor AI', category: 'design-tools', freeTier: 'Freemium', description: 'An all-in-one AI photo editor and design tool that makes graphic creation accessible to everyone.', websiteURL: 'https://fotor.com', tags: ['Design', 'Image Generators', 'Social Media', 'Marketing', 'Beginner'] },
    { name: 'Photoroom', category: 'design-tools', freeTier: 'Freemium', description: 'Instantly remove backgrounds and create stunning product photography photos with AI.', websiteURL: 'https://photoroom.com', tags: ['Design', 'Social Media', 'Marketing', 'Business'] },
    { name: 'Rytr', category: 'writing-tools', freeTier: 'Freemium', description: 'An AI writing assistant that helps you create high-quality content, in just a few seconds, at a fraction of the cost!', websiteURL: 'https://rytr.me', tags: ['Writing', 'Content Creation', 'Marketing', 'Social Media', 'Business', 'Students'] },
    { name: 'Sudowrite', category: 'writing-tools', freeTier: 'Paid', description: 'The AI writing partner you always wanted. Specifically designed for fiction writers and authors.', websiteURL: 'https://sudowrite.com', tags: ['Writing', 'Content Creation', 'Alternative'] },
    { name: 'Anyword', category: 'writing-tools', freeTier: 'Freemium', description: 'Anyword is an AI writing tool designed to generate highly converting marketing and sales copy.', websiteURL: 'https://anyword.com', tags: ['Writing', 'Marketing', 'Business', 'Social Media', 'Content Creation'] },
    { name: 'DeepL', category: 'productivity', freeTier: 'Freemium', description: 'The world\'s most accurate AI translator, capturing nuance and intent across dozens of languages.', websiteURL: 'https://deepl.com', tags: ['Productivity', 'Writing Tools', 'Study', 'Students', 'Business', 'Chrome Extension'] },
    { name: 'Claude 3 Opus', category: 'writing-tools', freeTier: 'Paid', description: 'Anthropic’s most intelligent model, capable of handling complex analysis, long-form writing, and coding tasks.', websiteURL: 'https://anthropic.com', tags: ['Writing', 'Coding', 'Developers', 'Productivity', 'Review'] },
    { name: 'Gemini 1.5 Pro', category: 'productivity', freeTier: 'Freemium', description: 'Google’s next-gen AI with a massive context window capable of analyzing large books or hours of video.', websiteURL: 'https://gemini.google.com', tags: ['Productivity', 'Writing', 'Study', 'Students', 'Developers', 'Business', 'News'] },
    { name: 'Poe', category: 'productivity', freeTier: 'Free', description: 'Poe lets you ask questions, get instant answers, and have back-and-forth conversations with multiple AI bots like GPT-4 and Claude 3.', websiteURL: 'https://poe.com', tags: ['Productivity', 'No Login', 'Free AI', 'Students', 'Alternative', 'Beginner'] },
    { name: 'You.com', category: 'productivity', freeTier: 'Freemium', description: 'A private search engine summarizing web results using LLMs with a focus on privacy and intent.', websiteURL: 'https://you.com', tags: ['Search Engine', 'Research', 'Students', 'Productivity', 'Alternative', 'News'] },
    { name: 'Luma AI (Dream Machine)', category: 'video-generators', freeTier: 'Free', description: 'Luma Dream Machine is a next-generation AI video model that creates high-quality, realistic videos from text and images.', websiteURL: 'https://lumalabs.ai', tags: ['Video Generators', 'Content Creation', 'Social Media', 'Design', 'Free AI'] },
    { name: 'Kling AI', category: 'video-generators', freeTier: 'Free', description: 'Kuaishou’s video generation model capable of producing highly dynamic and realistic clips up to 2 minutes long.', websiteURL: 'https://klingai.com', tags: ['Video Generators', 'Social Media', 'Content Creation', 'Alternative'] },
    { name: 'Sora', category: 'video-generators', freeTier: 'Paid', description: 'OpenAI’s groundbreaking text-to-video model capable of generating up to 1 minute of high-fidelity video.', websiteURL: 'https://openai.com/sora', tags: ['Video Generators', 'Design', 'News', 'Review', 'Content Creation'] },
    { name: 'Devin', category: 'agentic-ai', freeTier: 'Paid', description: 'The first fully autonomous AI software engineer developed by Cognition Labs.', websiteURL: 'https://cognition.ai/devin', tags: ['Agent', 'Autonomous', 'Developers', 'Coding', 'News', 'Review'] },
    { name: 'CodeRabbit', category: 'coding', freeTier: 'Freemium', description: 'AI-driven code reviews directly in your pull requests, saving engineering teams hours of manual review.', websiteURL: 'https://coderabbit.ai', tags: ['Coding', 'Developers', 'Business', 'Agent'] },
    { name: 'Baidu ERNIE', category: 'productivity', freeTier: 'Freemium', description: 'China’s leading large language model and AI chatbot developed by Baidu.', websiteURL: 'https://yiyan.baidu.com', tags: ['Alternative', 'Review', 'News', 'Productivity'] },
    { name: 'Mistral Le Chat', category: 'productivity', freeTier: 'Free', description: 'Mistral’s free conversational interface for interacting with their powerful, open-weight European models.', websiteURL: 'https://chat.mistral.ai', tags: ['Free AI', 'Alternative', 'Open Source', 'Writing', 'Developers'] },
    { name: 'Llama 3', category: 'coding', freeTier: 'Free', description: 'Meta’s highly capable, fully open-source LLM available for downloading or testing via Groq.', websiteURL: 'https://llama.meta.com', tags: ['Open Source', 'Free AI', 'Developers', 'Alternative', 'News', 'Review'] },
    { name: 'Groq', category: 'productivity', freeTier: 'Free', description: 'The fastest LPU inference engine providing lightning-fast responses from open-source models like Llama 3 and Mixtral.', websiteURL: 'https://groq.com', tags: ['Productivity', 'Developers', 'Free AI', 'No Login', 'Alternative'] },
    { name: 'Hugging Face Spaces', category: 'coding', freeTier: 'Free', description: 'Discover, test, and host the latest machine learning applications and AI models built by the community.', websiteURL: 'https://huggingface.co/spaces', tags: ['Coding', 'Developers', 'Open Source', 'Free AI', 'Tutorial'] },
    { name: 'Vidyut AI', category: 'made-in-india', freeTier: 'Freemium', description: 'Indian AI platform offering vernacular language support and robust API solutions for businesses.', websiteURL: 'https://vidyut.io', tags: ['Made in India', 'Indian', 'Business', 'Developers'] },
    { name: 'Sarvam AI', category: 'made-in-india', freeTier: 'Freemium', description: 'Building full-stack generative AI solutions tailor-made for Indian languages and enterprise use cases.', websiteURL: 'https://sarvam.ai', tags: ['Made in India', 'Indian', 'Developers', 'Business', 'Audio Tools'] },
    { name: 'Bhashini AI', category: 'made-in-india', freeTier: 'Free', description: 'National language translation mission bridging the language barrier in India using open-source AI.', websiteURL: 'https://bhashini.gov.in', tags: ['Made in India', 'Indian', 'Free AI', 'Open Source', 'Audio Tools', 'Translation'] },
    { name: 'Revoicer', category: 'audio-tools', freeTier: 'Freemium', description: 'AI voice generator creating highly emotive, human-sounding voices for sales videos and e-learning.', websiteURL: 'https://revoicer.com', tags: ['Audio Tools', 'Voice Generator', 'Marketing', 'Business'] },
    { name: 'Zenhub AI', category: 'productivity', freeTier: 'Freemium', description: 'AI-assisted agile project management that categorizes issues and predicts sprint completion.', websiteURL: 'https://zenhub.com', tags: ['Productivity', 'Task Management', 'Developers', 'Business', 'Agent'] },
    { name: 'ClickUp Brain', category: 'productivity', freeTier: 'Freemium', description: 'ClickUp connects all your enterprise knowledge, tasks, and documents with AI neural networks.', websiteURL: 'https://clickup.com', tags: ['Productivity', 'Task Management', 'Business', 'Workspace'] },
    { name: 'Coze', category: 'agentic-ai', freeTier: 'Free', description: 'Next-generation AI bot building platform from ByteDance to create custom agents fast without coding.', websiteURL: 'https://coze.com', tags: ['Agent', 'Autonomous', 'Developers', 'Beginner', 'Free AI'] },
    { name: 'Guidde', category: 'productivity', freeTier: 'Freemium', description: 'Magically create video documentation, how-to guides, and tutorials with AI in seconds via Chrome Extension.', websiteURL: 'https://guidde.com', tags: ['Productivity', 'Tutorial', 'Guide', 'Chrome Extension', 'Students', 'Content Creation'] },
    { name: 'Scribe', category: 'productivity', freeTier: 'Freemium', description: 'Scribe automatically generates step-by-step guides by capturing your browser clicks and keystrokes.', websiteURL: 'https://scribehow.com', tags: ['Productivity', 'Tutorial', 'Guide', 'Chrome Extension', 'Business', 'Students'] },
    { name: 'Zety AI', category: 'resume-tools', freeTier: 'Freemium', description: 'Smart AI resume builder suggesting powerful phrases and checking your CV against recruiter standards.', websiteURL: 'https://zety.com', tags: ['Resume Tools', 'CV', 'Students', 'Beginner'] },
    { name: 'Enhancv AI', category: 'resume-tools', freeTier: 'Freemium', description: 'Modern resumes tailored by AI to match specific job descriptions seamlessly.', websiteURL: 'https://enhancv.com', tags: ['Resume Tools', 'CV', 'Business'] },
    { name: 'ResumA.I.', category: 'resume-tools', freeTier: 'Freemium', description: 'Instantly write your resume bullet points and cover letters with AI intelligence.', websiteURL: 'https://resumai.com', tags: ['Resume Tools', 'CV', 'Writing'] },
    { name: 'Octopus.do', category: 'design-tools', freeTier: 'Free', description: 'Fast visual sitemap builder featuring AI structure generation for UI/UX planners.', websiteURL: 'https://octopus.do', tags: ['Design', 'UI/UX', 'Productivity', 'Free AI'] },
    { name: 'Relume Library', category: 'design-tools', freeTier: 'Freemium', description: 'Relume AI generates comprehensive site maps and wireframes in seconds, exporting directly to Figma or Webflow.', websiteURL: 'https://relume.io', tags: ['Design', 'UI/UX', 'Developers', 'Business'] },
    { name: 'Looka', category: 'design-tools', freeTier: 'Freemium', description: 'AI-powered logo maker and brand identity generator for entrepreneurs starting a new business.', websiteURL: 'https://looka.com', tags: ['Design', 'Marketing', 'Business', 'Beginner'] },
    { name: 'Surfer SEO', category: 'marketing-tools', freeTier: 'Paid', description: 'Surfer uses AI to research, write, and optimize SEO articles that rank beautifully on Google.', websiteURL: 'https://surferseo.com', tags: ['Marketing', 'Writing', 'Business', 'Content Creation'] },
    { name: 'HubSpot Content Assistant', category: 'marketing-tools', freeTier: 'Freemium', description: 'HubSpot’s AI tools help marketers generate blog ideas, draft emails, and create social sequences seamlessly.', websiteURL: 'https://hubspot.com/artificial-intelligence', tags: ['Marketing', 'Social Media', 'Business', 'Writing'] },
    { name: 'Hootsuite OwlyWriter', category: 'social-media-tools', freeTier: 'Paid', description: 'OwlyWriter AI instantly generates winning social media captions and post ideas based on past performance.', websiteURL: 'https://hootsuite.com', tags: ['Social Media', 'Marketing', 'Content Creation'] },
    { name: 'Buffer AI', category: 'social-media-tools', freeTier: 'Freemium', description: 'Buffer’s AI assistant repurposes your long-form content into punchy social media posts in one click.', websiteURL: 'https://buffer.com', tags: ['Social Media', 'Marketing', 'Content Creation', 'Beginner'] },
    { name: 'HARPA AI', category: 'chrome-extensions', freeTier: 'Freemium', description: 'Hybrid AI Agent for Chrome that monitors web pages, scrapes data, and tracks prices via a highly customizable sidebar.', websiteURL: 'https://harpa.ai', tags: ['Chrome Extension', 'Agent', 'Productivity', 'Research'] },
    { name: 'Monica', category: 'chrome-extensions', freeTier: 'Freemium', description: 'Your AI copilot on Chrome, powered by GPT-4 and Claude 3, answering questions alongside any web page you visit.', websiteURL: 'https://monica.im', tags: ['Chrome Extension', 'Productivity', 'Writing Tools', 'Reading'] },
    { name: 'BypassGPT', category: 'writing-tools', freeTier: 'Freemium', description: 'Advanced AI humanizer that rewrites AI-generated text to bypass detection tools seamlessly.', websiteURL: 'https://bypassgpt.ai', tags: ['Writing', 'Students', 'Content Creation', 'Alternative'] },
    { name: 'SciSpace (Typeset.io)', category: 'study-tools', freeTier: 'Freemium', description: 'An AI copilot for researchers to understand, analyze, and cite academic papers easily.', websiteURL: 'https://typeset.io', tags: ['Study', 'Students', 'Research', 'Productivity', 'Beginner'] },
    { name: 'Consensus', category: 'study-tools', freeTier: 'Freemium', description: 'An AI search engine that extracts findings directly from peer-reviewed scientific studies.', websiteURL: 'https://consensus.app', tags: ['Study', 'Students', 'Research', 'Search Engine', 'Review'] },
    { name: 'ChatPDF', category: 'study-tools', freeTier: 'Free', description: 'Interact with any PDF document via AI. Extracts insights, summarizes chapters, and answers queries instantly.', websiteURL: 'https://chatpdf.com', tags: ['Study', 'Students', 'Productivity', 'Free AI', 'No Login'] },
    { name: 'DeepLearning.AI', category: 'beginner-guides', freeTier: 'Free', description: 'Offers the best free tutorials and short courses for beginners wanting to build gen-AI applications.', websiteURL: 'https://deeplearning.ai', tags: ['Beginner', 'Tutorial', 'Guide', 'Students', 'News'] },
    { name: 'Coursera AI Courses', category: 'tutorials', freeTier: 'Freemium', description: 'Explore top technical tutorials and guided projects on machine learning, data science, and AI from top universities.', websiteURL: 'https://coursera.org', tags: ['Tutorial', 'Students', 'Study', 'Beginner'] },
    { name: 'The Rundown AI', category: 'news', freeTier: 'Free', description: 'Get the latest AI news, insights, and developments delivered directly to your inbox every morning.', websiteURL: 'https://therundown.ai', tags: ['News', 'Review', 'Beginner', 'Business'] },
    { name: 'TLDR AI', category: 'news', freeTier: 'Free', description: 'A daily newsletter covering the most important AI industry news, machine learning research, and tech updates in 5 minutes.', websiteURL: 'https://tldr.tech/ai', tags: ['News', 'Developer', 'Business', 'Review'] }
];

let addedCount = 0;
let nextId = Math.max(...data.tools.map(t => parseInt(t.id))) + 1;

newTools.forEach(tool => {
    let slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!existingSlugs.has(slug)) {
        data.tools.push({
            id: String(nextId++),
            name: tool.name,
            slug: slug,
            category: tool.category,
            freeTier: tool.freeTier,
            description: tool.description,
            websiteURL: tool.websiteURL,
            tags: tool.tags,
            logo: "/logos/google.svg" // Fallback logo
        });
        addedCount++;
        existingSlugs.add(slug);
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Successfully added ${addedCount} tools. Total tools now: ${data.tools.length}`);
