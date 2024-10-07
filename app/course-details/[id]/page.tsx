import Button from "@/components/Button";

import Curriculum from "@/components/Curriculum";
import TopicGrid from "@/components/TopicGrid";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const CourseDetails = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id.toString() || null;

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
            <VideoPlayer lessons={lessons} courseId={id} />
          </div>

          <ul className="space-y-1">
            {learningTopics && (
              <TopicGrid
                title="O que voc  ir  aprender"
                topics={learningTopics}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
