const fs = require('fs');

const domains = [
  {
    label: 'SEO Content',
    slug: 'seo-content',
    category: 'marketing',
    audience: 'SEO Specialists',
    role: 'SEO Content Strategist',
    context: 'Organic traffic growth for informational and commercial intent keywords',
    objective: 'rank useful content and improve topical authority',
  },
  {
    label: 'Social Media',
    slug: 'social-media',
    category: 'social-media',
    audience: 'Social Media Managers',
    role: 'Social Content Strategist',
    context: 'Multi-platform publishing for LinkedIn, Instagram, YouTube Shorts, and X',
    objective: 'improve reach, saves, shares, and click-through rate',
  },
  {
    label: 'Email Marketing',
    slug: 'email-marketing',
    category: 'marketing',
    audience: 'Email Marketers',
    role: 'Lifecycle Email Strategist',
    context: 'Newsletter and automation workflows for subscribers and customers',
    objective: 'increase opens, clicks, and conversions',
  },
  {
    label: 'Sales Outreach',
    slug: 'sales-outreach',
    category: 'business',
    audience: 'Sales Teams',
    role: 'B2B Sales Copywriter',
    context: 'Cold outbound and follow-up communication for lead generation',
    objective: 'book qualified meetings and improve response rates',
  },
  {
    label: 'Customer Support',
    slug: 'customer-support',
    category: 'business',
    audience: 'Support Agents',
    role: 'Customer Support Specialist',
    context: 'Ticket handling with fast, empathetic, and policy-safe responses',
    objective: 'reduce response time and improve CSAT',
  },
  {
    label: 'Business Operations',
    slug: 'business-ops',
    category: 'productivity',
    audience: 'Operations Managers',
    role: 'Operations Analyst',
    context: 'SOPs, reports, internal communication, and process automation',
    objective: 'improve execution speed and consistency',
  },
  {
    label: 'Software Development',
    slug: 'software-development',
    category: 'coding',
    audience: 'Software Developers',
    role: 'Senior Software Engineer',
    context: 'Code implementation, debugging, testing, and architecture decisions',
    objective: 'ship reliable software faster',
  },
  {
    label: 'Data Analysis',
    slug: 'data-analysis',
    category: 'coding',
    audience: 'Data Analysts',
    role: 'Data Analyst',
    context: 'Data cleaning, exploratory analysis, dashboards, and insights reporting',
    objective: 'produce clear, decision-ready insights',
  },
  {
    label: 'Study and Exams',
    slug: 'study-exams',
    category: 'study',
    audience: 'Students',
    role: 'Academic Mentor',
    context: 'Concept understanding, revision planning, and exam preparation',
    objective: 'improve retention and scores',
  },
  {
    label: 'Career Growth',
    slug: 'career-growth',
    category: 'productivity',
    audience: 'Job Seekers',
    role: 'Career Coach',
    context: 'Resume, interview prep, portfolio storytelling, and job applications',
    objective: 'increase interview opportunities',
  },
  {
    label: 'Ecommerce',
    slug: 'ecommerce',
    category: 'business',
    audience: 'Ecommerce Owners',
    role: 'Ecommerce Growth Specialist',
    context: 'Product pages, ad copy, email campaigns, and conversion optimization',
    objective: 'improve sales and average order value',
  },
  {
    label: 'Creative Design',
    slug: 'creative-design',
    category: 'image-generation',
    audience: 'Designers and Creators',
    role: 'Creative Director',
    context: 'Image prompt engineering, brand visuals, concept art, and thumbnails',
    objective: 'generate high-quality visual assets with consistency',
  },
];

const templates = [
  { key: 'strategy-blueprint', title: 'Strategy Blueprint Generator', outputType: 'Strategy Document' },
  { key: 'step-by-step-plan', title: 'Step-by-Step Action Plan', outputType: 'Execution Plan' },
  { key: 'beginner-guide', title: 'Beginner-Friendly Guide Writer', outputType: 'Guide' },
  { key: 'advanced-playbook', title: 'Advanced Playbook Builder', outputType: 'Playbook' },
  { key: 'checklist-builder', title: 'Quality Checklist Builder', outputType: 'Checklist' },
  { key: 'mistake-finder', title: 'Common Mistakes Analyzer', outputType: 'Analysis' },
  { key: 'swot-analysis', title: 'SWOT Analysis Assistant', outputType: 'SWOT Report' },
  { key: 'competitor-breakdown', title: 'Competitor Breakdown Prompt', outputType: 'Competitor Report' },
  { key: 'content-calendar', title: '30-Day Content Calendar Prompt', outputType: 'Content Calendar' },
  { key: 'kpi-framework', title: 'KPI Framework Generator', outputType: 'Metric Framework' },
  { key: 'workflow-optimizer', title: 'Workflow Optimization Prompt', outputType: 'Workflow Plan' },
  { key: 'idea-generator', title: 'High-Impact Idea Generator', outputType: 'Idea List' },
  { key: 'hook-generator', title: 'Hook and Angle Generator', outputType: 'Hook List' },
  { key: 'headline-generator', title: 'Headline and Title Generator', outputType: 'Headline Pack' },
  { key: 'script-writer', title: 'Script and Outline Writer', outputType: 'Script' },
  { key: 'qa-prep', title: 'Question and Answer Prep Prompt', outputType: 'Q&A Set' },
  { key: 'template-builder', title: 'Reusable Template Builder', outputType: 'Template' },
  { key: 'email-sequence', title: 'Email Sequence Generator', outputType: 'Email Sequence' },
  { key: 'landing-page-copy', title: 'Landing Page Copy Prompt', outputType: 'Landing Page Copy' },
  { key: 'case-study-writer', title: 'Case Study Draft Prompt', outputType: 'Case Study' },
  { key: 'summary-optimizer', title: 'Smart Summary Optimizer', outputType: 'Summary' },
  { key: 'rewrite-enhancer', title: 'Rewrite and Clarity Enhancer', outputType: 'Rewritten Text' },
  { key: 'tone-adapter', title: 'Tone Adaptation Prompt', outputType: 'Tone-Adjusted Copy' },
  { key: 'faq-generator', title: 'FAQ Generator Prompt', outputType: 'FAQ' },
  { key: 'objection-handler', title: 'Objection Handling Prompt', outputType: 'Response Script' },
  { key: 'roadmap-builder', title: 'Roadmap Builder Prompt', outputType: 'Roadmap' },
  { key: 'report-generator', title: 'Professional Report Generator', outputType: 'Report' },
  { key: 'prompt-refiner', title: 'Prompt Refiner and Critique Tool', outputType: 'Prompt Improvement' },
  { key: 'audit-framework', title: 'Audit Framework Prompt', outputType: 'Audit Report' },
  { key: 'decision-matrix', title: 'Decision Matrix Prompt', outputType: 'Decision Matrix' },
];

function titleCase(value) {
  return value.replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function buildPromptText(domain, template) {
  return `You are a ${domain.role}.\n\nTask:\nCreate a ${template.outputType.toLowerCase()} for ${domain.label.toLowerCase()} that helps ${domain.audience.toLowerCase()} ${domain.objective}.\n\nProject Context:\n- Business/Project: [Describe your project or brand]\n- Audience: [Who is the target audience]\n- Current Stage: [Beginner / Growth / Advanced]\n- Constraints: [Time, budget, compliance, tools]\n- Priority Goal: [Primary business or academic outcome]\n\nInstructions:\n1) Ask up to 5 clarifying questions if information is missing.\n2) Build the output using practical, real-world steps.\n3) Include assumptions clearly if any input is missing.\n4) Provide both quick-win actions and long-term strategy.\n5) Keep advice specific, measurable, and implementation-focused.\n\nModel Compatibility Notes:\n- ChatGPT: Favor concise sections and actionable bullets.\n- Gemini: Include references to docs/workspace integration when relevant.\n- Claude: Add deeper reasoning and edge-case handling.\n- Grok: Keep language direct and practical with clear tradeoffs.\n\nOutput Format:\nA) Executive Summary (5-7 lines)\nB) Structured ${template.outputType} (numbered steps)\nC) Common Pitfalls and How to Avoid Them\nD) KPI/Success Metrics to Track\nE) 7-Day Action Plan\n\nQuality Checklist:\n- No generic fluff\n- No unverifiable claims\n- Clear, safe, and policy-compliant wording\n- Ready to use without major rewriting`;
}

const prompts = [];
let index = 1;

for (const domain of domains) {
  for (const template of templates) {
    const title = `${domain.label} - ${template.title}`;
    const slug = slugify(`${domain.slug}-${template.key}`);
    prompts.push({
      id: String(index),
      title,
      slug,
      category: domain.category,
      description: `High-quality ${template.outputType.toLowerCase()} prompt for ${domain.label.toLowerCase()} workflows. Works with ChatGPT, Gemini, Claude, and Grok.`,
      promptText: buildPromptText(domain, template),
      outputType: template.outputType,
      bestFor: titleCase(domain.audience),
    });
    index += 1;
  }
}

fs.writeFileSync('prompts.json', JSON.stringify({ prompts }, null, 2));
console.log(`prompts.json generated with ${prompts.length} prompts.`);
