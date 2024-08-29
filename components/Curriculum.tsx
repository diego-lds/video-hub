import React from "react";

interface Lesson {
  title: string;
  duration: number;
}

interface CurriculumProps {
  title: string;
  lessons: Lesson[];
}

const Curriculum: React.FC<CurriculumProps> = ({ title, lessons }) => {
  const totalDuration = lessons.reduce(
    (acc, lesson) => acc + lesson.duration,
    0
  );
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2 mb-2 bg-neutral-200 ">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm">
          {lessons.length} aulas - {totalHours}h {totalMinutes % 60}min
          <span className="ml-2">🕒</span>
        </p>
      </div>
      <ul>
        {lessons.map((lesson, index) => {
          const minutes = Math.floor(lesson.duration / 60);
          const hours = Math.floor(minutes / 60);

          return (
            <li key={index} className="flex p-2 justify-between items-center">
              <h3 className="text-md underline">{lesson.title}</h3>
              <p className="text-sm">
                {hours}h {minutes % 60} min <span className="ml-2">⏰</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Curriculum;
