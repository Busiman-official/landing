import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocParams } from "@/lib/docs";
import { getLegalPage } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

// `lastModified` is only set where the content carries a real date (blog posts and legal pages).
// The old generator stamped every URL with the build time, which teaches crawlers to ignore the
// field. Pages with no trustworthy date simply omit it.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const privacy = getLegalPage("privacy-policy");
  const terms = getLegalPage("terms");
  const deleteAccount = getLegalPage("delete-account");

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/features") },
    { url: absoluteUrl("/features/field-service-management") },
    { url: absoluteUrl("/docs") },
    { url: absoluteUrl("/blog"), lastModified: posts[0]?.date },
    { url: absoluteUrl("/privacy-policy"), lastModified: privacy.updated },
    { url: absoluteUrl("/terms"), lastModified: terms.updated },
    { url: absoluteUrl("/delete-account"), lastModified: deleteAccount.updated },
  ];

  const docPages: MetadataRoute.Sitemap = getAllDocParams().map(
    ({ category, slug }) => ({
      url: absoluteUrl(`/docs/${category}/${slug}`),
    }),
  );

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
  }));

  return [...staticPages, ...docPages, ...postPages];
}
