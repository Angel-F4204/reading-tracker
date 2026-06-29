interface StatsBarProps {
  toReadCount: number;
  readingCount: number;
  finishedCount: number;
  averageRating: number;
}

function StatsBar({
  toReadCount,
  readingCount,
  finishedCount,
  averageRating,
}: StatsBarProps) {
  return (
    <section className="bg-white dark:bg-slate-900 dark:text-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-2">Reading Stats</h2>

      <div className="grid gap-2 sm:grid-cols-4">
        <p>📖 To Read: {toReadCount}</p>
        <p>📚 Reading: {readingCount}</p>
        <p>✅ Finished: {finishedCount}</p>
        <p>⭐ Average Rating: {averageRating.toFixed(1)}</p>
      </div>
    </section>
  );
}

export default StatsBar;
