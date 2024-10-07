"use client";

import { secondsToMinutes } from "@/utils/formatUtils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface LessonProps {
  id: number;
  created_at: string;
  title: string;
  description: string;
  video_path: string | null;
  order: number;
  duration: number;
  thumbnail: string | null;
  course_id: number;
}

interface VideoPlayerProps {
  lessons: LessonProps[] | null;
  courseId: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lessons }) => {
  const [currentLesson, setCurrentLesson] = useState<LessonProps | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const supabase = createClient();
  useEffect(() => {
    const firstLesson = lessons?.[0] || null;

    setCurrentLesson(firstLesson);

    const { data } = supabase.storage
      .from("public-videos")
      .getPublicUrl(firstLesson?.video_path || "");

    setUrl(data.publicUrl);
  }, []);

  const handleClick = async (lesson: LessonProps) => {
    const { data } = supabase.storage
      .from("public-videos")
      .getPublicUrl(lesson?.video_path || "");

    setUrl(data.publicUrl);
    setCurrentLesson(lesson);
  };

  return (
    <>
      {currentLesson && <h1 className="text-3xl">{currentLesson.title}</h1>}
      <main className="flex flex-col">
        {url && (
          <ReactPlayer
            url={url}
            controls={true}
            playing={false}
            height="100%"
            width="100%"
            style={{ aspectRatio: "16/9", height: "480px" }}
          />
        )}
        <div>
          <ul>
            {lessons?.map((lesson, index) => (
              <li
                key={index}
                className={`flex flex-col  border border-gray-200 p-2 ${
                  currentLesson?.id === lesson.id ? "border-gray-500" : ""
                }`}
                onClick={() => handleClick(lesson)}
              >
                <p className="flex items-center gap-2">
                  <span className="text-sm text-red-500 border border-red-300 cursor-pointer px-1 select-none">
                    ▶️
                  </span>
                  <span className="text-sm font-bold">{lesson.title}</span>
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
