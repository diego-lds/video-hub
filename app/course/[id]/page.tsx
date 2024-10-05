"use client";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/client";
import { secondsToMinutes } from "@/utils/formatUtils";

interface LessonProps {
  id: number;
  created_at: string;
  title: string;
  description: string;
  url: string;
  order: number;
  duration: number;
  thumbnail: string | null;
  course_id: number;
}

const Course = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id;

  const supabase = createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  const { data: learningTopics, error: topicError } = await supabase
    .from("learning_topics")
    .select("topic")
    .eq("course_id", course.id);

  return (
    <div className="w-full ">
      <VideoPlayer url={URL} />
    </div>
  );
};
export default Course;
