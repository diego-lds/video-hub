import EditLessonForm from "@/components/EditLessonForm";
import { createClient } from "@/utils/supabase/server";

export default async function LessonDetails({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: lesson, error: courseError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", params.id)
    .single();

  if (courseError) {
    throw courseError;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = user?.id + "/" + lesson.course_id + "/" + lesson.videoId;

  const { data: video, error: videoError } = supabase.storage
    .from("videos")
    .getPublicUrl(path);

  if (videoError) {
    throw videoError;
  }

  console.log(lesson, video);

  return (
    <div className="max-w-4xl p-4 bg-white rounded shadow-md">
      <EditLessonForm lesson={lesson} />
    </div>
  );
}
