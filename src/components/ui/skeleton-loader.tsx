import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded-md',
        className
      )}
    />
  );
}

export function ProductTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <SkeletonLoader className="h-12 w-12 rounded-md" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader className="h-4 w-1/3" />
            <SkeletonLoader className="h-3 w-1/4" />
          </div>
          <SkeletonLoader className="h-4 w-16" />
          <SkeletonLoader className="h-4 w-12" />
          <SkeletonLoader className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <SkeletonLoader className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <SkeletonLoader className="h-40 w-full rounded-none" />
      <div className="p-4">
        <SkeletonLoader className="h-5 w-2/3" />
      </div>
    </div>
  );
}
