import { MetadataRoute } from 'next';
import { blogPosts } from './blog/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

  // Generate sitemap entries for blog posts
  const blogEntries = Object.entries(blogPosts).map(([slug, post]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    ...blogEntries,
  ];
}