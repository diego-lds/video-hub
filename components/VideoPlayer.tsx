"use client";

import { getLessonVideoUrl } from "@/app/actions/courses";
import { secondsToMinutes } from "@/utils/formatUtils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface Lesson {
  id: number;
  title: string;
  description: string;
  video_path: string;
  course_id: number;
}

interface VideoPlayerProps {
  lessons: Lesson[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lessons }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(lessons[0]);
  const [url, setUrl] = useState<string>("");

  const fetchVideoUrl = () => {
    const supabase = createClient();

    const { data } = supabase.storage
      .from("public-videos")
      .getPublicUrl(currentLesson?.video_path.toString());
    setUrl(data?.publicUrl);
  };

  useEffect(() => {
    fetchVideoUrl();
  }, [currentLesson]);

  const handleClick = async (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };
  console.log(url);
  return (
    <>
      {currentLesson && (
        <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
      )}
      {currentLesson && (
        <h2 className="text-sm">{currentLesson.description}</h2>
      )}

      <main className="flex flex-col mt-2">
        <div className="w-full h-96 aspect-ratio-16/9 border border-gray-300 rounded-sm mb-5">
          {url ? (
            <ReactPlayer
              url={url}
              controls={true}
              playing={false}
              height="100%"
              width="100%"
            />
          ) : (
            <div className="h-96  flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">Carregando...</p>
            </div>
          )}
        </div>
        <div>
          <ul>
            <h1 className="text-2xl">Conteúdo do curso</h1>
            {lessons?.map((lesson, index) => (
              <li
                key={index}
                className={`flex flex-col  border-gray-300 p-2 hover:bg-slate-100 hover:text-blue-500 ${
                  currentLesson?.id === lesson.id
                    ? "border border-gray-500"
                    : ""
                }`}
                onClick={() => handleClick(lesson)}
              >
                <p className="flex items-center gap-2">
                  <span className="text-md text-red-500 border border-red-300 cursor-pointer px-1 select-none">
                    ▶️
                  </span>
                  <span className="text-md font-bold">{lesson.title}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default VideoPlayer;
