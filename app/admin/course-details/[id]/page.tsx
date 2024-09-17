import Button from "@/components/Button";
import EditCourseForm from "@/components/EditCourseForm";
import VideoUpload from "@/components/VideoUpload";
import { createClient } from "@/utils/supabase/server";
import { log } from "console";
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  log(user);

  return (
    <div>
      Edit
      <div>
        {user && (
          <EditCourseForm course={course} lessons={lessons} userId={user?.id} />
        )}
      </div>
      <Link href={`/admin/new-lesson/${params.id}`} className="border p-1 m-1">
        + nova aula
      </Link>
    </div>
  );
}
