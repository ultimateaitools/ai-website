const fs = require('fs');
const path = require('path');

const domain = 'https://ultimateaitools.online';

const staticPages = [
    '/',
    '/ai-tools',
    '/prompts',
    '/blog',
    '/models',
    '/submit-tool',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
    '/contact-us'
];
const toolsPerPage = 24;

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Function to add a URL to the XML
    const addUrl = (urlPath) => {
        xml += `  <url>\n`;
        xml += `    <loc>${domain}${urlPath}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    };

    // 1. Add static pages
    staticPages.forEach(page => addUrl(page));

    // Helper to read and parse JSON
    const readJsonFile = (filename) => {
        try {
            const filePath = path.join(__dirname, filename);
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(fileContent);
            }
        } catch (e) {
            console.error(`Error reading ${filename}:`, e);
        }
        return null;
    };

    // 2. Add dynamic tools
    const toolsData = readJsonFile('tools.json');
    if (toolsData && toolsData.tools) {
        toolsData.tools.forEach(tool => addUrl(`/tools/${tool.slug}`));

        // Paginated ai-tools pages
        const totalPages = Math.ceil(toolsData.tools.length / toolsPerPage);
        for (let i = 2; i <= totalPages; i++) {
            addUrl(`/ai-tools/${i}`);
        }

        // Category pages from segments
        if (Array.isArray(toolsData.segments)) {
            toolsData.segments.forEach(segment => {
                if (!segment?.slug) return;
                if (segment.slug === 'directory' || segment.slug === 'prompt-library' || segment.slug === 'blog' || segment.slug === 'models-comparison') return;
                addUrl(`/category/${segment.slug}`);
            });
        }
    }

    // 3. Add dynamic prompts
    const promptsData = readJsonFile('prompts.json');
    if (promptsData) {
        const promptsList = Array.isArray(promptsData) ? promptsData : promptsData.prompts;
        if (Array.isArray(promptsList)) {
            promptsList.forEach(prompt => addUrl(`/prompts/${prompt.slug}`));
        }
    }

    // 4. Add dynamic blogs
    const blogsData = readJsonFile('blog.json');
    if (blogsData && blogsData.blogs) {
        blogsData.blogs.forEach(blog => addUrl(`/blog/${blog.slug}`));
    }

    // 5. Add dynamic models
    const modelsData = readJsonFile('models.json');
    if (modelsData && modelsData.models) {
        modelsData.models.forEach(model => addUrl(`/models/${model.slug}`));
    }

    xml += `</urlset>`;

    // Write to public/sitemap.xml
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`Successfully generated sitemap.xml at ${sitemapPath} with all static and dynamic routes.`);
}

generateSitemap();
