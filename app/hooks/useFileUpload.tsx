"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import * as tus from "tus-js-client";

type UseFileUploadResult = {
  progress: number;
  uploading: boolean;
  uploadFile: (
    bucketName: string,
    fileName: string,
    file: File
  ) => Promise<string>;
};

const useFileUpload = (): UseFileUploadResult => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const uploadFile = async (
    bucketName: string,
    fileName: string,
    file: File
  ): Promise<string> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session);
    return new Promise((resolve, reject) => {
      const upload = new tus.Upload(file, {
        endpoint: process.env.NEXT_PUBLIC_SUPABASE_RESUMABLE_ENDPOINT,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          authorization: `Bearer ${session?.access_token}`,
          "x-upsert": "true",
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true,
        metadata: {
          bucketName: bucketName,
          objectName: fileName,
          contentType: file.type,
          cacheControl: "3600",
        },
        chunkSize: 6 * 1024 * 1024, // Tamanho do chunk (6MB)
        onError: function (error) {
          console.error("Upload falhou:", error);
          setUploading(false);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setProgress(+percentage); // Atualiza o estado de progresso
        },
        onSuccess: function () {
          console.log("Upload com sucesso! URL do arquivo:", upload.url);
          setUploading(false); // Reseta o estado de uploading
          resolve(upload.url as string); // Retorna a URL do arquivo
        },
      });

      upload.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      });
    });
  };

  return { progress, uploading, uploadFile };
};

export default useFileUpload;
