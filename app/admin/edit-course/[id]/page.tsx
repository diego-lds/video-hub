import {
  getCourseLessonsAction,
  getCoursesDetailsAction,
  getCourseTopicsAction,
} from "@/app/actions/courses";
import EditCourseForm from "@/components/EditCourseForm";
import { Lesson } from "@/types";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const { data: course } = await getCoursesDetailsAction(params?.id);
  const { data: lessons } = await getCourseLessonsAction(params?.id);
  const { data: topics } = await getCourseTopicsAction(params?.id);

  console.log(lessons);

  return (
    <div className="w-full">
      <h1 className="text-3xl">{course?.title}</h1>
      <div>
        {course && lessons && topics ? (
          <EditCourseForm course={course} lessons={lessons} topics={topics} />
        ) : (
          <p>Carregando detalhes do curso...</p>
        )}
      </div>
    </div>
  );
}
