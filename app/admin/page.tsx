import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  created_by: string;
}

export default async function Admin() {
  const supabase = createClient();

  // Recupera o usuário autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Verifica se o usuário está autenticado
  if (!user) {
    // Você pode redirecionar para a página de login aqui ou mostrar uma mensagem
    return <div>Usuário não autenticado</div>;
  }

  // Busca os cursos criados pelo usuário
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("created_by", user.id);

  if (error) {
    console.error("Erro ao buscar cursos:", error.message);
    return <div>Erro ao carregar os cursos.</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center gap-2">
      <h1 className="text-2xl">Admin page</h1>
      <div className="border-b-2 border-b-slate-500">
        <h3 className="underline text-xl">Minhas informações</h3>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        {courses && courses.length > 0 ? (
          <ul>
            <div className="flex justify-between items-center">
              <h3 className="underline text-xl">Meus Cursos</h3>
              <Link href="/admin/new-course" className="border">
                + novo curso
              </Link>
            </div>
            {courses.map((course: Course) => (
              <li className="list-disc" key={course.id}>
                <Link href={`/admin/course-details/${course.id}`}>
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum curso encontrado.</p>
        )}
      </div>
    </div>
  );
}
