import { getCoursesDetailsAction } from "@/app/actions/courses";
import EditCourseForm from "@/components/EditCourseForm";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getCoursesDetailsAction(params?.id);

  return (
    <div className="w-full">
      <h1 className="text-3xl">{data?.title}</h1>
      <div>
        <EditCourseForm courseDetails={data} />
      </div>
    </div>
  );
}
