import NewLessonForm from "@/components/NewLessonForm";
import { createClient } from "@/utils/supabase/server";

const NewLesson = async ({ params }: { params: { id: string } }) => {
  const id = params?.id.toString();

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="">
      <div className=" ">
        <NewLessonForm courseId={id} />
      </div>
    </div>
  );
};
export default NewLesson;
