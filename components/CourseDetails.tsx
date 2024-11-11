"use client";
import { Course } from "@/types";
import Image from "next/image";

import React, { useState } from "react";
import FileInput from "./FileInput";
import Button from "./Button";
import { updateCourseDetails } from "@/app/actions/courses";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

interface Props {
  course: Course;
}

const CourseDetails: React.FC<Props> = ({ course }: Props) => {
  const [title, setTitle] = useState<string>(course.title);
  const [description, setDescription] = useState(course.description);
  const [imageUrl] = useState<string | null>(course.image_url);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", course?.id.toString());
    if (image) {
      formData.append("image", image);
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
    <div className="space-y-6 ">
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
              name="title"
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
              name="description"
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
          src={imageUrl || "/placeholder.jpg"}
          alt="Course image"
          width={200}
          height={150}
          className="border mb-2"
        />
        <div className="mt-4">
          <FileInput onChange={setImage} label="Atualizar foto de capa" />
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
