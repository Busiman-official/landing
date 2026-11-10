import { Crumbs } from "@/components/kit/Crumbs";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { SearchBox, SearchFromUrl } from "./SearchBox";
import { SEARCH_INDEX } from "./titles";

export const metadata = pageMetadata({
  title: "Search the Busiman site",
  description: "Search every page of the Busiman site: features, pricing, free tools, templates, comparisons, guides and help.",
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Search", path: "/search" }]} />
      <div className="sec" style={{ paddingTop: 24, paddingBottom: 88 }}>
        <div className="wrap stack" style={{ gap: 28, maxWidth: 860, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}>
          <span className="eyebrow">Site search</span>
          <h1 className="d1">Search Busiman</h1>
          <Suspense fallback={<SearchBox pages={SEARCH_INDEX} />}>
            <SearchFromUrl pages={SEARCH_INDEX} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
