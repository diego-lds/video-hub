import Image from "next/image";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import Separator from "@/components/Separator";
import { getCoursesAction } from "./actions/courses";

export default async function Index() {
  const { data: courses } = await getCoursesAction();

  return (
    <div>
      <div className="flex flex-col  lg:flex-row  justify-between">
        <div className="w-full lg:w-1/2">
          <Image
            width={474}
            height={125}
            src="/logo.png"
            alt="Logo"
            className="mb-4"
          />

          <h3>Crie e disponibilize seus cursos online com facilidade!</h3>
          <p>
            Transforme seu conhecimento em uma fonte de renda, compartilhando
            suas habilidades com o mundo. Nossa plataforma oferece todas as
            ferramentas necessárias para que você possa desenvolver, hospedar e
            vender seus cursos online, sem complicações técnicas.
          </p>
        </div>
        <Image src="/hero.svg" alt="Hero image" width={500} height={500} />
      </div>

      <h1>Todos os cursos</h1>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {courses?.map((course) => (
          <Link key={course.id} href={`/course/${course.id}`}>
            <CourseCard
              imagePath={course.image_path}
              title={course.title}
              description={course.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
