import CreateCourseForm from "@/components/NewCourseForm";

export default async function EditCourse({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col w-full justify-center gap-2">
      <h1>Edit course</h1>
    </div>
  );
}
