export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-dark-muted" : "text-muted"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}
