"use client";

import { secondsToMinutes } from "@/utils/formatUtils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface Props {
  controls: boolean;
}

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

const VideoPlayer: React.FC<Props & { lessons: LessonProps[] | null }> = ({
  controls = true,
  lessons,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonProps | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (lessons?.length) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons]);

  if (!isClient) {
    return null; // Não renderiza nada até que o componente esteja no cliente
  }

  const supabase = createClient();
  const { data, error } = supabase.storage
    .from("videos")
    .getPublicUrl(currentLesson?.video_path);

  console.log({ currentLesson });

  return (
    <>
      <main className="flex ">
        <ReactPlayer
          url={data?.publicUrl}
          controls={controls}
          playing={false}
          height="100%"
          width="100%"
          style={{ aspectRatio: "16/9", height: "480px" }}
        />
        <aside className="p-1 w-64">
          <ul>
            {lessons?.map((lesson) => (
              <li key={lesson.id}>
                <a
                  className="cursor-pointer"
                  onClick={() => setCurrentLesson(lesson)}
                >
                  <h2
                    className={`text-sm underline ${
                      lesson.id === currentLesson?.id ? "font-bold" : ""
                    }`}
                  >
                    {lesson.title}
                  </h2>
                </a>

                <p className="text-sm text-gray-500">
                  📽️ {secondsToMinutes(lesson.duration)}m
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <footer className="py-8">
        <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>

        <p>{currentLesson?.description}</p>
      </footer>
    </>
  );
};

export default VideoPlayer;
