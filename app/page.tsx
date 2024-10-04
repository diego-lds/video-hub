import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, description, image_path")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <h1 className="text-6xl font-bold">Video Hub</h1>
          <p className="text-lg text-gray-500 mt-3">
            Crie e disponibilize seus cursos online
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
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
            <p className="text-lg text-gray-500 mt-2">{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
