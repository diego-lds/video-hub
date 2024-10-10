import { getCoursesDetailsAction } from "@/app/actions/courses";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const Course = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id.toString() || null;

  const { data } = await getCoursesDetailsAction(id);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            {data.title}
          </p>
          <p>{data.description}</p>

          <div>
            <VideoPlayer lessons={data.lessons} courseId={data.id} />
          </div>

          <ul className="space-y-1">
            {data.learning_topics && (
              <TopicGrid
                title="O que voc  irá aprender"
                topics={data.learning_topics}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Course;
