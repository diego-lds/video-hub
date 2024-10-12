import {
  getCoursesDetailsAction,
  getTopicsAction,
} from "@/app/actions/courses";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";

const Course = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const { data } = await getCoursesDetailsAction(id);
  const { learning_topics, title, description, lessons } = data;

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            {title}
          </p>
          <p>{description}</p>

          <div className="">{data && <VideoPlayer lessons={lessons} />}</div>

          <ul className="space-y-1">
            <TopicGrid topics={learning_topics} />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Course;
