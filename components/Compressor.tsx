"use client";

import { formatBytes } from "@/utils/formatUtils";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Video } from "lucide-react";
import { Progress } from "./ui/progress";

export default function Compressor() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>("");
  const [label, setLabel] = useState<string>(
    "Preparar componente de compressao"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newFile, setNewFile] = useState<File>();

  const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  //   useEffect(() => {
  //     load();
  //   }, []);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    ffmpeg.on("progress", ({ progress }) => {
      setProgress(progress * 100);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  };

  const transcode = async () => {
    if (!file) return;

    await load();
    const ffmpeg = ffmpegRef.current;

    await ffmpeg.writeFile("input.mp4", await fetchFile(file));
    const argss = [
      "-i",
      "input.mp4", // Arquivo de entrada
      "-vf",
      "scale=854x480", // Redimensionamento para 320x240
      "-c:v",
      "libx264", // Codec de vídeo H.264
      "-crf",
      "35", // Valor do CRF para aumentar a compressão
      "-preset",
      "superfast", // Configuração mais rápida
      "-c:a",
      "aac", // Codec de áudio AAC
      "-b:a",
      "96k", // Taxa de bits de áudio reduzida (96 kbps)
      "-movflags",
      "faststart", // Otimização para streaming
      "output.mp4", // Arquivo de saída
    ];
    const startTime = new Date().getTime();
    await ffmpeg.exec(argss);

    const data = (await ffmpeg.readFile("output.mp4")) as any;
    const urlC = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setUrl(urlC);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    const newFile = new File([data.buffer], "newfile.mp4", {
      type: "video/mp4",
    });
    setNewFile(newFile);

    console.table({
      oldSize: formatBytes(file.size),
      newSize: formatBytes(newFile.size),
      args: argss.join(","),
      tempo: executionTime.toFixed(0),
    });
  };

  const handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const targFile = e.target.files?.[0];
    if (targFile) {
      setFile(targFile);
    }
  };

  console.log(loaded, isLoading);
  return (
    <div className="flex flex-col place-items-center gap-4">
      <input
        type="file"
        accept=".mp4"
        onChange={handleOnChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {file && (
        <Button onClick={transcode} variant={`outline`}>
          Comprimir
        </Button>
      )}

      <h1 className="text-lg mt-1">
        {isLoading ? "Carregando..." : progress.toFixed().toString() + " %"}{" "}
      </h1>
      {progress > 0 && <Progress value={progress} />}
      <div>
        {url && (
          <a
            href={url} // Criando um link para o arquivo
            download="newfile.mp4" // Nome do arquivo para download
            className="undeline cursor-pointer"
          >
            Baixar arquivo
          </a>
        )}
      </div>
    </div>
  );
}