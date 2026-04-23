/**
 * Fix blog SEO — truncate titles and shortDescriptions to Google limits
 * Also update new blog titles to be more concise/SEO-friendly
 */
const fs = require('fs');
const path = require('path');

const blogsFile = path.join(__dirname, 'blog.json');
const data = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));

// SEO-optimised title overrides for new blogs (keep under 58 chars)
const titleOverrides = {
  'gpt-5-review-what-it-can-do-2026':                    'GPT-5 Review 2026: What It Can Actually Do',
  'vibe-coding-guide-ai-development-2026':               'Vibe Coding Guide: Build Apps With AI in 2026',
  'best-free-ai-tools-freelancers-2026':                 'Best Free AI Tools for Freelancers 2026',
  'claude-opus-4-6-vs-gpt-5-comparison-2026':            'Claude Opus 4.6 vs GPT-5: Which to Use in 2026',
  'best-ai-tools-for-students-free-2026':                'Best Free AI Tools for Students 2026',
  'google-ai-overviews-seo-impact-2026':                 'Google AI Overviews: SEO Impact & What To Do',
  'best-ai-image-generators-2026-comparison':            'Best AI Image Generators 2026: Full Comparison',
  'ai-automation-tools-save-time-2026':                  'AI Automation Tools 2026: Save 10+ Hours/Week',
  'deepseek-r2-review-openai-comparison-2026':           'DeepSeek R2 vs OpenAI: Honest Analysis 2026',
  'best-ai-video-generators-2026-sora-kling-runway':     'Best AI Video Generators 2026: Sora vs Kling',
  'how-to-use-chatgpt-for-seo-2026-guide':               'How to Use ChatGPT for SEO in 2026 (Guide)',
  'ai-agents-guide-autonomous-workflows-2026':           'AI Agents 2026: Guide to Autonomous Workflows',
  'best-ai-writing-tools-comparison-2026':               'Best AI Writing Tools 2026: Full Comparison',
  'gemini-2-5-pro-review-real-world-test-2026':          "Gemini 2.5 Pro Review 2026: Real World Test",
};

// SEO-optimised description overrides (under 155 chars)
const descOverrides = {
  'gpt-5-review-what-it-can-do-2026':
    'GPT-5 is here. We tested it on writing, coding, and reasoning to tell you exactly what changed and whether upgrading from GPT-4o is worth it.',
  'vibe-coding-guide-ai-development-2026':
    'Vibe coding — building apps by prompting AI — went from a meme to a real workflow in 2026. Here is how it works and which tools make it possible.',
  'best-free-ai-tools-freelancers-2026':
    'Free AI tools are helping freelancers work faster and earn more in 2026. Here is the exact stack working across writing, design, and development.',
  'claude-opus-4-6-vs-gpt-5-comparison-2026':
    'Claude Opus 4.6 vs GPT-5: both are excellent but for different tasks. Here is our honest comparison based on real-world writing and coding tests.',
  'best-ai-tools-for-students-free-2026':
    'Free AI tools are transforming how students study in 2026. This guide covers the best tools for research, writing, exam prep, and note-taking.',
  'google-ai-overviews-seo-impact-2026':
    'Google AI Overviews now show on most searches. Here is what the traffic data shows is working for SEO right now and what changes to make today.',
  'best-ai-image-generators-2026-comparison':
    'We compared 10 AI image generators on quality, speed, and pricing. Here are the honest verdicts on Midjourney, Flux, DALL-E 3, and more.',
  'ai-automation-tools-save-time-2026':
    'AI automation tools in 2026 can handle email, social posting, lead gen, and reporting automatically. Here are workflows saving 10+ hours per week.',
  'deepseek-r2-review-openai-comparison-2026':
    'DeepSeek R2 matches GPT-5 on several benchmarks at a fraction of the cost. Here is what this means for AI competition and whether to use it.',
  'best-ai-video-generators-2026-sora-kling-runway':
    'Sora, Kling, Runway, and Pika are all producing usable video in 2026. We compare them on quality, pricing, and use case fit with honest verdicts.',
  'how-to-use-chatgpt-for-seo-2026-guide':
    'ChatGPT is the most powerful free SEO assistant in 2026 — if you use the right prompts. This guide covers keyword research, briefs, and meta tags.',
  'ai-agents-guide-autonomous-workflows-2026':
    'AI agents can now browse, code, and complete tasks without human oversight. This guide explains what they can do, what fails, and which tools work.',
  'best-ai-writing-tools-comparison-2026':
    'We tested Jasper, Claude, Rytr, Writesonic, and Copy.ai on real content tasks. Here are the honest verdicts and which tool wins for each use case.',
  'gemini-2-5-pro-review-real-world-test-2026':
    "Gemini 2.5 Pro has a 2M token context window and strong multimodal skills. We tested it vs GPT-5 and Claude to see if it's finally worth switching.",
};

let fixed = 0;
data.blogs = data.blogs.map(blog => {
  let changed = false;
  if (titleOverrides[blog.slug]) {
    blog.title = titleOverrides[blog.slug];
    changed = true;
  }
  if (descOverrides[blog.slug]) {
    blog.shortDescription = descOverrides[blog.slug];
    changed = true;
  }
  // Auto-truncate any remaining over-length titles (non-overridden old blogs)
  if (blog.title.length > 60 && !titleOverrides[blog.slug]) {
    const cut = blog.title.lastIndexOf(' ', 57);
    if (cut > 15) blog.title = blog.title.slice(0, cut) + '...';
    changed = true;
  }
  // Auto-truncate any remaining over-length descriptions
  if (blog.shortDescription.length > 155 && !descOverrides[blog.slug]) {
    const cut = blog.shortDescription.lastIndexOf(' ', 152);
    if (cut > 50) blog.shortDescription = blog.shortDescription.slice(0, cut) + '...';
    changed = true;
  }
  if (changed) fixed++;
  return blog;
});

fs.writeFileSync(blogsFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ Fixed ${fixed} blog entries`);

// Verify results
console.log('\n=== TITLE LENGTH AUDIT ===');
let titleFails = 0, descFails = 0;
data.blogs.forEach(b => {
  if (b.title.length > 60) { console.log(`  TITLE TOO LONG (${b.title.length}): ${b.title}`); titleFails++; }
  if (b.shortDescription.length > 155) { console.log(`  DESC TOO LONG (${b.shortDescription.length}): ${b.slug}`); descFails++; }
});
if (titleFails === 0) console.log('  ✅ All titles under 60 chars');
if (descFails === 0) console.log('  ✅ All descriptions under 155 chars');
