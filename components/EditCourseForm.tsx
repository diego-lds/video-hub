"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  addNewTopic,
  deleteTopic,
  updateCourseDetails,
} from "@/app/actions/courses";
import CourseInfo from "./CourseInfo";
import ImageUploader from "./ImageUploader";
import { Lesson } from "@/types";
import Separator from "./Separator";
import Button from "./Button";
import Link from "next/link";
import InputFile from "./FileInput";
import FileInput from "./FileInput";
import { revalidatePath } from "next/cache";

interface Topic {
  id: number;
  course_id: string;
  topic: string;
}

interface CourseDetailsProps {
  course: Course;
  lessons: any[];
  topics: any[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const EditCourseForm: React.FC<CourseDetailsProps> = ({
  course,
  lessons: courseLessons,
  topics: courseTopics,
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [topics, setTopics] = useState<Topic[] | []>(courseTopics);
  const [lessons] = useState<Lesson[] | []>(courseLessons);
  const [image, setImage] = useState<string | null>(course.image_url);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newTopic, setNewTopic] = useState<string>("");

  const handleAddTopic = async () => {
    if (!newTopic) return;

    const formData = new FormData();
    formData.set("course_id", course.id.toString());
    formData.set("topic", newTopic);

    const { data, error } = await addNewTopic(formData);

    if (error) {
      console.log(error);
    } else {
      setTopics([...topics, data[0]]);
      setNewTopic("");
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    if (!topicId) return;
    const { error } = await deleteTopic(topicId.toString());
    if (error) {
      console.log(error);
    } else {
      setTopics(topics.filter((t) => t.id !== topicId));
      console.log("Tópico removido com sucesso!");
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setNewImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", course?.id.toString());
    formData.append("title", title);
    formData.append("description", description);

    if (newImage) {
      formData.append("image", newImage);
    }

    const { error } = await updateCourseDetails(formData);

    if (error) {
      alert(error.message);
    } else {
      alert("Curso atualizado com sucesso!");

      router.push("/admin");
    }
  };

  return (
    <div className="p-6   bg-white rounded-lg shadow-md space-y-6">
      <h1 className="mb-6">Editar Curso</h1>
      <form onSubmit={handleSubmit}>
        <CourseInfo
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          image={image}
        />

        <div className="mt-2">
          <label>Atualizar foto de capa</label>
          <FileInput onChange={setNewImage} />
        </div>

        <div className="mt-5">
          <Button type="submit">Atualizar Informações do curso</Button>
        </div>
      </form>
      <Separator />

      <h2>Tópicos</h2>
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Adicionar tópico"
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <Button size="lg" onClick={handleAddTopic}>
          Adicionar tópico
        </Button>
      </div>

      {
        <ul className="">
          {topics &&
            topics?.map((topic) => (
              <li key={topic.id} className="flex justify-between p-1">
                <label className="underline">{topic.topic}</label>
                <Button
                  variant={"link"}
                  onClick={() => handleDeleteTopic(topic.id)}
                >
                  <span className="underline text-red-500">Deletar Topico</span>
                </Button>
              </li>
            ))}
        </ul>
      }

      <h2>Aulas</h2>
      {
        <ul className="">
          {lessons &&
            lessons?.map((lesson) => (
              <li key={lesson.id} className="flex justify-between p-1">
                <label className="underline">{lesson.title}</label>
                <Button
                  variant={"link"}
                  onClick={() => handleDeleteTopic(lesson.id)}
                >
                  <span className="underline text-red-500">Deletar aula</span>
                </Button>
              </li>
            ))}
        </ul>
      }
      <Separator />
      <Button size="lg" onClick={handleAddTopic}>
        <Link href={`/admin/new-lesson/${course.id}`}>Criar nova aula</Link>
      </Button>
    </div>
  );
};

export default EditCourseForm;
