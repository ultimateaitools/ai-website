import { MetadataRoute } from 'next';
import { 
  getData, 
  getPromptsData, 
  getBlogsData, 
  getModelsData,
  getSegments,
  getPromptCategories
} from '@/lib/data';

const BASE_URL = 'https://ultimateaitools.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapUrls: MetadataRoute.Sitemap = [];
  
  // Helper to ensure trailing slash
  const urlWithSlash = (path: string) => `${BASE_URL}${path}${path.endsWith('/') ? '' : '/'}`;
  
  // Static Routes
  const staticRoutes = [
    '',
    '/blog',
    '/prompts',
    '/prompts/category',
    '/category',
    '/directory',
    '/models',
    '/models-comparison',
    '/about',
    '/contact-us',
    '/submit-tool',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer'
  ];

  staticRoutes.forEach(route => {
    sitemapUrls.push({
      url: urlWithSlash(route),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Tools
  const { tools } = getData();
  tools.forEach(tool => {
    sitemapUrls.push({
      url: urlWithSlash(`/tools/${tool.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Tool Categories
  const segments = getSegments();
  segments.forEach(segment => {
    sitemapUrls.push({
      url: urlWithSlash(`/category/${segment.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Prompts
  const { prompts } = getPromptsData();
  prompts.forEach(prompt => {
    sitemapUrls.push({
      url: urlWithSlash(`/prompts/${prompt.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Prompt Categories
  const promptCategories = getPromptCategories();
  promptCategories.forEach(category => {
    sitemapUrls.push({
      url: urlWithSlash(`/prompts/category/${category.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Blogs
  const { blogs } = getBlogsData();
  blogs.forEach(blog => {
    let blogDate = new Date();
    if (blog.publishDate) {
      const parsedDate = new Date(blog.publishDate);
      if (!isNaN(parsedDate.getTime())) {
        blogDate = parsedDate;
      }
    }

    sitemapUrls.push({
      url: urlWithSlash(`/blog/${blog.slug}`),
      lastModified: blogDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Models
  const { models } = getModelsData();
  models.forEach(model => {
    sitemapUrls.push({
      url: urlWithSlash(`/models/${model.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemapUrls;
}
