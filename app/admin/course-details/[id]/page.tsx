import Button from "@/components/Button";
import EditCourseForm from "@/components/EditCourseForm";
import VideoUpload from "@/components/VideoUploader";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function EditCourse({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: course, error: courseError } = await supabase
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
    .list(user?.id + "/" + course);

  return (
    <div className="w-full">
      <h1 className="text-3xl">{course?.title}</h1>
      <div>
        {user && (
          <EditCourseForm
            course={course}
            lessons={lessons}
            userId={user?.id}
            topics={topics}
          />
        )}
      </div>
      <div className="flex justify-center p-2 ">
        <Link
          href={`/admin/new-lesson/${params.id}`}
          className="border p-1 m-1 max-w-lg rounded shadow-lg  bg-emerald-500 text-white"
        >
          Criar nova aula
        </Link>
      </div>
    </div>
  );
}
