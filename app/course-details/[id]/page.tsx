import Button from "@/components/Button";

import Curriculum from "@/components/Curriculum";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const CourseDetails = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: course, error } = await supabase
    .from("courses")
    .select("id, title, description")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    // .select("id, title, description, video_path")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  const { data: learningTopics, error: topicError } = await supabase
    .from("learning_topics")
    .select("topic")
    .eq("course_id", course.id);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            {course.title}
          </p>
          <p>{course.description}</p>

          <div>
            <VideoPlayer lessons={lessons} courseId={id} user={user} />
          </div>

          <ul className="space-y-1"></ul>
          {/* {learningTopics && (
            <TopicGrid
              title="O que voc  ir  aprender"
              topics={learningTopics}
            />
          )} */}
        </div>
        <aside className="w-1/4 p-4 border border-gray-300">
          <Link href={`/course/${course.id}`}>
            <Button>Ir para o curso</Button>
          </Link>
          <h2 className="text-xl font-bold my-6">Este curso inclui:</h2>
        </aside>
      </div>
    </div>
  );
};
export default CourseDetails;
