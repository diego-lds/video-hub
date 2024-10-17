"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewLesson } from "@/app/actions/courses";
import FileUpload from "./FileUpload";
import Button from "./Button";
export default function NewLessonForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    if (!video) return;
    e.preventDefault();
    const formData = new FormData();

    formData.append("course_id", courseId.toString());
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    setLoading(true);

    const { data, error } = await createNewLesson(formData);

    setLoading(false);
    if (error) {
      console.log("Erro ao criar a aula", error);
    } else {
      alert("Aula criada com sucesso");
      router.push("/admin/edit-course/" + courseId);
    }
  };

  return (
    <div className="min-h-screen">
      <h2>Criar nova aula</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>
        <FileUpload />

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar daula"}
        </Button>
      </form>
    </div>
  );
}
