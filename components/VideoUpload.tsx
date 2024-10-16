"use client";
import React, { useState } from "react";

interface VideoUploadProps {
  onChange: (file: File | null) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file ? file : null);
    setFileName(file ? file.name : null);
  };

  return (
    <div>
      <label
        htmlFor="video"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Vídeo da Aula
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 6.5V17.5C21 18.328 20.328 19 19.5 19H4.5C3.672 19 3 18.328 3 17.5V6.5C3 5.672 3.672 5 4.5 5H19.5C20.328 5 21 5.672 21 6.5ZM10 15L15 12L10 9V15Z" />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="video-upload"
              className="relative cursor-pointer bg-white rounded-md  text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <label>Carregar um vídeo</label>
              <input
                id="video-upload"
                name="video-upload"
                type="file"
                accept="video/*"
                className="sr-only"
                onChange={handleVideoChange}
                required
              />
            </label>
            <label className="ml-1"> ou arraste e solte</label>
          </div>
          <p className="text-xs text-gray-500">Arquivos MP4, máximo 250MB</p>
          {fileName && (
            <p className="mt-2 text-lg font-semibold text-blue-600">
              Arquivo: {fileName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
