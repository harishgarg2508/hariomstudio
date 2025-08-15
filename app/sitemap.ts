import { MetadataRoute } from 'next';
import { blogPosts } from './blog/data/blogPosts';
export const dynamic = 'force-static'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hariomstudiobilaspur.in';

  // Define all static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/blog',
    '/servicehome',
    '/gallery'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastmod: new Date().toISOString(),
  }));

  // Generate sitemap entries for blog posts
  const blogEntries = Object.entries(blogPosts).map(([slug, post]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastmod: new Date(post.date).toISOString(),
  }));

  return [...staticRoutes, ...blogEntries];
}