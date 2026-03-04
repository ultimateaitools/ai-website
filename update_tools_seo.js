const fs = require('fs');
const content = fs.readFileSync('tools.json', 'utf8');
const data = JSON.parse(content);

const allowedCategories = [
    'writing-tools', 'study-tools', 'coding', 'image-generators',
    'video-generators', 'audio-tools', 'automation-tools', 'chrome-extensions',
    'resume-tools', 'business-tools', 'marketing-tools', 'social-media-tools',
    'design-tools', 'content-creation', 'productivity', 'agentic-ai'
];

const categoryMap = {
    'research': 'productivity',
    'image-generation': 'image-generators',
    'video-editing': 'video-generators',
    'video-creation': 'video-generators',
    'audio-editing': 'audio-tools',
    'text-to-speech': 'audio-tools',
    'voice-generator': 'audio-tools',
    'workspace': 'productivity',
    'copywriting': 'writing-tools',
    'grammar-check': 'writing-tools',
    'paraphrasing': 'writing-tools',
    'presentations': 'productivity',
    'website-builder': 'design-tools',
    'code-assistant': 'coding',
    'code-search': 'coding',
    'developer-search': 'coding',
    'workflow-automation': 'automation-tools',
    'browser-automation': 'automation-tools',
    'task-management': 'productivity',
    'developer': 'coding',
    'chatbot': 'productivity',
    'design': 'design-tools'
};

const uniqueDescriptions = {
    "chatgpt": "ChatGPT by OpenAI is a highly versatile conversational AI model designed to assist users with writing, brainstorming, and complex problem solving across diverse scenarios.",
    "perplexity": "Perplexity is an AI-powered search engine answering queries precisely with cited sources, making it perfect for researchers, students, and professionals needing reliable information fast.",
    "claude": "Claude is a safe and highly capable AI assistant that excels at nuanced writing, deep analysis, and synthesizing large documents for maximum productivity.",
    "gemini": "Google's Gemini model provides powerful multimodal assistance, helping users creatively write, code, and analyze data by integrating seamlessly with the Google ecosystem.",
    "midjourney": "Midjourney generates breathtaking, high-quality images from text descriptions, operating through Discord to serve artists, designers, and creatives with stunning visual inspiration.",
    "leonardo ai": "Leonardo AI provides advanced control over image generation, empowering game developers and artists to create consistent, high-fidelity visual assets tailored to fine-tuned models.",
    "runway": "Runway offers a suite of magical AI tools for video editing and generation, allowing creators to synthesize and edit video content with unprecedented ease.",
    "pictory": "Pictory automatically creates high-engaging, short branded videos from long-form content, perfect for marketers and social media managers looking to maximize reach effortlessly.",
    "synthesia": "Synthesia generates professional videos featuring lifelike AI avatars from plain text, ideal for corporate training, marketing, and global communications without camera gear.",
    "descript": "Descript revolutionizes audio and video editing by allowing you to edit media as easily as a text document, streamlining podcast and video production workflows.",
    "elevenlabs": "ElevenLabs delivers incredibly realistic AI voice generation and text-to-speech capabilities, perfect for audiobooks, gaming, and content creators needing premium voiceovers.",
    "murf ai": "Murf AI provides studio-quality voiceovers from text, offering a wide range of natural-sounding voices suited for e-learning, corporate presentations, and marketing videos.",
    "notion ai": "Notion AI brings artificial intelligence directly into your workspace, helping teams summarize notes, draft documents, and brainstorm ideas without leaving their organizational hub.",
    "copy.ai": "Copy.ai is an automated copywriting assistant that helps marketers and entrepreneurs quickly generate ad copy, blog outlines, and engaging social media posts.",
    "jasper": "Jasper is an enterprise-grade AI writing platform designed to help marketing teams scale content production while maintaining a consistent and engaging brand voice.",
    "writesonic": "Writesonic generates SEO-optimized articles, blogs, and ad copy rapidly, giving content creators and marketers an edge in high-volume, high-quality content production.",
    "grammarly": "Grammarly uses advanced AI to review spelling, grammar, and tone in real-time, ensuring professionals and students communicate clearly and confidently everywhere they type.",
    "quillbot": "QuillBot is a powerful AI paraphrasing tool that helps writers refine their sentences, improve fluency, and overcome writer's block with intuitive rewriting suggestions.",
    "tome ai": "Tome AI allows users to generate visually stunning and highly engaging presentations from a simple text prompt, streamlining the storytelling process for professionals.",
    "gamma": "Gamma is an AI-powered medium for presenting ideas, instantly formatting text into beautiful slides, web pages, or documents for seamless professional communication.",
    "durable ai": "Durable AI is an intelligent website builder that generates fully functional, professional business websites complete with copy and images in mere seconds.",
    "replit ghostwriter": "Replit Ghostwriter is an integrated AI coding assistant that autocomplete code, explains logic, and helps developers build software faster right inside the browser.",
    "github copilot": "GitHub Copilot functions as your AI pair programmer, analyzing context to suggest entire lines or blocks of code, dramatically accelerating the software development lifecycle.",
    "codeium": "Codeium is a powerful, free AI code completion tool supporting numerous languages and IDEs, helping developers write code faster and with fewer tedious errors.",
    "blackbox ai": "Blackbox AI helps developers quickly find the best code snippets to build faster, turning natural language questions directly into functional code solutions.",
    "phind": "Phind is an AI search engine optimized specifically for developers, providing detailed, code-centric answers and explanations to complex programming and technical questions.",
    "zapier ai": "Zapier AI empowers users to build complex automation workflows across thousands of apps using simple natural language instructions, bypassing the need for manual setup.",
    "make ai": "Make AI accelerates the creation of visual workflows, helping businesses automate their processes by connecting apps intuitively without writing a single line of code.",
    "bardeen": "Bardeen brings AI automation directly to your browser, allowing professionals to scrape data, build workflows, and automate repetitive web tasks efficiently.",
    "taskade ai": "Taskade AI acts as a collaborative workspace that uses artificial intelligence to outline tasks, build mind maps, and manage projects for highly productive teams."
};

data.tools = data.tools.map(tool => {
    // Ensure category is allowed
    let currentCategory = tool.category;
    if (!allowedCategories.includes(currentCategory)) {
        currentCategory = categoryMap[currentCategory] || 'productivity';
    }

    // Set unique description
    const description = uniqueDescriptions[tool.name.toLowerCase()] || `A powerful AI tool for ${currentCategory.replace('-', ' ')} that boosts productivity and efficiency.`;

    return {
        ...tool,
        category: currentCategory,
        description: description,
        websiteURL: `/go/${tool.slug}`
    };
});

fs.writeFileSync('tools.json', JSON.stringify(data, null, 2));
console.log('Updated tools.json');
