import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/utils/formatUtils";
import { getMyCoursesAction } from "../actions/courses";
import Separator from "@/components/Separator";
import Button from "@/components/Button";

export default async function Admin() {
  const { data: courses } = await getMyCoursesAction();
  return (
    <div className="flex flex-col">
      <h1>Meus cursos | edição</h1>
      <ul className="my-12">
        {courses?.map((course) => (
          <Link href={`/admin/edit-course/${course.id}`}>
            <li
              key={course.id}
              className="flex p-4 hover:bg-slate-200 transition duration-300 ease-in-out"
            >
              <div className="min-w-64 min-h-36">
                <Image
                  width={256}
                  height={144}
                  src={course.image_path || "/placeholder.png"}
                  alt={course.title}
                  className="aspect-video object-cover rounded"
                />
              </div>
              <div className="flex flex-col justify-between px-4">
                <h4 className="underline">{course.title}</h4>
                <p>{course.description}</p>
                <span>Criado em: {formatDateString(course.created_at)}</span>
              </div>
            </li>
            <Separator />
          </Link>
        ))}
      </ul>
      <Button>
        <Link href="/admin/new-course">Novo Curso</Link>
      </Button>
    </div>
  );
}
