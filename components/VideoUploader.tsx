// components/VideoUploader.js
"use client";
import React, { useState } from "react";

const VideoUploader = ({ courseId, user }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const uploadVideo = async () => {
    if (!videoFile) {
      alert("Selecione um vídeo para upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile);

    setLoading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus("Upload e conversão bem-sucedidos!");
      } else {
        setUploadStatus("Erro: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      setUploadStatus("Erro ao fazer upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload de Vídeo</h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
      />

      {videoFile && (
        <button
          onClick={uploadVideo}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Convertendo..." : "Converter e Fazer Upload"}
        </button>
      )}

      <p className="mt-4 text-center text-gray-600">{uploadStatus}</p>
    </div>
  );
};

export default VideoUploader;
