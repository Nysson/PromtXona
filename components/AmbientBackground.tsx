export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-aurora opacity-70 dark:opacity-40" />
      <div className="absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-accent-blue/20 blur-3xl" />
      <div
        className="absolute -right-16 top-40 h-80 w-80 animate-float rounded-full bg-accent-indigo/20 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-64 w-64 animate-float rounded-full bg-accent-teal/20 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-grain opacity-[0.15] [background-size:18px_18px] dark:opacity-[0.08]" />
    </div>
  );
}
