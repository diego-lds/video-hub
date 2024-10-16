import {
  getCourseLessonsAction,
  getCoursesDetailsAction,
  getCourseTopicsAction,
} from "@/app/actions/courses";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";

const Course = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const { data: course } = await getCoursesDetailsAction(id);
  const { data: topics } = await getCourseTopicsAction(id);
  const { data: lessons } = await getCourseLessonsAction(id);

  return (
    <div className="w-full flex items-center ">
      <div className="flex flex-col  gap-10">
        <h1 className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl">
          {course?.title}
        </h1>

        <section className="">
          {lessons && <VideoPlayer lessons={lessons} />}
        </section>

        {topics && (
          <section className="mt-6">
            <h2 className="text-2xl font-bold">Tópicos do Curso</h2>
            <ul className="space-y-2">
              {topics && <TopicGrid topics={topics} />}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
export default Course;
