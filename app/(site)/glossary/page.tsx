import Link from "next/link";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { glossaryPath, r } from "@/lib/routes";
import { GlossarySearch } from "./GlossarySearch";

const DESCRIPTION =
  "Short definitions of the words you meet in Busiman, each tied to how the app uses it. They explain the idea, not the law.";

export const metadata = pageMetadata({
  title: "Business glossary: terms in plain language",
  description: DESCRIPTION,
  path: "/glossary",
});

export default function GlossaryHubPage() {
  const terms = GLOSSARY_TERMS.map((t) => ({
    name: t.name,
    def: t.def,
    go: t.go,
    href: t.slug ? glossaryPath(t.slug) : r(t.link),
  }));

  return (
    <>
      <JsonLd
        data={webPageLd({ type: "CollectionPage", name: "Busiman glossary", description: DESCRIPTION, path: "/glossary" })}
      />
      <Crumbs trail={[{ name: "Glossary", path: "/glossary" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Glossary</span>
            <h1 className="d1">Business terms, in plain words.</h1>
            <p className="lead">
              Short definitions of the words you meet in Busiman, each tied to how the app uses it. They explain the
              idea, not the law.
            </p>
          </div>
          <Photo src="/img/hardware-shop.jpg" alt="A shopkeeper arranging tools in a hardware shop" height={300} priority />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <GlossarySearch terms={terms} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">See the words in use.</h2>
          <p className="lead">Start free on your phone, or ask us to walk you through it.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>
              Start free
            </Link>
            <Link className="btn btn-line" href={r("BookDemo")}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
