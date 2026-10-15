// One place for the facts that show up in metadata, structured data, the footer and the contact
// section, so a phone number or domain change is a single edit.
export const SITE_URL = "https://www.busiman.org";
export const SITE_NAME = "Busiman";

export const SITE_DESCRIPTION =
  "Busiman is a free app to run your office: calls, attendance, inventory, sales, purchase and service reports in one place, on desktop and mobile.";

export const CONTACT_EMAIL = "team@busiman.org";
export const CONTACT_PHONE_DISPLAY = "+91 75006 73358";
export const CONTACT_PHONE_TEL = "+917500673358";

export const GITHUB_ORG_URL = "https://github.com/Busiman-official";

/** Absolute URL for a site path, used inside JSON-LD where relative URLs are not valid. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
