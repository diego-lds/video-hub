import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/utils/formatUtils";
import { getMyCoursesAction } from "../actions/courses";

export default async function Admin() {
  const { data: courses } = await getMyCoursesAction();
  return (
    <div className="container p-2 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Meus cursos | edição</h1>
      <ul className="list-none p-2 border border-gray-300 rounded-sm mt-4">
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
                width={150}
                height={120}
                src={course.image_path || "/placeholder.jpg"}
                alt={course.title}
                className="mr-4 aspect-video w-32 outline object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm my-3 text-pretty">{course.description}</p>
                <p className="text-sm font-semibold">
                  Criado em:{formatDateString(course.created_at)}
                </p>
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
