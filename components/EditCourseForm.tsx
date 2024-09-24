"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
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

interface Topic {
  topic: string;
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
  lessons: null | Lesson[];
  userId: string;
  topics: null | Topic[];
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  course,
  lessons,
  userId,
  topics: initialTopics,
}) => {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState(course.title);
  const [videos, setVideos] = useState<FileObject[]>([]);
  const [topics, setTopics] = useState<Topic[]>(initialTopics ?? []);
  const [newTopic, setNewTopic] = useState("");

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
        } else {
          console.log(data);
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddTopic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTopic) {
      try {
        const { data, error } = await supabase
          .from("learningTopics")
          .insert([{ course_id: course.id, topic: newTopic }]);
        if (error) {
          console.error(error);
        } else {
          setTopics([...topics, { topic: newTopic }]);
          setNewTopic("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTopic = async (topic: Topic) => {
    try {
      const { data, error } = await supabase
        .from("learningTopics")
        .delete()
        .eq("course_id", course.id)
        .eq("topic", topic.topic);
      if (error) {
        console.error(error);
      } else {
        setTopics(topics.filter((t) => t.topic !== topic.topic));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full   p-4 bg-white rounded shadow-md"
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Atualizar Descrilção e título
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tópicos de aprendizagem:
          </label>
          <ul className="flex flex-col justify-between">
            {topics.map((topic) => (
              <li
                key={topic.topic}
                className="flex max-w-lg justify-between items-center p-1 m-1 bg-gray-200"
              >
                {topic.topic}
                <a
                  onClick={() => handleDeleteTopic(topic)}
                  className="ml-2 cursor-pointer"
                >
                  ❌️
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-5">
            <input
              type="text"
              value={newTopic}
              onChange={(event) => setNewTopic(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Adicionar tópico"
            />
            <Button
              onClick={handleAddTopic}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </form>

      <div>
        <ul className=" max-w-full mx-auto p-4 bg-white rounded shadow-md">
          {lessons?.map((lesson) => (
            <li
              key={lesson.id}
              className="flex justify-between *:py-2 border-b border-gray-200 last:border-b-0"
            >
              <Link href={`/admin/lesson-details/${lesson.id}`}>
                {lesson.title}
              </Link>
              <Button
                onClick={() => handleDeleteLesson(lesson)}
                className="text-white rounded-sm p-2 bg-red-700 hover:bg-red-900"
              >
                Deletar aula
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default EditCourseForm;
