export default function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-full animate-pulse">
      <div className="aspect-[2/3] bg-slate-800/50 rounded-xl mb-2" />
      <div className="h-3 bg-slate-800/50 rounded w-3/4 mb-1" />
      <div className="h-2 bg-slate-800/50 rounded w-1/2" />
    </div>
  );
}
