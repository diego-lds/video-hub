import { getCourseAction } from "@/app/actions/courses";
import { getLessonsAction } from "@/app/actions/lessons";
import { getCourseTopicsAction } from "@/app/actions/topics";
import EditCourseForm from "@/components/EditCourseForm";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const { data: course } = await getCourseAction(params?.id);
  const { data: lessons } = await getLessonsAction(params?.id);
  const { data: topics } = await getCourseTopicsAction(params?.id);

  return (
    <div className=" ">
      {course && lessons && topics && (
        <EditCourseForm course={course} lessons={lessons} topics={topics} />
      )}
    </div>
  );
}
