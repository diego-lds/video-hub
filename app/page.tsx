import Image from "next/image";
import Separator from "@/components/Separator";
import { getCoursesAction } from "./actions/courses";
import Card from "@/components/Card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  const { data: courses, error: errorCourses } = await getCoursesAction();

  if (errorCourses) {
    console.error(errorCourses?.message);
  }

  return (
    <>
      <div className="animate-fade">
        <main className="flex flex-col lg:flex-row">
          <Introduction />
        </main>

        {courses && (
          <section className="mt-8">
            <h1>Todos os cursos</h1>
            <Separator />
            <ul className="grid p-1 sm:grid-cols-3 gap-4 mt-12">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link href={`/course/${course.id}`}>
                    <Card
                      imagePath={course.image_url}
                      title={course.title}
                      description={course.description}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

function Introduction() {
  return (
    <div className="flex flex-col sm:flex-row justify-center">
      <div className="py-8 flex flex-col justify-between min-h-[500px]">
        <div>
          <p className="text-7xl font-bold">Skill Share</p>
          <h2 className="my-4">Compartilhe seu conhecimento com facilidade!</h2>
          <p className="text-md ">
            Compartilhar habilidades é a chave para transformar conhecimento em
            impacto. Junte-se a uma comunidade que valoriza a troca de
            experiências e capacite outras pessoas com o que você sabe, enquanto
            amplia suas próprias habilidades e alcance.
          </p>
        </div>
        <div className="flex items-center justify-center mt-auto h-full ">
          <Button size={"lg"}>Crie seu curso agora!</Button>
        </div>
      </div>
      <div className="sm:min-w-[500px]">
        <Image priority src="/hero.svg" alt="Hero" width={500} height={500} />
      </div>
    </div>
  );
}
