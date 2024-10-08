"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface LessonProps {
  id: number;
  created_at: string;
  title: string;
  description: string;
  video_path: string;
  order: number;
  duration: number;
  thumbnail: string | null;
  course_id: number;
}

interface LessonFormProps {
  lesson: LessonProps;
}

const LessonForm = ({ lesson }: LessonFormProps) => {
  const [localLesson, setLocalLesson] = useState<LessonProps>(lesson);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalLesson({ ...localLesson, [name]: value });
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLocalLesson({ ...localLesson, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode fazer o que quiser com a lesson, como salvar no servidor
  };
  const supabase = createClient();
  const { data: video } = supabase.storage
    .from("public-videos")
    .getPublicUrl("f309aa50-a343-472c-8da5-13b137e62f41/1/aula-7.mp4");

  console.log(video);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-4 bg-white rounded shadow-md"
    >
      <h1 className="text-3xl font-bold mb-4">
        Lesson details {localLesson.id}
      </h1>
      <label className="block text-lg mb-2">Title:</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-400 rounded"
        value={localLesson.title}
        onChange={handleInputChange}
        name="title"
      />
      <label className="block text-lg mb-2">Description:</label>
      <textarea
        className="w-full p-2 mb-4 border border-gray-400 rounded"
        value={localLesson.description}
        onChange={handleTextAreaChange}
        name="description"
      />
      <label className="block text-lg mb-2">Video ID:</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-400 rounded"
        value={localLesson.video_path}
        onChange={handleInputChange}
        name="videoId"
      />

      <label className="block text-lg mb-2">Course ID:</label>
      <input
        type="number"
        className="w-full p-2 mb-4 border border-gray-400 rounded"
        value={localLesson.course_id}
        onChange={handleInputChange}
        name="course_id"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default LessonForm;
