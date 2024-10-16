"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  addNewTopic,
  deleteTopic,
  updateCourseDetails,
} from "@/app/actions/courses";
import CourseInfoForm from "./CourseInfoForm";
import ImageUploader from "./ImageUploader";
import TopicsList from "./TopicList222";
import LessonsList from "./LessonList";
import { Lesson } from "@/types";
import Separator from "./Separator";
import Button from "./Button";
import AddTopicButton from "./AddTopicButton";
import Input from "./Input";
import GenericList from "./GenericList";

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
  image_path: string;
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
  const [image, setImage] = useState<string | null>(course.image_path);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newTopic, setNewTopic] = useState<string | null>("");

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
      console.log("Tópico adicionado com sucesso!");
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
      console.error(error);
    } else {
      alert("Curso atualizado com sucesso!");
      router.push("/admin");
    }
  };

  return (
    <div className="p-6   bg-white rounded-lg shadow-md space-y-6">
      <h1 className="mb-6">Editar Curso</h1>
      <form onSubmit={handleSubmit}>
        <CourseInfoForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={handleSubmit}
          image={image}
        />

        <ImageUploader onImageChange={handleImageChange} />

        <div className="mt-2">
          <Button type="submit">Atualizar Informações do curso</Button>
        </div>
      </form>
      <Separator />

      <h2>Tópicos</h2>
      <div className="flex gap-3 mt-4">
        <Input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Adicionar tópico"
        />

        <Button onClick={handleAddTopic}>Adicionar tópico</Button>
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
    </div>
  );
};

export default EditCourseForm;
