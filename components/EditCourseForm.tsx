"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateCourseDetails } from "@/app/actions/courses";
import { addNewTopic, deleteTopic } from "@/app/actions/topics";
import { Course, Lesson, Topic } from "@/types";
import Separator from "./Separator";
import { Button } from "./ui/button";
import Link from "next/link";
import FileInput from "./FileInput";
import Image from "next/image";
import { deleteLesson } from "@/app/actions/lessons";
import { toast } from "sonner";

interface CourseDetailsProps {
  course: Course;
  lessons: any[];
  topics: any[];
}

const EditCourseForm: FC<CourseDetailsProps> = ({
  course,
  lessons: courseLessons,
  topics: courseTopics,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [topics, setTopics] = useState<Topic[]>(courseTopics);
  const [lessons, setLessons] = useState<Lesson[]>(courseLessons);
  const [image, setImage] = useState<string | null>(course.image_url);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newTopic, setNewTopic] = useState<string>("");

  const handleAddTopic = async (topic: string) => {
    const formData = new FormData();
    formData.set("course_id", course.id.toString());
    formData.set("topic", topic);

    const { data, error } = await addNewTopic(formData);

    if (error) {
      toast.error(error.message);
    } else {
      setTopics([...topics, data[0]]);
      setNewTopic("");
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    const { error } = await deleteTopic(topicId.toString());
    if (error) {
      toast.error(error.message);
    } else {
      setTopics(topics.filter((t) => t.id !== topicId));
      toast.success("Tópico removido com sucesso!");
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    const { error } = await deleteLesson(lessonId.toString());
    if (error) {
      toast.error(error.message);
    } else {
      setLessons(lessons.filter((t) => t.id !== lessonId));
      toast.error("Aula removida com sucesso!");
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
      toast.error(error.message);
    } else {
      toast.success("Curso atualizado com sucesso!");

      router.push("/my-courses");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="mb-6">Editar Curso</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Título:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Descrição:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={4}
            />
          </div>
        </div>
        <div className="mt-5">
          <Button type="submit">Atualizar Informações do curso</Button>
        </div>

        <h3 className="mt-8">Foto de capa:</h3>
        <Image
          src={image || "/placeholder.jpg"}
          alt="Course image"
          width={200}
          height={150}
          className="border mb-2"
        />
        <div className="mt-4">
          <FileInput onChange={setNewImage} label="Atualizar foto de capa" />
        </div>
      </form>

      <Separator />

      <Button onClick={() => handleAddTopic(newTopic)}>
        <Link href={`/my-courses/new-lesson/${course.id}`}>
          Criar nova aula
        </Link>
      </Button>

      {lessons.length > 0 && <h3>Aulas</h3>}
      <ul className="mt-4">
        {lessons &&
          lessons?.map((lesson) => (
            <li key={lesson.id} className="flex justify-between p-1 border-b">
              <label className="text-gray-600">{lesson.title}</label>
              <Button
                variant={"link"}
                onClick={() => handleDeleteLesson(lesson.id)}
              >
                <span className="text-red-500">Deletar aula</span>
              </Button>
            </li>
          ))}
      </ul>

      <h3 className="mt-6">Tópicos</h3>
      <div className="gap-2 mt-4">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Adicionar tópico"
          className="border border-gray-300 rounded-lg w-full p-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <Button size="lg" className="mt-2" onClick={() => handleAddTopic(newTopic)}>
          Adicionar tópico
        </Button>
      </div>

      <ul className="mt-4">
        {topics &&
          topics?.map((topic) => (
            <li key={topic.id} className="flex justify-between p-1 border-b">
              <label className="text-gray-600">{topic.topic}</label>
              <Button
                variant={"link"}
                onClick={() => handleDeleteTopic(topic.id)}
              >
                <span className="text-red-500">Deletar Topico</span>
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EditCourseForm;
