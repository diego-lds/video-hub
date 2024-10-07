import NewLessonForm from "@/components/NewLessonForm";
import { createClient } from "@/utils/supabase/server";

const NewLesson = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id.toString() || null;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full">
      <h1>New Lesson</h1>
      <h2>From course {id}</h2>
      <NewLessonForm courseId={id} user={user} />
    </div>
  );
};
export default NewLesson;
