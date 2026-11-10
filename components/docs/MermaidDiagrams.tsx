"use client";

import { useEffect } from "react";

// Brand tokens (see the .bm block in app/site.css). Mermaid needs literal colours.
const THEME = {
  background: "#ffffff",
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif",
  primaryColor: "#ffebc2",
  primaryBorderColor: "#003a6d",
  primaryTextColor: "#00213f",
  secondaryColor: "#e3ecf6",
  secondaryBorderColor: "#003a6d",
  secondaryTextColor: "#00213f",
  tertiaryColor: "#ffffff",
  tertiaryBorderColor: "#d3dce8",
  tertiaryTextColor: "#3f5470",
  lineColor: "#00213f",
  textColor: "#00213f",
  noteBkgColor: "#ffebc2",
  noteBorderColor: "#feac00",
  noteTextColor: "#00213f",
  edgeLabelBackground: "#ffffff",
  clusterBkg: "#f1f4f8",
  clusterBorder: "#d3dce8",
};

// Turns the server-rendered `<pre class="mermaid">` source blocks into SVG.
// The raw source stays in the HTML as a fallback: it is only replaced after a
// diagram renders successfully, and any failure leaves the source visible.
export function MermaidDiagrams({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    const nodes = root
      ? Array.from(root.querySelectorAll<HTMLElement>("pre.mermaid"))
      : [];
    if (nodes.length === 0) return;

    let cancelled = false;

    (async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: THEME,
          // Natural-size SVGs: narrow screens scroll inside the diagram box
          // instead of shrinking the text to unreadable.
          flowchart: { useMaxWidth: false, htmlLabels: true, nodeSpacing: 40, rankSpacing: 40, padding: 12 },
          sequence: { useMaxWidth: false },
        });

        for (const [index, node] of nodes.entries()) {
          if (cancelled || node.dataset.rendered) continue;
          const source = node.textContent ?? "";
          const id = `busiman-mermaid-${index}`;
          try {
            const { svg } = await mermaid.render(id, source);
            if (cancelled) return;
            node.dataset.rendered = "true";
            node.setAttribute("role", "img");
            node.setAttribute(
              "aria-label",
              node.previousElementSibling?.textContent?.trim() || "Diagram",
            );
            node.innerHTML = svg;
          } catch {
            // Leave the readable source in place for this diagram.
            document.getElementById(`d${id}`)?.remove();
          }
        }
      } catch {
        // Library failed to load: sources stay visible.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [rootId]);

  return null;
}
