import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { Lesson } from "@/types";

interface LessonsListProps {
  lessons: Lesson[];
  courseId: number;
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons, courseId }) => {
  return (
    <div className="mt-10 bg-white rounded-lg shadow-md p-6 space-y-3">
      <label className="block text-xl font-medium mb-4">Aulas do curso:</label>
      {lessons.length ? (
        <ul>
          {lessons?.map((lesson) => (
            <li
              key={lesson.id}
              className="flex justify-between py-3 border-b border-gray-200 last:border-b-0"
            >
              <Link href={`/admin/lesson-details/${lesson.id}`}>
                {lesson.title}
              </Link>
              <Button
                onClick={() => console.log(lesson)}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-lg transition"
              >
                Deletar aula
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma aula cadastrada</p>
      )}
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition mt-5">
        <Link href={`/admin/new-lesson/${courseId}`}>Criar nova aula</Link>
      </button>
    </div>
  );
};

export default LessonsList;
