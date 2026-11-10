import Link from "next/link";
import Image from "next/image";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { getAllPosts } from "@/lib/blog";
import { blogPath, r } from "@/lib/routes";
import { blogPhoto } from "./photos";
import s from "./page.module.css";

const DESCRIPTION =
  "Plain-language reading on billing, stock, attendance, payroll and service work, written by the Busiman team for people who run a shop or a team.";

export const metadata = pageMetadata({
  title: "Busiman blog: guides and how-tos for shops and teams",
  description: DESCRIPTION,
  path: "/blog",
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogHubPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={webPageLd({ type: "CollectionPage", name: "Busiman blog", description: DESCRIPTION, path: "/blog" })}
      />
      <Crumbs trail={[{ name: "Blog", path: "/blog" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">The Busiman blog</span>
            <h1 className="d1">Guides and how-tos for running a shop or a team.</h1>
            <p className="lead">
              Plain-language reading on billing, stock, attendance, payroll and service work, written by the Busiman
              team.
            </p>
            <div className={s.note}>Start with the guides. More will be added here.</div>
          </div>
          <Photo
            src="/img/ledger-desk.jpg"
            alt="A man at home with a calculator and a notebook"
            height={340}
            priority
          />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 16 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className={`g3 ${s.pgrid}`}>
            {posts.map((p) => {
              const photo = blogPhoto(p.slug, p.image);
              return (
                <Link key={p.slug} className={s.pcard} href={blogPath(p.slug)}>
                  <Image src={photo.src} alt={photo.alt} width={800} height={533} sizes="(max-width: 560px) 100vw, 400px" />
                  <div className={s.pb}>
                    <span className="tag" style={{ alignSelf: "flex-start" }}>
                      {formatDate(p.date)} · {p.readingTime} min read
                    </span>
                    <h2 style={{ fontSize: 22 }}>{p.title}</h2>
                    <p>{p.excerpt}</p>
                    <span className={s.go}>Read →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Want to see it working</span>
            <h2 className="d2">Read about it, then try it on your own stock.</h2>
            <p className="lead">Start free on your phone, or ask us for a walkthrough.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>
                Start free
              </Link>
              <Link className="btn btn-line" href={r("BookDemo")}>
                Book a demo
              </Link>
            </div>
          </div>
          <Photo
            src="/img/team-india.jpg"
            alt="Four colleagues talking in an office"
            height={280}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>
    </>
  );
}

