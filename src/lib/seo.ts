export const SITE_URL = 'https://ultimateaitools.online';
export const SITE_NAME = 'UltimateAITools';

export function formatSlugLabel(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function truncateAtWord(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  const cut = value.lastIndexOf(' ', maxLength - 3);
  return (cut > 20 ? value.slice(0, cut) : value.slice(0, maxLength - 3)).trim() + '...';
}

type CategoryIntent = {
  audience: string;
  job: string;
  comparisonAngle: string;
  decisionHint: string;
  faq: { q: string; a: string }[];
};

const categoryIntentMap: Record<string, CategoryIntent> = {
  'writing-tools': {
    audience: 'writers, marketers, students, and founders',
    job: 'drafting, rewriting, editing, outlining, and publishing better content faster',
    comparisonAngle: 'output quality, tone control, plagiarism safeguards, SEO support, and free-plan limits',
    decisionHint: 'Choose tools that match your writing workflow instead of picking the longest feature list.',
    faq: [
      { q: 'What makes an AI writing tool worth using?', a: 'The best AI writing tools improve drafts, preserve your voice, support editing, and reduce blank-page time without requiring heavy cleanup.' },
      { q: 'Are free AI writing tools enough?', a: 'Free plans are enough for brainstorming, short drafts, rewriting, and student use. Paid plans matter when you need brand voice, team workflows, or high-volume content.' },
    ],
  },
  coding: {
    audience: 'developers, indie builders, and technical teams',
    job: 'writing code, debugging errors, explaining repositories, generating tests, and speeding up implementation',
    comparisonAngle: 'IDE support, code quality, context awareness, security controls, and language coverage',
    decisionHint: 'Start with the tool that fits your editor and stack, then test it on your real codebase.',
    faq: [
      { q: 'Which AI coding tool should beginners start with?', a: 'Beginners should start with tools that explain code clearly, show examples, and integrate with a familiar editor.' },
      { q: 'Can AI coding tools replace developers?', a: 'No. They speed up repetitive work and first drafts, but developers still need to review logic, security, architecture, and edge cases.' },
    ],
  },
  'developer-tools': {
    audience: 'developers, API builders, and engineering teams',
    job: 'building, testing, searching, documenting, and shipping AI-assisted software workflows',
    comparisonAngle: 'API access, reliability, integration options, documentation quality, and pricing predictability',
    decisionHint: 'Prioritize tools that fit your deployment workflow and reduce engineering handoffs.',
    faq: [
      { q: 'What should developers compare first?', a: 'Compare integration quality, API limits, latency, documentation, and how well the tool handles your existing stack.' },
      { q: 'Are developer AI tools safe for production code?', a: 'They can help, but production use still requires review, testing, dependency checks, and security validation.' },
    ],
  },
  'image-generators': {
    audience: 'designers, creators, marketers, and ecommerce teams',
    job: 'creating images, product visuals, ads, thumbnails, concept art, and brand assets from text prompts',
    comparisonAngle: 'image quality, prompt control, editing tools, commercial rights, speed, and free credits',
    decisionHint: 'Pick based on the kind of visuals you actually publish: realistic, illustrative, product, or social-first.',
    faq: [
      { q: 'What matters most in an AI image generator?', a: 'Prompt control, editing flexibility, output consistency, licensing clarity, and the number of usable images per free plan matter most.' },
      { q: 'Can AI image generators be used commercially?', a: 'Some allow commercial use and some restrict it. Always check the tool license before publishing client or brand work.' },
    ],
  },
  'video-generators': {
    audience: 'creators, marketers, educators, and video teams',
    job: 'turning scripts, prompts, images, or long-form content into short videos and visual stories',
    comparisonAngle: 'motion quality, avatar support, editing controls, export limits, watermark rules, and rendering speed',
    decisionHint: 'For social content, prioritize workflow speed; for brand videos, prioritize control and export quality.',
    faq: [
      { q: 'Are free AI video tools useful?', a: 'Free AI video tools are useful for testing ideas, short clips, and prototypes. Paid plans usually unlock longer exports, fewer watermarks, and better control.' },
      { q: 'Which AI video tool is best?', a: 'The best option depends on your workflow: avatars, text-to-video, repurposing, animation, or editing.' },
    ],
  },
  productivity: {
    audience: 'busy professionals, students, freelancers, and teams',
    job: 'summarizing information, planning work, organizing tasks, automating notes, and reducing manual admin',
    comparisonAngle: 'ease of use, integrations, privacy, collaboration features, and how quickly it saves time',
    decisionHint: 'Choose the tool that removes a repeated task you already do every week.',
    faq: [
      { q: 'How do AI productivity tools save time?', a: 'They reduce repetitive tasks such as summarizing, planning, note-taking, drafting, searching, and organizing information.' },
      { q: 'What is the easiest AI productivity tool to start with?', a: 'Start with a tool that fits your existing workspace, such as notes, calendar, documents, browser, or email.' },
    ],
  },
  'marketing-tools': {
    audience: 'marketers, creators, founders, and growth teams',
    job: 'planning campaigns, writing copy, improving SEO, creating ads, analyzing audiences, and scaling content',
    comparisonAngle: 'SEO features, brand voice, campaign workflows, analytics, integrations, and content quality',
    decisionHint: 'Choose tools around a clear channel: SEO, ads, email, social, or content operations.',
    faq: [
      { q: 'Can AI marketing tools improve SEO?', a: 'They can speed up keyword research, briefs, outlines, meta tags, and content refreshes, but rankings still need original insight and strong pages.' },
      { q: 'Are AI marketing tools good for small businesses?', a: 'Yes. They help small teams create more campaigns, test ideas faster, and reduce reliance on large content teams.' },
    ],
  },
  'study-tools': {
    audience: 'students, exam aspirants, teachers, and lifelong learners',
    job: 'summarizing notes, explaining topics, making quizzes, planning revision, and preparing for exams',
    comparisonAngle: 'accuracy, explanation quality, subject support, revision features, and student-friendly pricing',
    decisionHint: 'Pick tools that explain concepts and test recall, not just tools that rewrite notes.',
    faq: [
      { q: 'Are AI study tools reliable?', a: 'They are helpful for explanations, summaries, and practice, but students should verify facts for exams and academic submissions.' },
      { q: 'What should students use AI for?', a: 'Students should use AI for revision plans, explanations, practice questions, notes, and feedback instead of copying final answers blindly.' },
    ],
  },
  'automation-tools': {
    audience: 'operators, founders, agencies, and small teams',
    job: 'connecting apps, triggering workflows, moving data, sending alerts, and reducing repetitive operations',
    comparisonAngle: 'supported apps, workflow complexity, reliability, logging, AI steps, and monthly task limits',
    decisionHint: 'Start with one painful recurring process, then automate it end to end.',
    faq: [
      { q: 'What can AI automation tools automate?', a: 'They can automate email routing, lead capture, reporting, content publishing, data cleanup, notifications, and customer workflows.' },
      { q: 'Do automation tools require coding?', a: 'Many tools are no-code or low-code, though complex workflows may still need technical setup and testing.' },
    ],
  },
  'business-tools': {
    audience: 'founders, managers, sales teams, and operations leaders',
    job: 'planning strategy, writing documents, analyzing data, improving sales workflows, and speeding up decisions',
    comparisonAngle: 'business use cases, collaboration, data handling, templates, reporting features, and cost',
    decisionHint: 'Choose tools that improve a measurable workflow such as sales, support, reporting, or planning.',
    faq: [
      { q: 'How can businesses use AI tools safely?', a: 'Businesses should start with low-risk workflows, review outputs, protect customer data, and document where AI is used.' },
      { q: 'Which AI business tools matter most?', a: 'The highest-impact tools usually improve customer support, sales, content, reporting, research, and internal operations.' },
    ],
  },
};

const defaultIntent: CategoryIntent = {
  audience: 'professionals, students, creators, and small teams',
  job: 'finishing practical AI-assisted work faster with less manual effort',
  comparisonAngle: 'free-plan value, output quality, ease of use, integrations, reliability, and fit for the use case',
  decisionHint: 'Shortlist two or three tools and test them on the same real task before choosing.',
  faq: [
    { q: 'How should I choose the right AI tool?', a: 'Start with the exact task you want to improve, then compare output quality, workflow fit, free limits, privacy, and pricing.' },
    { q: 'Are free AI tools enough for daily work?', a: 'Free AI tools are often enough for testing, learning, and light workflows. Paid plans matter when you need volume, collaboration, or advanced controls.' },
  ],
};

export function getCategoryIntent(slug: string): CategoryIntent {
  return categoryIntentMap[slug] || defaultIntent;
}

export function makeToolSeoTitle(name: string, freeTier: string, categorySlug: string): string {
  const category = formatSlugLabel(categorySlug);
  const pricing = freeTier.toLowerCase() === 'free' ? 'Free' : freeTier;
  return truncateAtWord(`${name} Review: ${pricing} ${category} AI Tool`, 60);
}

export function makeToolSeoDescription(name: string, description: string, freeTier: string, categorySlug: string): string {
  const category = formatSlugLabel(categorySlug).toLowerCase();
  const pricing = freeTier.toLowerCase() === 'free' ? 'free plan' : `${freeTier.toLowerCase()} access`;
  return truncateAtWord(`${name} is a ${category} AI tool with ${pricing}. ${description}`, 155);
}

export function makePromptSeoTitle(title: string, categorySlug: string): string {
  const category = formatSlugLabel(categorySlug);
  const core = title.toLowerCase().includes('prompt') ? title : `${title} Prompt`;
  return truncateAtWord(`${core} for ${category}`, 60);
}

export function makePromptSeoDescription(title: string, description: string, categorySlug: string): string {
  const category = formatSlugLabel(categorySlug).toLowerCase();
  return truncateAtWord(`Copy-paste ${category} AI prompt for ${title.toLowerCase()}. ${description}`, 155);
}

export function makeCategorySeoTitle(categoryName: string): string {
  return truncateAtWord(`${categoryName} AI Tools: Compare Free and Paid Options`, 60);
}

export function makeCategorySeoDescription(categoryName: string, slug: string): string {
  const intent = getCategoryIntent(slug);
  return truncateAtWord(`Compare ${categoryName.toLowerCase()} AI tools for ${intent.job}. Find free plans, use cases, and practical options by workflow.`, 155);
}
