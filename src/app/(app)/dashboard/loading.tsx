import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-[9px]" />
            </div>
            <Skeleton className="mt-4 h-7 w-24" />
            <Skeleton className="mt-3 h-3.5 w-28" />
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3.5 w-44" />
        <Skeleton className="mt-6 h-[280px] w-full" />
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-6 w-20" />
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-6 h-[240px] w-full" />
        </Card>
        <Card className="p-5 lg:col-span-3">
          <Skeleton className="h-4 w-28" />
          <div className="mt-6 flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
