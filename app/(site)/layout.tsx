import { Nav } from "@/components/kit/Nav";
import { Footer } from "@/components/kit/Footer";

// `.bm` is the design-system root (tokens and every shared class live under it in app/site.css).
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bm">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
