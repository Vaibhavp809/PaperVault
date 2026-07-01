const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="glass animate-pulse rounded-lg p-5">
        <div className="h-11 w-11 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="mt-5 h-5 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
        <div className="mt-3 h-4 w-1/3 rounded bg-slate-200 dark:bg-white/10" />
        <div className="mt-8 space-y-3">
          <div className="h-4 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 rounded bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonGrid;

