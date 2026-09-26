import { MetadataRoute } from 'next';
import { siteConfig } from '../data/site';
import { getPostSlugs } from '../lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/airports', '/blog', '/compare', '/topics', '/faq', '/about', '/privacy', '/disclaimer'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' || route === '/airports' ? 1 : 0.8,
  }));

  const blogSlugs = getPostSlugs('blog');
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug.replace(/\.mdx$/, '')}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const airportSlugs = getPostSlugs('airports');
  const airportRoutes = airportSlugs.map((slug) => ({
    url: `${siteConfig.url}/airports/${slug.replace(/\.mdx$/, '')}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const topicSlugs = getPostSlugs('topics');
  const topicRoutes = topicSlugs.map((slug) => ({
    url: `${siteConfig.url}/topics/${slug.replace(/\.mdx$/, '')}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...routes, ...blogRoutes, ...airportRoutes, ...topicRoutes];
}
