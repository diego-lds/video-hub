import EditLessonForm from "@/components/EditLessonForm";
import VideoPlayer from "@/components/VideoPlayer";
import { createClient } from "@/utils/supabase/server";
import ReactPlayer from "react-player";

export default async function LessonDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: lesson, error: courseError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", params.id);

  if (courseError) {
    throw courseError;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = user?.id + "/" + lesson.course_id + "/" + lesson.videoId;

  console.log(lesson);

  return (
    <div className="max-w-4xl p-4 bg-white rounded shadow-md">
      <EditLessonForm lesson={lesson} />
    </div>
  );
}
