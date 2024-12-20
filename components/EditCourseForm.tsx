"use client";
import { FC } from "react";
import { useState } from "react";
import { updateCourseDetails } from "@/app/actions/courses";
import { Course, Lesson, Topic } from "@/types";
import Separator from "./Separator";
import { Button } from "./ui/button";
import Link from "next/link";
import FileInput from "./FileInput";
import Image from "next/image";
import { toast } from "sonner";
import Topics from "./Topics";
import { AddTopicButton } from "./AddTopicButton";
import Lessons from "./Lessons";
import CourseDetails from "./CourseDetails";
import { useRouter } from "next/router";

interface CourseDetailsProps {
  course: Course;
  lessons: any[];
  topics: Topic[] | null;
}

const EditCourseForm: FC<CourseDetailsProps> = ({
  course,
  lessons,
  topics,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState<string | null>(course.image_url);
  const [newImage, setNewImage] = useState<File | null>(null);

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
      <CourseDetails course={course} />

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
      <Link href={`/my-courses/new-lesson/${course.id}`}>
        <Button>Criar nova aula</Button>
      </Link>
      <Lessons data={lessons} />
      <Topics data={topics} />
      <AddTopicButton courseId={course.id} />
    </div>
  );
};

export default EditCourseForm;
