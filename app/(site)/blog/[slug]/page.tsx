import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { blogPath, r } from "@/lib/routes";
import { blogPhoto } from "../photos";
import s from "./page.module.css";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: blogPath(post.slug),
    type: "article",
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      images: [post.image ?? "/opengraph-image"],
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const photo = blogPhoto(post.slug, post.image);
  const others = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);
  const toc = post.headings.filter((h) => h.level === 2);

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-IN",
    mainEntityOfPage: absoluteUrl(blogPath(post.slug)),
    image: post.image ? absoluteUrl(post.image) : absoluteUrl("/opengraph-image"),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <JsonLd data={postJsonLd} />
      <Crumbs
        trail={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: blogPath(post.slug) },
        ]}
      />

      <article>
        <div className="sec" style={{ paddingTop: 24, paddingBottom: 40 }}>
          <div
            className="wrap stack"
            style={{ gap: 22, maxWidth: 960, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}
          >
            <span className="eyebrow">Blog</span>
            <h1 className="d2" style={{ fontSize: "clamp(26px, 4.6vw, 52px)", lineHeight: 1.1, maxWidth: 900 }}>{post.title}</h1>
            <div className={s.meta}>
              <span className="tag">Blog</span>
              <span>By the Busiman team</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: 40 }}>
          <div className="wrap">
            <Photo src={photo.src} alt={photo.alt} height={380} pos="center 40%" priority sizes="(max-width: 1200px) 100vw, 1200px" />
          </div>
        </div>

        <div style={{ paddingBottom: 88 }}>
          <div className={`wrap ${s.art}`}>
            {toc.length > 0 ? (
              <aside className={s.toc} aria-label="On this page">
                <span className="eyebrow">On this page</span>
                <ol>
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </aside>
            ) : (
              <div />
            )}

            <div className="prose" style={{ maxWidth: 720 }} dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>

        <div className="sec on-dark" style={{ padding: "72px 0" }}>
          <div className="wrap split">
            <div className="stack" style={{ gap: 18 }}>
              <h2 className="d2">Try it on your own business.</h2>
              <p className="lead">Start free on your phone, or ask us for a walkthrough.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link className="btn btn-amber" href={r("Features")}>
                  See features
                </Link>
                <Link className="btn btn-line" href={r("Signup")}>
                  Start free
                </Link>
              </div>
            </div>
            <Photo
              src="/img/warehouse-shelves.jpg"
              alt="Warehouse aisles with boxes on shelves"
              height={260}
              style={{ borderColor: "var(--amber)" }}
            />
          </div>
        </div>
      </article>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 24 }}>
          <h2 className="d3">Keep reading</h2>
          <div className={s.rel}>
            {others.map((p) => (
              <Link key={p.slug} className="card" href={blogPath(p.slug)} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="eyebrow">Blog</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </Link>
            ))}
            <Link className="card" href={r("GlossaryHub")} style={{ textDecoration: "none", color: "inherit" }}>
              <span className="eyebrow">Glossary</span>
              <h3>Business terms in plain words</h3>
              <p>Browse and search every definition.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

