import {
  Skeleton,
} from "@/components/ui/skeleton";

export function TableSkeleton() {

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">

        <Skeleton className="h-10 w-48 rounded-xl" />

        <Skeleton className="h-10 w-32 rounded-xl" />

      </div>

      {/* Table rows */}
      <div className="space-y-3">

        {Array.from({
          length: 8,
        }).map((_, index) => (

          <Skeleton
            key={index}
            className="h-14 w-full rounded-2xl"
          />
        ))}

      </div>

    </div>
  );
}