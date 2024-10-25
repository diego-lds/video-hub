import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/utils/formatUtils";
import { getMyCoursesAction } from "../actions/courses";
import Separator from "@/components/Separator";
import { Button } from "@/components/ui/button";

export default async function MyCoursesPage() {
  const { data: courses } = await getMyCoursesAction();

  return (
    <div className="flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Meus cursos | criar | edição</h1>
      <Button className="mb-5">
        <Link href="/my-courses/new-course">Cria novo curso</Link>
      </Button>
      <ul className="mt-5 space-y-4">
        {courses?.map((course) => (
          <Link key={course.id} href={`/my-courses/edit-course/${course.id}`}>
            <li className="flex flex-col md:flex-row p-4 hover:bg-slate-200 transition duration-300 ease-in-out rounded-lg">
              <div className="min-w-64 min-h-36">
                <Image
                  width={256}
                  height={144}
                  src={course.image_url || "/placeholder.png"}
                  alt={course.title}
                  className="aspect-video object-cover rounded"
                />
              </div>
              <div className="flex flex-col justify-between p-2">
                <h4 className="">{course.title}</h4>
                <p className="text-sm md:text-base">{course.description}</p>
                <span className="text-xs text-gray-500">
                  Criado em: {formatDateString(course.created_at)}
                </span>
              </div>
            </li>
            <Separator />
          </Link>
        ))}
      </ul>
    </div>
  );
}
