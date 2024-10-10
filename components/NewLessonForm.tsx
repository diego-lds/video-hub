"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewLesson } from "@/app/actions/courses";
export default function NewLessonForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setVideo(file ? file : null);
  };

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

    setLoading(true);

    if (error) {
      console.log("Erro ao criar a aula", error);
    } else {
      alert("Aula criada com sucesso");
      router.push("/admin/edit-course/" + courseId);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            rows={4}
            required
          />
        </div>

        <section>
          <div>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
          </div>
        </section>
        <button
          type="submit"
          className="bg-blue-500 w-52 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Criar aula"}
        </button>
      </form>
    </div>
  );
}
