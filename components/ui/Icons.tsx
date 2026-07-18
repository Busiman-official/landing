export type FeatureIconName =
  | "call"
  | "attendance"
  | "inventory"
  | "service"
  | "sales"
  | "purchase";

export type PlatformIconName = "windows" | "apple" | "android";

type IconProps = {
  className?: string;
};

const featurePaths: Record<FeatureIconName, string> = {
  call: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  attendance:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M16 11l2 2 4-4",
  inventory:
    "M21 8l-9-5-9 5v8l9 5 9-5z M3 8l9 5 9-5 M12 13v8",
  service:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 15l2 2 4-4",
  sales: "M3 3v18h18 M7 15l4-4 3 3 6-6 M20 8V5h-3",
  purchase:
    "M9 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z M19 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6",
};

export function FeatureIcon({
  name,
  className,
}: IconProps & { name: FeatureIconName }) {
  const paths = featurePaths[name].split(" M").map((d, i) => (i === 0 ? d : `M${d}`));
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function WindowsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3 5.5 10.3 4.5V11.4H3zM11.2 4.4 21 3V11.3H11.2zM3 12.4H10.3V19.4L3 18.4zM11.2 12.4H21V20.9L11.2 19.6z" />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 1.5c.1 1.1-.3 2.2-1 3-.7.8-1.8 1.5-2.9 1.4-.1-1.1.4-2.2 1-3 .8-.9 2-1.5 2.9-1.4zM20.7 17.3c-.4.9-.8 1.7-1.4 2.5-.8 1.1-1.6 2.5-2.9 2.5-1.2 0-1.5-.7-3-.7s-1.8.7-3 .8c-1.2 0-2.1-1.2-2.9-2.4-1.7-2.4-3-6.8-1.2-9.8.8-1.5 2.3-2.5 3.9-2.5 1.2 0 2.2.8 3 .8.7 0 2-1 3.4-.9.6 0 2.2.2 3.2 1.8-.1.1-1.9 1.1-1.9 3.3 0 2.6 2.3 3.5 2.8 3.6z" />
    </svg>
  );
}

export function AndroidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.5v6.7a1 1 0 0 0 1 1h.7v3.1a1.3 1.3 0 0 0 2.6 0v-3.1h1.4v3.1a1.3 1.3 0 0 0 2.6 0v-3.1h.7a1 1 0 0 0 1-1V8.5zM5.6 8.5a1.1 1.1 0 0 0-1.1 1.1v4.6a1.1 1.1 0 0 0 2.2 0V9.6a1.1 1.1 0 0 0-1.1-1.1zM18.4 8.5a1.1 1.1 0 0 0-1.1 1.1v4.6a1.1 1.1 0 0 0 2.2 0V9.6a1.1 1.1 0 0 0-1.1-1.1zM8.9 3.7l-.9-1.6a.3.3 0 0 1 .5-.3l1 1.7a5.6 5.6 0 0 1 4 0l1-1.7a.3.3 0 0 1 .5.3l-.9 1.6a4.9 4.9 0 0 1 2.4 3.8H6.5a4.9 4.9 0 0 1 2.4-3.8zM9.2 6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2zM14.8 6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2z" />
    </svg>
  );
}

export function DesktopIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function MobileIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}

export const platformIcons: Record<
  PlatformIconName,
  (props: IconProps) => React.JSX.Element
> = {
  windows: WindowsIcon,
  apple: AppleIcon,
  android: AndroidIcon,
};
