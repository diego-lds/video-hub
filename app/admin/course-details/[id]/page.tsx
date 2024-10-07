import EditCourseForm from "@/components/EditCourseForm";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: editCourse, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: lessons, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", params.id);

  const { data: topics, error: topicsError } = await supabase
    .from("learning_topics")
    .select("topic")
    .eq("course_id", params.id);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: videos, error } = await supabase.storage
    .from("videos")
    .list(user?.id + "/" + editCourse);

  return (
    <div className="w-full">
      <h1 className="text-3xl">{editCourse?.title}</h1>
      <div>
        {user && (
          <EditCourseForm
            course={editCourse}
            lessons={lessons}
            userId={user?.id}
            topics={topics}
          />
        )}
      </div>
    </div>
  );
}
