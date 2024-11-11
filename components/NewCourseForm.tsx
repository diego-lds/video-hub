"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createCourse } from "@/app/actions/courses";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import Input from "./Input";
import TextArea from "./TextArea";
import FileInput from "./FileInput";
import Image from "next/image";
export default function NewCourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const { data, error } = await createCourse(formData);

    setLoading(false);

    if (error) {
      toast.error("Failed to create course.");
    } else {
      toast.success("Curso criado com sucesso!");
      router.push("/my-courses");
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        name="title"
        label="Título"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        name="description"
        label="Descrição"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Imagem de capa</label>
      <FileInput onChange={handleImageChange} name="image" />

      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Preview da Imagem: {imageFile?.name}
          </p>
          <Image
            src={imagePreview}
            alt="Preview"
            width={250}
            height={250}
            className=" object-cover"
          />
        </div>
      )}
      <Button type="submit" size={"lg"} disabled={loading}>
        {loading ? "Criando..." : "Criar curso"}
      </Button>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </form>
  );
}
