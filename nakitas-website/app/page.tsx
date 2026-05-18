export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1
        className="text-6xl"
        style={{ color: "var(--color-cream-linen)" }}
      >
        Welcome to Nakita&apos;s Website
      </h1>
      <p
        className="text-xl font-italic-accent"
        style={{ color: "var(--color-brass-needle)" }}
      >
        turn up the volume for an experience
      </p>
      <p
        className="text-sm mt-12 opacity-50"
        style={{ color: "var(--color-paper-aged)" }}
      >
        Foundation ready. Loader scene coming next.
      </p>
    </main>
  );
}