"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LoadingScreen.module.css";

/** How long the splash stays fully visible before it starts fading out. */
const DISPLAY_MS = 4000;
/** Must match the opacity transition duration in LoadingScreen.module.css. */
const FADE_MS = 500;

type Phase = "visible" | "leaving" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  // Drive the visible -> leaving -> done sequence on a timer.
  useEffect(() => {
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
