export function ActivityCardSkeleton() {
  return (
    <div className="bg-accent/50 h-56 min-w-48 shrink-0 overflow-hidden rounded-md">
      <div className="bg-primary/50 relative flex h-24 w-full animate-pulse items-center justify-center">
        <div className="bg-accent/50 absolute size-8 rounded-full p-2"></div>
      </div>
      <div className="flex h-fit flex-col items-start gap-6 p-3">
        <div className="bg-accent h-5 w-32 animate-pulse rounded-full"></div>

        <div className="text-foreground/80 flex flex-col gap-1.5 text-sm">
          <div className="bg-foreground/5 flex h-6 w-28 animate-pulse items-center gap-1 rounded-full border-1 px-2 delay-200"></div>
          <div className="bg-foreground/5 flex h-6 w-24 animate-pulse items-center gap-1 rounded-full border-1 px-2"></div>
        </div>
      </div>
    </div>
  )
}
