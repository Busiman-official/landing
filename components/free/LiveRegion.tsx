import s from "./free.module.css";

/**
 * aria-live="polite" wrapper for results and warnings. Keep it mounted (always render it, even when empty)
 * so screen readers announce the changes. `visuallyHidden` makes an announce-only region.
 */
export function LiveRegion({
  children,
  visuallyHidden,
  className,
  atomic = true,
  id,
}: {
  children?: React.ReactNode;
  visuallyHidden?: boolean;
  className?: string;
  atomic?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      aria-atomic={atomic}
      className={[visuallyHidden ? s.sr : "", className ?? ""].filter(Boolean).join(" ") || undefined}
    >
      {children}
    </div>
  );
}
