/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.busiman.org',
    generateRobotsTxt: true, // robots.txt bhi auto-generate ho jayega
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*', '/api/*', '/icon.png', '/reports/*'], // private/API/non-page routes
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
      additionalSitemaps: [
        'https://www.busiman.org/sitemap.xml',
      ],
    },
  }