"use client";

import "./print.css";

/**
 * Renders nothing; importing it loads the global print stylesheet (everything except `.printArea` is hidden
 * when printing). PrintButton already imports the same file, so you only need this on a page that
 * prints without a PrintButton.
 */
export function PrintStyles() {
  return null;
}
