import NewLessonForm from "@/components/NewLessonForm";
import { Params } from "@/types";

const NewLesson = async ({ params }: Params) => {
  const id = params?.id;

  return (
    <>
      <NewLessonForm courseId={id} />
    </>
  );
};
export default NewLesson;
