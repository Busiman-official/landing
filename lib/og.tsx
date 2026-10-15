import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT =
  "Busiman: free office management app for calls, attendance, inventory, sales and purchase";

// Brand tokens from globals.css (ImageResponse cannot read CSS variables).
const NAVY = "#123b6d";
const NAVY_DEEP = "#0c2c54";
const AMBER = "#ffab00";

const MODULES = ["Calls", "Attendance", "Inventory", "Sales", "Purchase", "Service reports"];

// Shared by opengraph-image and twitter-image so a link preview looks the same everywhere.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 56,
              borderRadius: 6,
              background: AMBER,
            }}
          />
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
            Busiman
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Run your whole office from one free app.
          </div>
          <div style={{ fontSize: 32, color: "#cbd8ea" }}>
            Free office management for every business
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {MODULES.map((label) => (
            <div
              key={label}
              style={{
                fontSize: 24,
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(255, 171, 0, 0.16)",
                border: `2px solid ${AMBER}`,
                color: "#ffe2a3",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
