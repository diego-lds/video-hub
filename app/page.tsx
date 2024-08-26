import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import TopicGrid from "@/components/TopicGrid";
import Button from "@/components/Button";
import Curriculum from "@/components/Curriculum";

const topics = [
  { icon: "✔️", topic: "Transtornos de Ansiedade" },
  { icon: "✔️", topic: "Depressão e Transtornos do Humor" },
  { icon: "✔️", topic: "Esquizofrenia e Transtornos Psicóticos" },
  { icon: "✔️", topic: "Transtornos de Personalidade" },
  { icon: "✔️", topic: "Terapia Cognitivo-Comportamental (TCC)" },
  { icon: "✔️", topic: "Psicofarmacologia e Medicação" },
  { icon: "✔️", topic: "Transtornos do Sono e da Vigília" },
  { icon: "✔️", topic: "Psiquiatria Forense e Legislação" },
];

const courseLessons = [
  { title: "Definição e História da Psiquiatria", duration: 690 },
  {
    title: "Classificação e Diagnóstico de Transtornos Mentais",
    duration: 1090,
  },
  { title: "Fundamentos de Psicofarmacologia", duration: 870 },
];

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center  border-b border-b-foreground/10 h-16 ">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <p className="text-foreground/60">Logo</p>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col max-w-4xl gap-10 p-3">
          <iframe
            width="700"
            height="415"
            src="https://www.youtube.com/embed/hk3oRx_Yzaw"
            title="Introdução do curso"
          ></iframe>
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
          <Button>Inscreva-se</Button>
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

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>This is a footer</p>
      </footer>
    </div>
  );
}
