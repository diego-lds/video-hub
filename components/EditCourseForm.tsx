"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { updateCourseDetails } from "@/app/actions/courses";

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

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  image_path: string;
  lessons: Lesson[] | [];
  topics: Topic[] | [];
}

interface CourseDetailsProps {
  courseDetails: CourseDetails;
}

const EditCourseForm: React.FC<CourseDetailsProps> = ({ courseDetails }) => {
  const router = useRouter();

  const [course, setCourse] = useState<CourseDetails>(courseDetails);

  const [title, setTitle] = useState(courseDetails?.title);
  const [description, setDescription] = useState(courseDetails?.description);
  const [topics, setTopics] = useState<Topic[]>(courseDetails?.topics);
  const [lessons, setLessons] = useState<Lesson[]>(courseDetails?.lessons);
  const [newTopic, setNewTopic] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const courseData = {
      id: courseDetails?.id,
      title,
      description,
      newImage,
    };
    console.log(courseData);
    const { error } = await updateCourseDetails(courseData);

    if (error) {
      console.error(error);
    } else {
      alert("Curso atualizado com sucesso!");
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Editar Curso</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <label className="block  text-xl font-medium mb-2">
          Informações do curso
        </label>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Título:
          </label>
          <input
            type="text"
            value={course.title}
            onChange={(event) => setTitle(event.target.value)}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Descrição:
          </label>
          <textarea
            value={course.description}
            onChange={(event) => setDescription(event.target.value)}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Foto de capa atual:
          </label>
          <Image
            src={course.image_path}
            alt="Course image"
            width={200}
            height={200}
            className="rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Alterar foto de capa:
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview image"
              className="w-64 h-auto mt-4 rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Atualizar Informações do curso
        </button>
      </form>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 space-y-3">
        <label className="block  text-xl font-medium mb-4">
          Tópicos de aprendizagem:
        </label>
        <ul className="space-y-2">
          {course.topics?.map((topic) => (
            <li
              key={topic.topic}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              {topic.topic}
              <a
                onClick={() => console.log(topic)}
                className="text-red-600 hover:text-red-800 cursor-pointer transition"
              >
                ❌️
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-4">
          <input
            type="text"
            value={newTopic}
            onChange={(event) => setNewTopic(event.target.value)}
            className="flex-1 py-2 px-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Adicionar tópico"
          />
          <button
            onClick={() => console.log("ADDTopic")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Adicionar tópico
          </button>
        </div>
      </div>

      <div className=" mt-10 bg-white rounded-lg shadow-md p-6 space-y-3">
        <label className="block  text-xl font-medium mb-4">
          Aulas do curso:
        </label>
        <ul>
          {course.lessons?.map((lesson) => (
            <li
              key={lesson.id}
              className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"
            >
              <Link href={`/admin/lesson-details/${lesson.id}`}>
                {lesson.title}
              </Link>
              <Button
                onClick={() => console.log(lesson)}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-lg transition"
              >
                Deletar aula
              </Button>
            </li>
          ))}
        </ul>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition mt-5">
          <Link href={`/admin/new-lesson/${courseDetails.id}`}>
            Criar nova aula
          </Link>
        </button>
      </div>
    </div>
  );
};
export default EditCourseForm;
