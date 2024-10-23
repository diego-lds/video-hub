import Image from "next/image";
import Separator from "@/components/Separator";
import { getCoursesAction } from "./actions/courses";
import Card from "@/components/Card";
import Link from "next/link";

export default async function Index() {
  const { data: courses, error: errorCourses } = await getCoursesAction();

  if (errorCourses) {
    console.error(errorCourses?.message);
  }

  return (
    <>
      <div className="animate-fade">
        <main className="flex flex-col lg:flex-row">
          <div className="flex flex-col sm:flex-row justify-center">
            <div className="py-4">
              <Image
                priority
                width={474}
                height={125}
                className="mb-5"
                src="/logo.png"
                alt="Logo"
              />
              <h4>Crie e disponibilize seus cursos online com facilidade!</h4>
              <p className="text-md">
                Transforme seu conhecimento em uma fonte de renda,
                compartilhando suas habilidades com o mundo. Nossa plataforma
                oferece todas as ferramentas necessárias para que você possa
                desenvolver, hospedar e vender seus cursos online, sem
                complicações técnicas.
              </p>
            </div>
            <div className="sm:min-w-[500px]">
              <Image
                priority
                src="/hero.png"
                alt="Hero"
                width={500}
                height={500}
              />
            </div>
          </div>
        </main>

        {courses && (
          <section className="mt-8">
            <h2>Todos os cursos</h2>
            <Separator />
            <ul className="grid sm:grid-cols-3 gap-4 mt-12">
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
