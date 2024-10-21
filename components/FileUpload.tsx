"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import * as tus from "tus-js-client";
import InputVideo from "./FileInput";
import Button from "./Button";
import { Progress } from "./ui/progress";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  const uploadFile = async (
    bucketName: string,
    fileName: string,
    file: File
  ) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const projectId = "gnayrcyzxnrrcaqjmsky"; // Your Supabase project ID
    return new Promise((resolve, reject) => {
      const upload = new tus.Upload(file, {
        endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
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
        chunkSize: 6 * 1024 * 1024, // 6MB chunk size
        onError: function (error) {
          console.error("Upload failed:", error);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setProgress(+percentage); // Update progress state
        },
        onSuccess: function () {
          console.log("Upload successful! File URL:", upload.url);
          setUploading(false); // Reset uploading state
          resolve(upload.url); // Resolve with the file URL
        },
      });

      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start(); // Start the upload
      });
    });
  };

  const handleUploadClick = () => {
    if (!file) return;

    if (file.size >= 50 * 1024 * 1024) {
      setFile(null);
      alert("O arquivo deve ser menor que 50 MB.");
      return;
    }

    const bucketName = "public-videos"; // Replace with your bucket name

    setUploading(true);
    uploadFile(bucketName, file.name, file)
      .then((url) => {
        console.log("File uploaded successfully:", url);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  console.log(file);

  return (
    <div>
      {file && (
        <Button
          variant={`ghost`}
          onClick={handleUploadClick}
          disabled={uploading}
        >
          Upload
        </Button>
      )}
      {uploading && (
        <div>
          <p>Progress: {progress}%</p>
          <Progress value={progress} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
