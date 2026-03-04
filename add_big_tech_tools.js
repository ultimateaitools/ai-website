const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tools.json');

const bigTechTools = [
    // Google Tools
    {
        "id": "google-gemini",
        "name": "Google Gemini",
        "slug": "google-gemini",
        "category": "ai-assistant",
        "freeTier": "Freemium",
        "description": "Google's most capable AI model, offering text, image, and code generation with deep ecosystem integration.",
        "websiteURL": "https://gemini.google.com/",
        "tags": ["AI Assistant", "writing tools", "AI", "free AI", "Beginner"],
        "logo": "🤖"
    },
    {
        "id": "google-ai-studio",
        "name": "Google AI Studio",
        "slug": "google-ai-studio",
        "category": "developer-tools",
        "freeTier": "Free",
        "description": "A web-based prototyping environment for developers to quickly experiment and build with generative AI models like Gemini.",
        "websiteURL": "https://aistudio.google.com/",
        "tags": ["Developers", "Code Assistant", "AI", "API", "free AI"],
        "logo": "💻"
    },
    {
        "id": "notebook-lm",
        "name": "Google NotebookLM",
        "slug": "notebook-lm",
        "category": "study-tools",
        "freeTier": "Free",
        "description": "An AI-powered personalized notebook that helps you understand complex documents, synthesize notes, and generate study guides.",
        "websiteURL": "https://notebooklm.google.com/",
        "tags": ["Study Tools", "Productivity", "Students", "AI Assistant"],
        "logo": "📓"
    },
    {
        "id": "google-mediapipe",
        "name": "Google MediaPipe",
        "slug": "google-mediapipe",
        "category": "developer-tools",
        "freeTier": "Free",
        "description": "Cross-platform, customizable machine learning solutions for live and streaming media. Ideal for adding vision and audio AI.",
        "websiteURL": "https://developers.google.com/mediapipe",
        "tags": ["Developers", "Open Source", "free AI"],
        "logo": "🔧"
    },

    // Microsoft Tools
    {
        "id": "microsoft-copilot",
        "name": "Microsoft Copilot",
        "slug": "microsoft-copilot",
        "category": "ai-assistant",
        "freeTier": "Freemium",
        "description": "Your everyday AI companion powered by GPT-4 and DALL-E 3, seamlessly integrated into the Microsoft Edge and Windows ecosystem.",
        "websiteURL": "https://copilot.microsoft.com/",
        "tags": ["AI Assistant", "writing tools", "free AI", "Beginner"],
        "logo": "🤖"
    },
    {
        "id": "microsoft-designer",
        "name": "Microsoft Designer",
        "slug": "microsoft-designer",
        "category": "design-tools",
        "freeTier": "Freemium",
        "description": "A graphic design app that helps you create professional quality social media posts, invitations, and graphics using DALL-E 3.",
        "websiteURL": "https://designer.microsoft.com/",
        "tags": ["Design Tools", "Image Generators", "Content Creation", "free AI"],
        "logo": "🎨"
    },
    {
        "id": "github-copilot",
        "name": "GitHub Copilot",
        "slug": "github-copilot",
        "category": "developer-tools",
        "freeTier": "Freemium",
        "description": "The world's most widely adopted AI developer tool, offering code completion and chat natively within your IDE. (Free for students).",
        "websiteURL": "https://github.com/features/copilot",
        "tags": ["Developers", "Code Assistant", "Productivity"],
        "logo": "🐙"
    },
    {
        "id": "microsoft-math-solver",
        "name": "Microsoft Math Solver",
        "slug": "microsoft-math-solver",
        "category": "study-tools",
        "freeTier": "Free",
        "description": "Get step-by-step solutions to your math problems, from arithmetic to calculus, using this free AI educational tool.",
        "websiteURL": "https://mathsolver.microsoft.com/",
        "tags": ["Study Tools", "Students", "free AI", "Beginner"],
        "logo": "✖️"
    },

    // Meta Tools
    {
        "id": "meta-llama-3",
        "name": "Meta Llama 3",
        "slug": "meta-llama-3",
        "category": "models-comparison",
        "freeTier": "Free",
        "description": "Meta's state-of-the-art open source large language model, offering powerful capabilities for developers to build locally.",
        "websiteURL": "https://llama.meta.com/",
        "tags": ["Open Source", "Local LLM", "Developers", "free AI"],
        "logo": "🦙"
    },
    {
        "id": "meta-ai",
        "name": "Meta AI",
        "slug": "meta-ai",
        "category": "ai-assistant",
        "freeTier": "Free",
        "description": "A leading AI assistant available across WhatsApp, Instagram, and Facebook, generating text, images, and finding information.",
        "websiteURL": "https://www.meta.ai/",
        "tags": ["AI Assistant", "free AI", "Social Media", "Beginner"],
        "logo": "🌐"
    },
    {
        "id": "meta-audiocraft",
        "name": "Meta AudioCraft",
        "slug": "meta-audiocraft",
        "category": "audio-tools",
        "freeTier": "Free",
        "description": "An open-source library for deep learning research on audio generation, allowing you to create high-quality music and sounds from text.",
        "websiteURL": "https://audiocraft.metademolab.com/",
        "tags": ["Audio Tools", "Open Source", "Music", "Developers"],
        "logo": "🎵"
    },

    // Amazon Tools
    {
        "id": "amazon-q",
        "name": "Amazon Q",
        "slug": "amazon-q",
        "category": "developer-tools",
        "freeTier": "Freemium",
        "description": "A generative AI-powered assistant designed specifically for businesses and developers to code, build, and optimize on AWS.",
        "websiteURL": "https://aws.amazon.com/q/",
        "tags": ["Developers", "Business", "Code Assistant", "Productivity"],
        "logo": "☁️"
    },
    {
        "id": "amazon-codewhisperer",
        "name": "Amazon CodeWhisperer",
        "slug": "amazon-codewhisperer",
        "category": "developer-tools",
        "freeTier": "Freemium",
        "description": "An AI coding companion that generates whole line and full function code suggestions in your IDE to help you get more done faster.",
        "websiteURL": "https://aws.amazon.com/codewhisperer/",
        "tags": ["Code Assistant", "Developers", "free AI"],
        "logo": "👩‍💻"
    },
    {
        "id": "aws-bedrock",
        "name": "AWS Bedrock",
        "slug": "aws-bedrock",
        "category": "models-comparison",
        "freeTier": "Freemium",
        "description": "A fully managed service offering a choice of high-performing foundation models from leading AI companies via a single API.",
        "websiteURL": "https://aws.amazon.com/bedrock/",
        "tags": ["Models Comparison", "Developers", "Business", "API"],
        "logo": "🏗️"
    },

    // X (Twitter) Tools
    {
        "id": "x-grok",
        "name": "Grok by xAI",
        "slug": "x-grok",
        "category": "ai-assistant",
        "freeTier": "Freemium",
        "description": "An AI modeled after the Hitchhiker's Guide to the Galaxy, designed to answer almost anything and even suggest what questions to ask, with real-time X data.",
        "websiteURL": "https://grok.x.ai/",
        "tags": ["AI Assistant", "Social Media", "News", "Beginner"],
        "logo": "✖️"
    }
];

try {
    let fileContents = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContents);

    // Prevent duplicates based on SLUG
    const existingSlugs = new Set(data.tools.map(t => t.slug));

    let addedCount = 0;
    for (const newTool of bigTechTools) {
        if (!existingSlugs.has(newTool.slug)) {
            data.tools.push(newTool);
            addedCount++;
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully added ${addedCount} new big tech tools to tools.json.`);
} catch (err) {
    console.error('Error modifying tools.json', err);
}
