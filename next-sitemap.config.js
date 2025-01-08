/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.hariomstudiobilaspur.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Disable index sitemap to reduce complexity
  outDir: './public', // Ensure output directory is set correctly
  exclude: ['/api/*', '/admin/*'], // Add any paths you want to exclude
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

