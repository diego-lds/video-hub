"use client";

import { VideoIcon, PlayIcon, BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import NoSSR from "@/components/NoSSR";
interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  course_id: number;
}

interface VideoPlayerProps {
  lessons: Lesson[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lessons }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(lessons[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; //
  }
  const handleClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  return (
    <main className="flex flex-col mt-4 p-4 bg-white rounded-lg shadow-lg">
      {currentLesson && (
        <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
      )}
      {currentLesson && (
        <h2 className="text-md text-gray-600 mb-4">
          {currentLesson.description}
        </h2>
      )}
      <div className="w-full h-96 aspect-video border border-gray-300 rounded-lg overflow-hidden mb-5">
        {currentLesson ? (
          <ReactPlayer
            url={currentLesson.video_url}
            controls={true}
            playing={false}
            height="100%"
            width="100%"
          />
        ) : (
          <div className="flex flex-1 aspect-video items-center justify-center">
            <p className="text-3xl font-bold">Carregando...</p>
          </div>
        )}
      </div>
      <h1 className="flex items-center text-2xl font-semibold m-3 gap-3">
        <BookOpenCheck />
        Aulas
      </h1>
      <ul className="space-y-2">
        {lessons?.map((lesson, index) => (
          <li
            key={lesson.id}
            className={`flex items-center border border-gray-300 p-4 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out hover:bg-slate-100 hover:border-blue-500 ${
              currentLesson?.id === lesson.id
                ? "bg-slate-200 border-blue-500"
                : ""
            }`}
            onClick={() => handleClick(lesson)}
          >
            <PlayIcon className="text-red-500 mr-3" />
            <span className="flex flex-col">
              <span className="text-md font-semibold">
                Aula {index + 1} - {lesson.title}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default VideoPlayer;
