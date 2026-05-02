const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'tools.json');
const blogPath = path.join(__dirname, 'blog.json');

const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));

const existingToolSlugs = new Set(toolsData.tools.map((t) => t.slug));
const maxToolId = Math.max(...toolsData.tools.map((t) => Number(t.id) || 0));

const newLaunchTools = [
  {
    name: 'Runway Gen-4',
    slug: 'runway-gen-4',
    category: 'video-generators',
    freeTier: 'Paid',
    description:
      'Runway Gen-4 is the latest production-grade video generation model built for ad creatives, cinematic consistency, and faster multi-shot storytelling pipelines.',
    websiteURL: 'https://runwayml.com',
    tags: ['AI Video', 'Runway', 'Creative Studio', 'Ad Production', 'Video Workflow', 'Launch 2026', 'US Market'],
    logo: '/logos/runway.svg',
  },
  {
    name: 'Google Gemini 2.5 Flash',
    slug: 'gemini-2-5-flash',
    category: 'models-comparison',
    freeTier: 'Freemium',
    description:
      'Gemini 2.5 Flash is Google\'s high-speed reasoning model tuned for low-latency enterprise workflows, multimodal support, and cost-efficient API scale.',
    websiteURL: 'https://ai.google.dev',
    tags: ['Gemini', 'AI Model', 'Low Latency', 'API', 'Developers', 'Launch 2026', 'US Market'],
    logo: '/logos/gemini.svg',
  },
  {
    name: 'Claude 4 Sonnet',
    slug: 'claude-4-sonnet',
    category: 'models-comparison',
    freeTier: 'Freemium',
    description:
      'Claude 4 Sonnet offers advanced long-context reasoning, stronger coding reliability, and enterprise-grade writing quality for high-trust professional tasks.',
    websiteURL: 'https://www.anthropic.com',
    tags: ['Claude', 'AI Model', 'Reasoning', 'Coding', 'Long Context', 'Launch 2026', 'US Market'],
    logo: '/logos/claude.svg',
  },
  {
    name: 'OpenAI Deep Research',
    slug: 'openai-deep-research',
    category: 'productivity',
    freeTier: 'Paid',
    description:
      'OpenAI Deep Research is a citation-oriented autonomous research system that compiles multi-source analysis briefs for strategy, policy, and market intelligence teams.',
    websiteURL: 'https://openai.com',
    tags: ['Research AI', 'Autonomous Research', 'Knowledge Work', 'Analyst Tools', 'Launch 2026', 'US Market'],
    logo: '/logos/chatgpt.svg',
  },
  {
    name: 'Cursor Agents',
    slug: 'cursor-agents',
    category: 'developer-tools',
    freeTier: 'Freemium',
    description:
      'Cursor Agents enables multi-step coding workflows with autonomous task execution, repository-aware context, and integrated review loops for faster software delivery.',
    websiteURL: 'https://cursor.com',
    tags: ['Coding Agent', 'Developer Tools', 'Code Automation', 'Product Engineering', 'Launch 2026', 'US Market'],
    logo: '/logos/cursor.svg',
  },
  {
    name: 'Notion Mail',
    slug: 'notion-mail',
    category: 'productivity',
    freeTier: 'Freemium',
    description:
      'Notion Mail is an AI-prioritized inbox workflow layer that converts messages into actionable summaries, tasks, and follow-up systems for high-volume teams.',
    websiteURL: 'https://www.notion.so',
    tags: ['Email AI', 'Inbox Automation', 'Productivity', 'Founders', 'Operations', 'Launch 2026', 'US Market'],
    logo: '/logos/notion.svg',
  },
  {
    name: 'LTX Studio',
    slug: 'ltx-studio',
    category: 'video-generators',
    freeTier: 'Freemium',
    description:
      'LTX Studio is an AI-native visual storytelling platform for storyboard-to-video generation, scene control, and creator-first cinematic production planning.',
    websiteURL: 'https://ltx.studio',
    tags: ['AI Video', 'Storyboarding', 'Creator Tools', 'Cinematic AI', 'Launch 2026', 'US Market'],
    logo: '/logos/chatgpt.svg',
  },
  {
    name: 'Qwen 2.5 Max',
    slug: 'qwen-2-5-max',
    category: 'models-comparison',
    freeTier: 'Freemium',
    description:
      'Qwen 2.5 Max is a high-capability multilingual model focused on reasoning, coding throughput, and enterprise deployment flexibility for global teams.',
    websiteURL: 'https://qwenlm.github.io',
    tags: ['Qwen', 'LLM', 'Coding', 'Multilingual AI', 'Enterprise', 'Launch 2026', 'US Market'],
    logo: '/logos/chatgpt.svg',
  },
];

function makeSeoKeywords(blog) {
  const title = blog.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const topic = (blog.topic || '').toLowerCase().trim();
  const category = (blog.category || '').replace(/-/g, ' ').toLowerCase();
  const year = (blog.publishDate || '2026').slice(0, 4);
  const isUS = /\bus\b|\bamerican\b|\busa\b/i.test(`${blog.title} ${blog.shortDescription} ${blog.content?.intro || ''}`);

  const kws = [
    `${title} ${year}`,
    `${title} strategy`,
    `${topic || category} implementation ${year}`,
    `${topic || category} use cases ${year}`,
    `${category} workflow optimization`,
    `${category} ROI framework`,
    `${topic || category} practical guide`,
    `${topic || category} expert analysis`,
    `${category} trends ${year}`,
    `${category} comparison ${year}`,
    `${category} playbook`,
    'ultimateaitools editorial research',
  ];

  if (isUS) {
    kws.unshift(
      `${topic || category} us market ${year}`,
      `${topic || category} for us professionals`,
      `united states ${topic || category} trends`
    );
  }

  return Array.from(new Set(kws.map((k) => k.trim().toLowerCase()).filter(Boolean))).slice(0, 14);
}

let addedTools = 0;
let nextToolId = maxToolId;
for (const tool of newLaunchTools) {
  if (existingToolSlugs.has(tool.slug)) continue;
  nextToolId += 1;
  toolsData.tools.push({ ...tool, id: String(nextToolId) });
  addedTools += 1;
}

for (const blog of blogData.blogs) {
  blog.seoKeywords = makeSeoKeywords(blog);
}

fs.writeFileSync(toolsPath, JSON.stringify(toolsData, null, 2), 'utf-8');
fs.writeFileSync(blogPath, JSON.stringify(blogData, null, 2), 'utf-8');

console.log(`✅ Added new launch tools: ${addedTools}`);
console.log(`✅ Updated seoKeywords for blogs: ${blogData.blogs.length}`);
