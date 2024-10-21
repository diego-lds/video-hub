import Image from "next/image";
import React from "react";

interface CourseInfoFormProps {
  title: string;
  description: string;
  image: string | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const CourseInfo: React.FC<CourseInfoFormProps> = ({
  title,
  description,
  image,
  setTitle,
  setDescription,
}) => {
  return (
    <div>
      <div className="mb-6">
        <label className=" text-lg font-semibold text-gray-800 mb-2">
          Foto de capa atual:
        </label>
        <Image
          src={image || "/placeholder.jpg"}
          alt="Course image"
          width={200}
          height={150}
          className="h-auto w-auto border mb-2"
        />
        <label className=" text-lg font-semibold text-gray-800 mb-2">
          Título:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="mb-6">
        <label className=" text-lg font-semibold text-gray-800 mb-2">
          Descrição:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows={4}
        />
      </div>
    </div>
  );
};

export default CourseInfo;
