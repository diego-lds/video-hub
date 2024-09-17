"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface Lesson {
  id: number;
  created_at: string;
  title: string;
  description: string;
  url: string;
  order: number;
  duration: number;
  thumbnail: null;
  course_id: number;
}

interface FileObject {
  name: string;
  id: null | string;
  updated_at: null | string;
  created_at: null | string;
  last_accessed_at: null | string;
  metadata: null | object;
}

interface EditCourseFormProps {
  course: Course;
  lessons: Lesson[];
  userId: string;
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  course,
  lessons,
  userId,
}) => {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState(course.title);
  const [videos, setVideos] = useState<FileObject[]>([]);

  const [description, setDescription] = useState(course.description);

  useEffect(() => {
    async function getVideos() {
      const { data, error } = await supabase.storage
        .from("videos")
        .list(userId + "/" + course.id + "/");
      if (error) console.error(error);
      else setVideos(data);
    }
    getVideos();
  }, [supabase]);
  console.log(videos);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("courses")
        .update({ title, description })
        .eq("id", course.id);

      if (error) {
        console.error(error);
      } else {
        alert("Curso atualizado com sucesso!");
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLesson = async (lesson: Lesson) => {
    if (
      window.confirm(`Tem certeza que deseja deletar a lesson ${lesson.title}?`)
    ) {
      try {
        const { data, error } = await supabase
          .from("lessons")
          .delete()
          .eq("id", lesson.id);
        if (error) {
          console.error(error);
          // Você pode exibir um erro para o usuário
        } else {
          console.log(data);
          router.refresh();
          // Você pode redirecionar o usuário para uma página de sucesso ou atualizar a lista de lessons
        }
      } catch (error) {
        console.error(error);
        // Você pode exibir um erro para o usuário
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Editar Curso</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Título:
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Atualizar Curso
        </button>
      </form>

      <div>
        <ul className=" max-w-md mx-auto p-4 bg-white rounded shadow-md">
          {lessons?.map((lesson) => (
            <li
              key={lesson.id}
              className="flex justify-between *:py-2 border-b border-gray-200 last:border-b-0"
            >
              <Link href={`/admin/lesson-details/${lesson.id}`}>
                {lesson.title}
              </Link>
              <button
                onClick={() => handleDeleteLesson(lesson)}
                className="text-red-500 border p-1 border-red-500"
              >
                Deletar aula
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditCourseForm;