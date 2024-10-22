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
    .eq("id", params.id);

  if (courseError) {
    throw courseError;
  }

  return (
    <div className="max-w-4xl p-4 bg-white rounded shadow-md">
      {/* <EditLessonForm lesson={lesson} /> */}
    </div>
  );
}
