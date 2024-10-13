import React from "react";

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  return (
    <div className="bg-white rounded-lg ">
      <label
        htmlFor="image-upload"
        className="block text-lg font-semibold text-gray-800 mb-2"
      >
        Carregar Nova Imagem
      </label>

      <div className="mt-4 flex justify-center  px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition duration-200">
        <div className="space-y-2 flex flex-col justify-center text-center ">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(event) =>
                onImageChange(event.target.files ? event.target.files[0] : null)
              }
              className="mt-2  text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 transition duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
