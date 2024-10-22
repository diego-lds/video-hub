import {
  getCoursesDetailsAction,
  getCourseTopicsAction,
} from "@/app/actions/courses";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";
import { getLessonsAction } from "@/app/actions/lessons";

const Course = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const { data: course, error } = await getCoursesDetailsAction(id);
  const { data: topics } = await getCourseTopicsAction(id);
  const { data: lessons } = await getLessonsAction(id);

  return (
    <div className="w-full flex items-center  ">
      <div className="w-full flex flex-col  gap-10 max-w-3xl ">
        <h2 className=" font-extrabold  !leading-tight">{course?.title}</h2>
        {topics && (
          <section className="mt-3">
            <ul className="">{topics && <TopicGrid topics={topics} />}</ul>
          </section>
        )}

        <section className="flex flex-col gap-4">
          {lessons && <VideoPlayer lessons={lessons} />}
        </section>
      </div>
    </div>
  );
};
export default Course;
