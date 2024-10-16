"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  addNewTopic,
  deleteTopic,
  updateCourseDetails,
} from "@/app/actions/courses";
import { processImageFile } from "@/utils/imageUtils";
import CourseInfoForm from "./CourseInfoForm";
import ImageUploader from "./ImageUploader";
import TopicsList from "./TopicList";
import LessonsList from "./LessonList";
import { Lesson } from "@/types";
import Separator from "./Separator";

interface Topic {
  id?: string;
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
  console.log(lessons);
  const handleAddTopic = async (topic: string) => {
    if (!topic) return;

    const formData = new FormData();
    formData.set("course_id", course.id.toString());
    formData.set("topic", topic);

    const { data, error } = await addNewTopic(formData);
    if (error) {
      console.log(error);
    } else {
      setTopics([...topics, data[0]]);
      console.log("Tópico adicionado com sucesso!");
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    const { error } = await deleteTopic(topicId);
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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
        >
          Atualizar Informações do curso
        </button>
      </form>

      <Separator />
      <TopicsList
        topics={topics}
        onAddTopic={handleAddTopic}
        onDeleteTopic={handleDeleteTopic}
      />
      <Separator />

      <LessonsList lessons={lessons} courseId={course.id} />
    </div>
  );
};

export default EditCourseForm;
