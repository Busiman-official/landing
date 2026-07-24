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

function parseVersionFromMessage(message?: string | null): string | null {
  if (!message) return null;
  const match = message.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

/** Simple numeric semver compare — returns > 0 if `a` is newer than `b`. */
function compareVersions(a: string, b: string): number {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * Latest published EAS Update (OTA JS bundle) on the `production` branch.
 * `publish-update.ts` sets each update's message to `Release X.Y.Z`, so we
 * recover the version from that. OTA pushes don't create a new native build,
 * so this can be newer than the last `builds` entry above — installed apps
 * self-update to it, but it isn't a downloadable artifact on its own.
 */
async function getLatestMobileOtaVersion(token: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.expo.dev/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query LatestProductionUpdate($fullName: String!) {
            app {
              byFullName(fullName: $fullName) {
                updateBranchByName(name: "production") {
                  updates(offset: 0, limit: 1) {
                    message
                  }
                }
              }
            }
          }
        `,
        variables: { fullName: MOBILE_APP_FULL_NAME },
      }),
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const update = json?.data?.app?.byFullName?.updateBranchByName?.updates?.[0];
    return parseVersionFromMessage(update?.message);
  } catch {
    return null;
  }
}

// Requires EXPO_TOKEN (server-only secret: an Expo access token with read
// access to the project). Without it, falls back to the Expo project page.
export async function getLatestMobileRelease(): Promise<MobileRelease> {
  const token = process.env.EXPO_TOKEN;
  if (!token) return { version: null, android: MOBILE_FALLBACK_URL };

  try {
    const [buildRes, otaVersion] = await Promise.all([
      fetch("https://api.expo.dev/graphql", {
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
      }),
      getLatestMobileOtaVersion(token),
    ]);

    if (!buildRes.ok) return { version: otaVersion, android: MOBILE_FALLBACK_URL };

    const json = await buildRes.json();
    const build = json?.data?.app?.byFullName?.builds?.[0];
    const buildUrl: string | undefined = build?.artifacts?.buildUrl;
    const buildVersion: string | null = build?.appVersion ?? null;

    // Show whichever is actually newer — an OTA push can outrun the last
    // native build's version number (JS-only changes don't need a rebuild).
    const version =
      otaVersion && (!buildVersion || compareVersions(otaVersion, buildVersion) > 0)
        ? otaVersion
        : buildVersion;

    return {
      version,
      android: buildUrl ?? MOBILE_FALLBACK_URL,
    };
  } catch {
    return { version: null, android: MOBILE_FALLBACK_URL };
  }
}
