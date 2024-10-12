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
  id?: string;
  course_id: string;
  topic: string;
}

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  image_path: string;
  lessons: Lesson[] | [];
  learning_topics: Topic[] | [];
}

interface CourseDetailsProps {
  courseDetails: CourseDetails;
}

const EditCourseForm: React.FC<CourseDetailsProps> = ({ courseDetails }) => {
  const router = useRouter();

  const {
    title: initTitle,
    description: initDescription,
    lessons: initLessons,
    learning_topics,
    image_path,
  } = courseDetails;

  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [topics, setTopics] = useState<Topic[] | []>(learning_topics);
  const [lessons] = useState<Lesson[] | []>(initLessons);
  const [coverImage] = useState<string | null>(image_path);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleAddTopic = async (topic: string) => {
    if (!topic) return;

    const formData = new FormData();
    formData.set("course_id", courseDetails.id.toString());
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

  const handleImageChange = (file: File) => {
    if (file) {
      processImageFile(file).then((processedImage) => {
        setNewImage(file);
        setPreviewImage(processedImage);
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("id", courseDetails?.id.toString());
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Editar Curso</h1>

      <CourseInfoForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={handleSubmit}
      />

      <ImageUploader
        currentImage={coverImage}
        previewImage={previewImage}
        onImageChange={handleImageChange}
      />

      <TopicsList
        topics={topics}
        onAddTopic={handleAddTopic}
        onDeleteTopic={handleDeleteTopic}
      />

      <LessonsList lessons={lessons} courseId={courseDetails.id} />
    </div>
  );
};
export default EditCourseForm;
