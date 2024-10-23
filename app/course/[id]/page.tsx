import { getCourseAction } from "@/app/actions/courses";
import { getLessonsAction } from "@/app/actions/lessons";
import { getCourseTopicsAction } from "@/app/actions/topics";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";

const Course = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const { data: course, error: courseError } = await getCourseAction(id);
  const { data: topics, error: topicsError } = await getCourseTopicsAction(id);
  const { data: lessons, error: lessonsError } = await getLessonsAction(id);

  return (
    <div className="w-full flex mx-0 items-center px-4 sm:px-8 lg:px-16">
      <div className="w-full flex flex-col gap-10 max-w-3xl mx-auto">
        <h2 className="font-extrabold text-2xl lg:text-3xl !leading-tight">
          {course?.title}
        </h2>

        {topics && (
          <section className="mt-3">
            <ul>
              <TopicGrid topics={topics} />
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-2">
          {lessons && <VideoPlayer lessons={lessons} />}
        </section>
      </div>
    </div>
  );
};

export default Course;
