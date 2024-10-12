import React from "react";
import Image from "next/image";

interface ImageUploaderProps {
  currentImage: string | null;
  previewImage: string | null;
  onImageChange: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  previewImage,
  onImageChange,
}) => {
  return (
    <div className="mt-10 bg-white rounded-lg shadow-md p-6 space-y-3">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Foto de capa atual:
        </label>
        <Image
          src={currentImage || "/placeholder.jpg"}
          alt="Course image"
          width={200}
          height={150}
          className="h-auto w-auto rounded-md"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Alterar foto de capa:
        </label>
        <input
          type="file"
          onChange={(e) => e.target.files && onImageChange(e.target.files[0])}
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        {previewImage && (
          <Image
            width={200}
            height={100}
            src={previewImage}
            alt="Preview image"
            className="w-64 h-auto mt-4 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
