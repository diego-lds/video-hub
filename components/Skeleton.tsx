import { Skeleton as Skelly } from "@/components/ui/skeleton";

export default function Skeleton({ className }: { className: string }) {
  return <Skelly className={`${className} w-full rounded-2xl   `} />;
}
