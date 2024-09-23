import { courseLessons, lessons, topics } from "@/app/mock";
import Button from "@/components/Button";
import Curriculum from "@/components/Curriculum";
import TopicGrid from "@/components/TopicGrid";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const CourseDetails = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id;

  const supabase = createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  const { data: courseLessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  const { data: learningTopics, error: topicError } = await supabase
    .from("learningTopics")
    .select("topic")
    .eq("course_id", course.id);

  console.log(topicError, learningTopics);

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            {course.title}
          </p>
          <p>{course.description}</p>
          <TopicGrid title="O que você irá aprender" topics={learningTopics} />

          <Curriculum title={course.title} lessons={courseLessons} />
        </div>
        <aside className="w-1/4 p-4 border border-gray-300">
          <Link href={`/course/${course.id}`}>
            <Button>Ir para o curso</Button>
          </Link>
          <h2 className="text-xl font-bold my-6">Este curso inclui:</h2>
          <ul>
            <li className="text-sm mb-2">
              <span className="mr-2">🎥</span>
              <span>{course.video_hours} horas de vídeo sob demanda</span>
            </li>
            <li className="text-sm mb-2">
              <span className="  mr-2">📝</span>
              <span className="">{course.articles} artigos</span>
            </li>
            <li className="text-sm mb-2">
              <span className="  mr-2">📥</span>
              <span>{course.resources} recursos para download</span>
            </li>

            <li className="text-sm mb-2">
              <span className="  mr-2">🔑</span>
              <span>Acesso total vitalício</span>
            </li>
            <li className="text-sm mb-2">
              <span className=" mr-2">📜</span>
              <span>Certificado de conclusão</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
export default CourseDetails;
