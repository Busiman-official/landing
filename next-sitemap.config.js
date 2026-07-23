/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.busiman.org',
    generateRobotsTxt: true, // robots.txt bhi auto-generate ho jayega
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*', '/api/*'], // agar koi private/API routes hai jo index nahi karne
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
      additionalSitemaps: [
        'https://www.busiman.org/sitemap.xml',
      ],
    },
  }