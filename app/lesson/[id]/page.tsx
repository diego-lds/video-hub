import { createClient } from "@/utils/supabase/server";

const Lesson = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id;

  const supabase = createClient();

  const { data: lessons, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", id);

  return (
    <div className="w-full outline">
      {/* <VideoPlayer controls lessons={lessons} /> */}
      <h1>Lesson {id}</h1>

      <ul>
        {lessons?.map((lesson) => (
          <li key={lesson.id} className="border p-1 m-1">
            {lesson.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Lesson;
