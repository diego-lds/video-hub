import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/server";
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

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", id);

  return (
    <div className="w-full outline">
      <VideoPlayer controls lessons={lessons} />
    </div>
  );
};
export default Course;
