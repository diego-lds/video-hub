/* /cursos
  - Admin page
    - mostra e edita informação dos tutores (professores)
    - lista de cursos criados
*/

import Button from "@/components/Button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Admin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("created_by", user?.id);

  return (
    <div className="flex flex-col w-full justify-center gap-2">
      <h1>Admin page</h1>
      {user && (
        <div className="border-b-2 border-b-slate-500">
          <h3 className="underline">Minhas informações</h3>
          <p>{user.id}</p>
          <p>{user.email}</p>
        </div>
      )}

      <div>
        {courses && (
          <ul className="">
            <div className="flex justify-between items-center">
              <h3 className="underline">Meus Cursos</h3>
              <Link href="/admin/new-course" className=" border">
                {" "}
                + novo curso
              </Link>
            </div>
            {courses.map((course) => (
              <li className="list-disc" key={course.id}>
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
