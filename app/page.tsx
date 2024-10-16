import Image from "@/components/Image";
import Card from "@/components/Card";
import Separator from "@/components/Separator";
import { getCoursesAction } from "./actions/courses";

export default async function Index() {
  const { data: courses } = await getCoursesAction();

  return (
    <>
      <main className="flex flex-col lg:flex-row">
        <div>
          <Image width={474} height={125} src="/logo.png" alt="Logo" />

          <h3>Crie e disponibilize seus cursos online com facilidade!</h3>
          <p>
            Transforme seu conhecimento em uma fonte de renda, compartilhando
            suas habilidades com o mundo. Nossa plataforma oferece todas as
            ferramentas necessárias para que você possa desenvolver, hospedar e
            vender seus cursos online, sem complicações técnicas.
          </p>
        </div>
        <Image src="/hero.svg" alt="Hero" width={500} height={500} />
      </main>

      {courses && (
        <section>
          <h1>Todos os cursos</h1>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <ul>
              {courses.map((course) => (
                <Card
                  key={course.id}
                  imagePath={course.image_path}
                  title={course.title}
                  description={course.description}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
