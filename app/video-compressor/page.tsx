"use client";
import Compressor from "@/components/Compressor";
import VideoUpload from "@/components/FileUpload";

const VideoCompressor = () => {
  return (
    <div className="">
      <h1>Compressor de video</h1>
      <p className="text-2xl">
        Ferramenta de descompressão de vídeo permite otimizar o tamanho dos seus
        arquivos de vídeo sem comprometer a qualidade.
      </p>

      <div className="p-8 mt-8 bg-white rounded-lg shadow-md">
        <Compressor />
      </div>
    </div>
  );
};
export default VideoCompressor;
