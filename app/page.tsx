import Image from "next/image";
import Separator from "@/components/Separator";
import { getCoursesAction } from "./actions/courses";
import Card from "@/components/Card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: courses } = await getCoursesAction();
  return (
    <>
      <div className=" ">
        <main className="flex flex-col lg:flex-row">
          <div className="flex items-center">
            <div className="">
              <Image
                width={350}
                height={125}
                className="mb-5"
                src="/logo.png"
                alt="Logo"
              />
              <h4>Crie e disponibilize seus cursos online com facilidade!</h4>
              <p>
                Transforme seu conhecimento em uma fonte de renda,
                compartilhando suas habilidades com o mundo. Nossa plataforma
                oferece todas as ferramentas necessárias para que você possa
                desenvolver, hospedar e vender seus cursos online, sem
                complicações técnicas.
              </p>
            </div>
            <Image src="/hero.svg" alt="Hero" width={350} height={350} />
          </div>
        </main>

        {courses && (
          <section>
            <h1>Todos os cursos</h1>
            <Separator />
            <ul className="grid grid-cols-3 gap-4 mt-12">
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
