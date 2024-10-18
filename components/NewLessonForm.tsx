"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewLesson } from "@/app/actions/courses";
import Button from "./Button";
import useFileUpload from "@/app/hooks/useFileUpload";
import InputVideo from "./InputVideo";
import { Progress } from "./ui/progress";
export default function NewLessonForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { progress, uploading, uploadFile } = useFileUpload();

  const router = useRouter();

  const bucketName = "public-videos";

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    if (file.size >= 50 * 1024 * 1024) {
      setFile(null);
      alert("O arquivo deve ser menor que 50 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", courseId.toString());
    formData.append("title", title);
    formData.append("description", description);
    setLoading(true);

    const { data, error } = await createNewLesson(formData);

    setLoading(false);

    if (error) {
      console.log("Erro ao criar a aula", error);
    } else {
      const lessonId = data.id;
      const path = `lessons/${lessonId}/${file.name}`;
      await uploadFile(bucketName, path, file)
        .then((url) => {
          console.log("Arquivo enviado com sucesso:", url);
        })
        .catch((error) => {
          console.error("Erro ao enviar o arquivo:", error);
        });
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

        <InputVideo onVideoChange={handleFileChange} />

        <Button type="submit" disabled={loading}>
          {loading ? "Criando aula..." : "Criar aula"}
        </Button>

        {progress > 0 && <p>Subindo video para o servidor</p>}

        <Progress value={progress} />
      </form>
    </div>
  );
}
