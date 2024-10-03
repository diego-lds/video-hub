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

// {
//   lessons: [
//     {
//       id: 33,
//       created_at: '2024-10-02T23:53:54.711851+00:00',
//       title: '161616',
//       description: '16161616',
//       video_id: 'f309aa50-a343-472c-8da5-13b137e62f41/16/aula-7.mp4',
//       order: null,
//       duration: null,
//       course_id: 16
//     }
//   ]
// }

interface VideoPlayerProps {
  lessons: LessonProps[] | null;
  courseId: string;
  user: any;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lessons,
  courseId,
  user,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonProps | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const supabase = createClient();
  useEffect(() => {
    setCurrentLesson(lessons?.[0] || null);
  }, []);

  const handleClick = async (lesson: LessonProps) => {
    const { data, error } = await supabase.storage
      .from("public-videos")
      .getPublicUrl(lesson?.video_path || "");

    if (error) {
      console.error(error);
    } else {
      setUrl(data.publicUrl);
    }
  };

  console.log(url);

  return (
    <>
      {currentLesson && <h1>{currentLesson.title}</h1>}
      <main className="flex ">
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
        <aside className="p-1 w-64">
          <ul>
            {lessons?.map((lesson, index) => (
              <li
                key={index}
                className={`flex flex-col rounded-md border border-gray-200 p-2 ${
                  currentLesson?.id === lesson.id ? "border-gray-500" : ""
                }`}
                onClick={() => handleClick(lesson)}
              >
                <p className="flex items-center gap-2">
                  <span className="text-sm text-red-500 border border-red-300 cursor-pointer px-1 select-none">
                    ▶️
                  </span>
                  <span className="text-lg font-bold">{lesson.title}</span>
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  );
};

export default VideoPlayer;
