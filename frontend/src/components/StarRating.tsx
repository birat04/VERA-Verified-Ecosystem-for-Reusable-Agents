export function StarRating({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <span className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0"
            >
              <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
            </svg>
          );
        })}
      </span>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      {typeof count === "number" && <span>({count.toLocaleString()})</span>}
    </span>
  );
}
