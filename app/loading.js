export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-8 flex flex-col justify-start">
      {/* Top Bar Skeleton */}
      <div className="w-full max-w-7xl mx-auto mb-8 animate-pulse">
        <div className="h-14 bg-stone-200/80 rounded-2xl mb-6"></div>
        <div className="h-44 sm:h-64 bg-amber-100/50 rounded-3xl mb-8"></div>
        
        {/* Categories Strip Skeleton */}
        <div className="flex gap-4 overflow-hidden mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 w-32 rounded-2xl bg-stone-200/70 shrink-0"></div>
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-white border border-stone-200 p-3 flex flex-col justify-between">
              <div className="w-full aspect-square bg-stone-100 rounded-xl mb-3"></div>
              <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-stone-100 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-amber-200/60 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
