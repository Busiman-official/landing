"use client";

import { useEffect } from "react";

// Brand tokens (see app/globals.css). Mermaid needs literal colours.
const THEME = {
  background: "#fbfaf7",
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif",
  primaryColor: "#fff3d6",
  primaryBorderColor: "#123b6d",
  primaryTextColor: "#123b6d",
  secondaryColor: "#eef3fa",
  secondaryBorderColor: "#123b6d",
  secondaryTextColor: "#123b6d",
  tertiaryColor: "#fbfaf7",
  tertiaryBorderColor: "#e3e9f2",
  tertiaryTextColor: "#44546e",
  lineColor: "#44546e",
  textColor: "#44546e",
  noteBkgColor: "#fff3d6",
  noteBorderColor: "#ffab00",
  noteTextColor: "#44546e",
  edgeLabelBackground: "#fbfaf7",
  clusterBkg: "#eef3fa",
  clusterBorder: "#e3e9f2",
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
