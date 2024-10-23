import NewLessonForm from "@/components/NewLessonForm";
import { Params } from "@/types";

const NewLesson = async ({ params }: Params) => {
  const id = params?.id;

  return (
    <div>
      <NewLessonForm courseId={id} />
    </div>
  );
};
export default NewLesson;
