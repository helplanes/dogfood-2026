export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-surface rounded-lg" />
        <div className="h-24 bg-surface rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-surface border border-stone-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
