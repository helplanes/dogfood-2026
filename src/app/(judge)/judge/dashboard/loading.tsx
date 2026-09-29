export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-12 bg-surface rounded-xl" />
        <div className="h-16 bg-surface rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-surface border border-stone-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
