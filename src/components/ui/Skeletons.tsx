export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-obsidian-800 bg-obsidian-900">
      <div className="h-56 w-full shimmer-bg" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 rounded shimmer-bg" />
        <div className="h-3 w-1/2 rounded shimmer-bg" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full shimmer-bg" />
          <div className="h-6 w-16 rounded-full shimmer-bg" />
        </div>
      </div>
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900 p-5">
      <div className="mb-4 h-4 w-1/3 rounded shimmer-bg" />
      <div className="h-12 w-1/2 rounded shimmer-bg" />
      <div className="mt-5 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 w-full rounded-lg shimmer-bg" />
        ))}
      </div>
    </div>
  );
}

export function PlaceCardSkeleton() {
  return (
    <div className="min-w-[280px] overflow-hidden rounded-2xl border border-obsidian-800 bg-obsidian-900">
      <div className="h-40 w-full shimmer-bg" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded shimmer-bg" />
        <div className="h-3 w-full rounded shimmer-bg" />
        <div className="h-3 w-2/3 rounded shimmer-bg" />
      </div>
    </div>
  );
}
