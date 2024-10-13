import {
  getCourseLessonsAction,
  getCoursesDetailsAction,
  getCourseTopicsAction,
} from "@/app/actions/courses";
import TopicGrid from "@/components/TopicGrid";
import TopicsList from "@/components/TopicList";
import VideoPlayer from "@/components/VideoPlayer";

const Course = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const { data: course } = await getCoursesDetailsAction(id);
  const { data: topics } = await getCourseTopicsAction(id);
  const { data: lessons } = await getCourseLessonsAction(id);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            {course?.title}
          </p>
          <p>{course?.description}</p>

          <div className="">{lessons && <VideoPlayer lessons={lessons} />}</div>

          <ul className="space-y-1">
            {topics && <TopicsList topics={topics} />}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Course;
