import Skeleton from "@/components/Skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div className="my-10">
        <Skeleton className="h-12" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className=" h-64" />
        <Skeleton className=" h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
