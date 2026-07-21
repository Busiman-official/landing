const DESKTOP_REPO = "Busiman-official/busiman-desktop";
const MOBILE_APP_FULL_NAME = "@vishnug05/mobile";
const MOBILE_FALLBACK_URL = "https://expo.dev/accounts/vishnug05/projects/mobile";

type GithubAsset = { name: string; browser_download_url: string };

export type DesktopRelease = {
  version: string | null;
  windows: string | null;
  mac: string | null;
};

export async function getLatestDesktopRelease(): Promise<DesktopRelease> {
  const empty: DesktopRelease = { version: null, windows: null, mac: null };
  try {
    const res = await fetch(
      `https://api.github.com/repos/${DESKTOP_REPO}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return empty;

    const data = await res.json();
    const assets: GithubAsset[] = data.assets ?? [];

    return {
      version: (data.tag_name as string | undefined)?.replace(/^v/, "") ?? null,
      windows: assets.find((a) => a.name.endsWith(".exe"))?.browser_download_url ?? null,
      mac: assets.find((a) => a.name.endsWith(".dmg"))?.browser_download_url ?? null,
    };
  } catch {
    return empty;
  }
}

export type MobileRelease = {
  version: string | null;
  android: string;
};

// Requires EXPO_TOKEN (server-only secret: an Expo access token with read
// access to the project). Without it, falls back to the Expo project page.
export async function getLatestMobileRelease(): Promise<MobileRelease> {
  const token = process.env.EXPO_TOKEN;
  if (!token) return { version: null, android: MOBILE_FALLBACK_URL };

  try {
    const res = await fetch("https://api.expo.dev/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query LatestAndroidBuild($fullName: String!) {
            app {
              byFullName(fullName: $fullName) {
                builds(
                  offset: 0
                  limit: 1
                  status: FINISHED
                  platform: ANDROID
                  filter: { distribution: STORE }
                ) {
                  appVersion
                  artifacts {
                    buildUrl
                  }
                }
              }
            }
          }
        `,
        variables: { fullName: MOBILE_APP_FULL_NAME },
      }),
      // EAS build artifact URLs expire after ~30 days, so this is re-checked
      // often enough that we always hand out a still-valid one.
      next: { revalidate: 1800 },
    });

    if (!res.ok) return { version: null, android: MOBILE_FALLBACK_URL };

    const json = await res.json();
    const build = json?.data?.app?.byFullName?.builds?.[0];
    const buildUrl: string | undefined = build?.artifacts?.buildUrl;

    return {
      version: build?.appVersion ?? null,
      android: buildUrl ?? MOBILE_FALLBACK_URL,
    };
  } catch {
    return { version: null, android: MOBILE_FALLBACK_URL };
  }
}
