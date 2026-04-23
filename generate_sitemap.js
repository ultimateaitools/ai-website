const fs = require('fs');
const path = require('path');

const domain = 'https://ultimateaitools.online';
const toolsPerPage = 24;
const todayLastmod = new Date().toISOString().split('T')[0];

// Static pages with their own priority/changefreq tiers
const staticPages = [
    { path: '/',                         priority: '1.0', changefreq: 'daily'   },
    { path: '/ai-tools',                 priority: '0.9', changefreq: 'daily'   },
    { path: '/blog',                     priority: '0.9', changefreq: 'daily'   },
    { path: '/models',                   priority: '0.9', changefreq: 'weekly'  },
    { path: '/prompts/category',         priority: '0.9', changefreq: 'daily'   },
    { path: '/submit-tool',              priority: '0.8', changefreq: 'monthly' },
    { path: '/sitemap',                  priority: '0.7', changefreq: 'weekly'  },
    { path: '/about',                    priority: '0.6', changefreq: 'monthly' },
    { path: '/contact-us',              priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy-policy',          priority: '0.4', changefreq: 'monthly' },
    { path: '/terms-and-conditions',    priority: '0.4', changefreq: 'monthly' },
    { path: '/disclaimer',              priority: '0.4', changefreq: 'monthly' },
];

function withTrailingSlash(urlPath) {
    if (!urlPath || urlPath === '/') return '/';
    if (urlPath.endsWith('/')) return urlPath;
    if (/\.[a-z0-9]+$/i.test(urlPath)) return urlPath;
    return `${urlPath}/`;
}

function toLastmod(dateLike) {
    const date = new Date(dateLike);
    if (Number.isNaN(date.getTime())) return todayLastmod;
    return date.toISOString().split('T')[0];
}

function getFileLastmod(filename) {
    try {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
            return toLastmod(fs.statSync(filePath).mtime);
        }
    } catch (e) {
        console.error(`Error reading lastmod for ${filename}:`, e);
    }
    return todayLastmod;
}

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const addUrl = (urlPath, lastmod = todayLastmod, priority = '0.7', changefreq = 'weekly') => {
        const normalizedPath = withTrailingSlash(urlPath);
        xml += `  <url>\n`;
        xml += `    <loc>${domain}${normalizedPath}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    };

    const readJsonFile = (filename) => {
        try {
            const filePath = path.join(__dirname, filename);
            if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
        } catch (e) {
            console.error(`Error reading ${filename}:`, e);
        }
        return null;
    };

    // 1. Static pages with individual priorities
    staticPages.forEach(({ path: p, priority, changefreq }) =>
        addUrl(p, todayLastmod, priority, changefreq)
    );

    // 2. Tools
    const toolsData = readJsonFile('tools.json');
    const toolsLastmod = getFileLastmod('tools.json');
    if (toolsData && toolsData.tools) {
        // Paginated /ai-tools/N pages
        const totalPages = Math.ceil(toolsData.tools.length / toolsPerPage);
        for (let i = 2; i <= totalPages; i++) {
            addUrl(`/ai-tools/${i}`, toolsLastmod, '0.7', 'weekly');
        }

        // Individual tool detail pages
        toolsData.tools.forEach(tool =>
            addUrl(`/tools/${tool.slug}`, toolsLastmod, '0.7', 'weekly')
        );

        // Category pages from segments
        if (Array.isArray(toolsData.segments)) {
            const excludedSlugs = new Set(['directory', 'prompt-library', 'blog', 'models-comparison', 'news']);
            toolsData.segments.forEach(segment => {
                if (!segment?.slug || excludedSlugs.has(segment.slug)) return;
                addUrl(`/category/${segment.slug}`, toolsLastmod, '0.8', 'weekly');
            });
        }
    }

    // 3. Prompts
    const promptsData = readJsonFile('prompts.json');
    const promptsLastmod = getFileLastmod('prompts.json');
    if (promptsData) {
        const promptsList = Array.isArray(promptsData) ? promptsData : promptsData.prompts;
        if (Array.isArray(promptsList)) {
            // Prompt category listing pages
            const promptCategories = [...new Set(promptsList.map(p => p.category))];
            promptCategories.forEach(category =>
                addUrl(`/prompts/category/${category}`, promptsLastmod, '0.8', 'weekly')
            );
            // Individual prompt detail pages
            promptsList.forEach(prompt =>
                addUrl(`/prompts/${prompt.slug}`, promptsLastmod, '0.6', 'weekly')
            );
        }
    }

    // 4. Blog articles
    const blogsData = readJsonFile('blog.json');
    if (blogsData && blogsData.blogs) {
        blogsData.blogs.forEach(blog =>
            addUrl(`/blog/${blog.slug}`, toLastmod(blog.publishDate), '0.8', 'weekly')
        );
    }

    // 5. AI Model pages
    const modelsData = readJsonFile('models.json');
    const modelsLastmod = getFileLastmod('models.json');
    if (modelsData && modelsData.models) {
        modelsData.models.forEach(model =>
            addUrl(`/models/${model.slug}`, modelsLastmod, '0.8', 'weekly')
        );
    }

    xml += `</urlset>`;

    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`✅ sitemap.xml generated at ${sitemapPath}`);
}

generateSitemap();
