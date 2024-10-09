import { getCoursesDetailsAction } from "@/app/actions/courses";
import EditCourseForm from "@/components/EditCourseForm";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const { courseDetails } = await getCoursesDetailsAction(params?.id);

  return (
    <div className="w-full">
      <h1 className="text-3xl">{courseDetails?.title}</h1>
      <div>
        <EditCourseForm courseDetails={courseDetails} />
      </div>
    </div>
  );
}
