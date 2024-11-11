import { fetchCourseDetails } from "@/app/actions/courses";
import { fetchLessons } from "@/app/actions/lessons";
import { fetchTopics } from "@/app/actions/topics";
import CourseDetails from "@/components/CourseDetails";
import Lessons from "@/components/Lessons";
import Topics from "@/components/Topics";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params?.id.toString();

  const lessons = await fetchLessons(params?.id);
  const details = await fetchCourseDetails(courseId);
  const topics = await fetchTopics(courseId);

  return (
    <>
      {renderCourseDetails(details)}
      {renderLessons(lessons)}
      {renderTopics(topics)}
    </>
  );
}

async function renderCourseDetails(details: any) {
  if (details.error)
    return (
      <p className="text-red-500">Erro ao buscas as infomações do curso</p>
    );

  return <CourseDetails course={details.data} />;
}

async function renderTopics(topics: any) {
  if (topics.error)
    return <p className="text-red-500">Erro ao buscas os tópicos</p>;

  return <Topics data={topics.data} />;
}

async function renderLessons(lessons: any) {
  if (lessons.error)
    return <p className="text-red-500">Erro ao buscas a lista de aulas</p>;

  return <Lessons data={lessons.data} />;
}
