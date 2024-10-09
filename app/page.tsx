import Image from "next/image";

import Link from "next/link";
import { getCoursesAction } from "./actions/courses";

export default async function Index() {
  const { data: courses } = await getCoursesAction();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <Image width={474} height={125} src="/logo.png" alt="Logo" />

          <p className="text-xl  my-5 uppercase">
            Crie e disponibilize seus cursos online com facilidade!
          </p>
          <p className="font-light">
            Transforme seu conhecimento em uma fonte de renda, compartilhando
            suas habilidades com o mundo. Nossa plataforma oferece todas as
            ferramentas necessárias para que você possa desenvolver, hospedar e
            vender seus cursos online, sem complicações técnicas.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <Image
            src="/hero.svg"
            alt="Hero image"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="h-[2px] bg-gray-200 mt-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {courses?.map((course) => (
          <Link
            className="bg-white p-6 rounded-md shadow-lg"
            key={course.id}
            href={`/course-details/${course.id}`}
          >
            <div className="relative h-48 w-full">
              <Image
                src={course.image_path || "/placeholder.jpg"}
                alt={course.title}
                fill
                className="object-cover "
              />
            </div>
            <div className="h-32">
              <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
              <p className="line-clamp-3 text-base  text-gray-500 mt-3">
                {course.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
