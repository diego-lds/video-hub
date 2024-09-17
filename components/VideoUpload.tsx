"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface VideoUploadProps {
  lessonId: string;
}

const VideoUpload: React.FC<VideoUploadProps> = async ({ lessonId }) => {
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.files?.[0]);
  };

  const handleUpload = async () => {
    if (!video) return;

    setUploading(true);

    try {
      const supabase = createClient();
      const fileName = uuidv4() + "/" + video.name;
      const { data, error } = await supabase.storage
        .from("videos")
        .upload(uuidv4() + "/" + video.name, video);

      if (error) {
        setError(error.message);
      } else {
        console.log("Vídeo carregado com sucesso!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Carregando..." : "Carregar Vídeo"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VideoUpload;
