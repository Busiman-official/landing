"use client";

import s from "./free.module.css";

type Props = {
  optIn: boolean;
  onOptIn: (on: boolean) => void;
  saved: boolean;
  failed?: boolean;
  onClear: () => void;
  /** What is kept, in plain words. Default "this document". */
  what?: string;
  className?: string;
};

/**
 * Opt-in switch + status + "Clear saved data". Wire it to useLocalDraft:
 * <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={d.clear} />
 * Hidden when printing.
 */
export function SaveBar({ optIn, onOptIn, saved, failed, onClear, what = "this document", className }: Props) {
  const status = failed
    ? "Could not save. Your browser blocked or filled its storage. Nothing is lost on screen."
    : optIn
      ? saved
        ? "Saved in this browser"
        : "Saving in this browser..."
      : "Off. Nothing is kept when you close this page.";
  return (
    <div className={`${s.saveBar} noPrint ${className ?? ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={optIn}
        className={s.switch}
        onClick={() => onOptIn(!optIn)}
      >
        <span className={s.track} aria-hidden="true" />
        Save {what} in this browser
      </button>
      <p className={s.status} role="status" aria-live="polite">
        {status}
      </p>
      <button type="button" className={`btn btn-line ${s.iconBtn}`} onClick={onClear}>
        Clear saved data
      </button>
    </div>
  );
}
