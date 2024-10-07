import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/utils/formatUtils";

interface Course {
  id: string;
  title: string;
  created_by: string;
}

export default async function Admin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Você precisa estar logado para acessar essa página
        </h1>
        <Link
          href="/login"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Ir para a página de login
        </Link>
      </div>
    );
  }

  // Busca os cursos criados pelo usuário
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, description, created_at, image_path", {
      count: "exact",
    })
    .eq("created_by", user.id);

  if (error) {
    console.error("Erro ao buscar cursos:", error.message);
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Erro ao carregar os cursos</h1>
        <p className="text-xl">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container p-2 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Meus cursos | edição</h1>
      <ul className="list-none p-2 border border-gray-300 rounded-sm mt-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="mb-2 ml-2 border-b p-2 border-gray-300 hover:bg-gray-200"
          >
            <Link
              href={`/admin/course-details/${course.id}`}
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
            </Link>
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
