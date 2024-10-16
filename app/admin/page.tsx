import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/utils/formatUtils";
import { getMyCoursesAction } from "../actions/courses";

export default async function Admin() {
  const { data: courses } = await getMyCoursesAction();
  return (
    <div className="p-4 flex flex-col ">
      <h1>Meus cursos | edição</h1>
      <ul className="list-none p-2 rounded-sm mt-4">
        {courses?.map((course) => (
          <li
            key={course.id}
            className="mb-2 ml-2 border-b p-2 border-gray-300 hover:bg-gray-200"
          >
            <a
              href={`/admin/edit-course/${course.id}`}
              className="flex items-center"
            >
              <Image
                width={256}
                height={150}
                src={course.image_path || "/placeholder.png"}
                alt={course.title}
                className="mr-4 aspect-video min-w-64 min-h-32  object-cover"
              />
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>Criado em: {formatDateString(course.created_at)}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/admin/new-course"
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded text-center shadow mt-4"
      >
        + novo curso
      </Link>
    </div>
  );
}
