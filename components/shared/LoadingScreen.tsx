"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LoadingScreen.module.css";

/** How long the splash stays fully visible before it starts fading out. Previously 4000ms on
 * every single visit - long enough that a first-time visitor saw nothing but this (no headline,
 * no CTA) for over 4 seconds, which is a real cost on a landing page's first impression. */
const DISPLAY_MS = 1100;
/** Must match the opacity transition duration in LoadingScreen.module.css. */
const FADE_MS = 500;
/** Show once per browser session, not on every return to "/" - a repeat visitor who already saw
 * the brand moment doesn't need to sit through it again. */
const SESSION_KEY = "busiman-splash-shown";

type Phase = "visible" | "leaving" | "done";

export function LoadingScreen() {
  // Always starts "visible" (matching server-rendered markup, even when we already know client-
  // side we're going to skip it) - reading sessionStorage into the initial state here would make
  // the client's first render disagree with the server's and trip a hydration mismatch. Skipping
  // happens a tick later instead, in the effect below, which only ever runs after hydration.
  const [phase, setPhase] = useState<Phase>("visible");

  // Drive the visible -> leaving -> done sequence on a timer.
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setPhase("done");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fadeMs = reduceMotion ? 0 : FADE_MS;

    const leaveTimer = setTimeout(() => setPhase("leaving"), DISPLAY_MS);
    const doneTimer = setTimeout(
      () => setPhase("done"),
      DISPLAY_MS + fadeMs
    );

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock page scroll while the splash covers the screen.
  useEffect(() => {
    if (phase === "done") return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.overlay} ${phase === "leaving" ? styles.leaving : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.mark}>
        <Image
          src="/images/busiman-logo-animation.gif"
          alt="Busiman"
          width={510}
          height={182}
          priority
          unoptimized
          className={styles.gif}
        />
      </div>
      <p className={styles.tagline}>Free Office Management App</p>
    </div>
  );
}
