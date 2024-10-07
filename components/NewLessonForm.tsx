"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function NewLessonForm({
  courseId,
  user,
}: {
  courseId: string | null;
  user: {
    id: string;
  } | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setVideo(file ? file : null);
  };

  const handleUpload = async () => {
    if (!video || !user) return;

    setUploading(true);
    const supabase = createClient();
    const filePath = user.id + "/" + courseId + "/" + video.name;

    const { data: uploadResponse, error: uploadError } = await supabase.storage
      .from("public-videos")
      .upload(filePath, video, { upsert: true });

    console.log({ uploadResponse, title, description });

    if (!uploadError) {
      const { data: newLesson, error: newLessonErr } = await supabase
        .from("lessons")
        .insert([
          {
            title,
            description,
            course_id: courseId,
            video_path: uploadResponse.path,
          },
        ]);
      setLoading(false);
      if (newLessonErr) {
        console.error("Error creating lesson:", newLessonErr.message);
        alert("Failed to create lesson.");
      } else {
        console.log({ newLesson });
        setSuccessMessage("lesson created successfully!");
        setTitle("");
        setDescription("");
        router.push("/admin/course-details/" + courseId);
      }

      if (newLessonErr) {
        setError(newLessonErr.message);
      } else {
        console.log("Video carregado com sucesso!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!video || !user) return;
    e.preventDefault();

    setLoading(true);
    await handleUpload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Title
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
            Lesson Description
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
            {/* <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Carregando..." : "Carregar Vídeo"}
            </button> */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </section>
        <button
          type="submit"
          className="bg-blue-500 w-52 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Criar aula"}
        </button>
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
