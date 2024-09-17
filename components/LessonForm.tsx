// LessonForm.tsx
import { useState } from "react";

interface LessonFormProps {
  lesson: Lesson;
}

const LessonForm: React.FC<LessonFormProps> = ({ lesson }) => {
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
      // Lógica de upload do vídeo
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h2 className="text-sm font-bold text-gray-900">{lesson.title}</h2>
      <div>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <button
          className="p-1 border"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Carregando..." : "Carregar Vídeo"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default LessonForm;
