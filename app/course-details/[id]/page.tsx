import { courseLessons, lessons, topics } from "@/app/mock";
import Button from "@/components/Button";
import Curriculum from "@/components/Curriculum";
import TopicGrid from "@/components/TopicGrid";
import Link from "next/link";

const CourseDetails = async ({ params }: { params: { id: string } | null }) => {
  const id = params?.id;

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10">
          <p className="text-3xl font-extrabold lg:text-4xl !leading-tight max-w-xl ">
            Entendendo a Saúde Mental
          </p>
          <p>
            Neste curso de psiquiatria, você irá aprender sobre os fundamentos
            da saúde mental, incluindo a avaliação, diagnóstico e tratamento de
            transtornos mentais. Estudará sobre as diferentes condições
            psiquiátricas, como depressão, ansiedade, esquizofrenia e muito
            mais. Além disso, você terá a oportunidade de explorar as
            intervenções terapêuticas e farmacológicas mais eficazes para
            promover a recuperação e a qualidade de vida dos pacientes.
          </p>
          <TopicGrid title="O que você irá aprender" topics={topics} />

          <Curriculum
            title=" Entendendo a Saúde Mental"
            lessons={courseLessons}
          />
        </div>
        <aside className="w-1/4 p-4 border border-gray-300">
          <Link href="/course/1">
            <Button>Ir para o curso</Button>
          </Link>
          <h2 className="text-xl font-bold my-6">Este curso inclui:</h2>
          <ul>
            <li className="text-sm mb-2">
              <span className="mr-2">🎥</span>
              <span>7,5 horas de vídeo sob demanda</span>
            </li>
            <li className="text-sm mb-2">
              <span className="  mr-2">📝</span>
              <span className="">10 artigos</span>
            </li>
            <li className="text-sm mb-2">
              <span className="  mr-2">📥</span>
              <span>18 recursos para download</span>
            </li>

            <li className="text-sm mb-2">
              <span className="  mr-2">🔑</span>
              <span>Acesso total vitalício</span>
            </li>
            <li className="text-sm mb-2">
              <span className=" mr-2">📜</span>
              <span>Certificado de conclusão</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
export default CourseDetails;
