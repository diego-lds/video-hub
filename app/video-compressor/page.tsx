"use client";
import Compressor from "@/components/Compressor";
import NoSSR from "@/components/NoSSR";
const VideoCompressor = () => {
  return (
    <div className="">
      <h1>Compressor de Vídeo</h1>
      <p className="text-lg">
        Ferramenta de descompressão de vídeo permite otimizar o tamanho dos seus
        arquivos de vídeo sem comprometer a qualidade.
      </p>

      <div className="p-8 mt-8 bg-white rounded-lg shadow-md">
        <NoSSR>
          <Compressor />
        </NoSSR>
      </div>
    </div>
  );
};
export default VideoCompressor;
