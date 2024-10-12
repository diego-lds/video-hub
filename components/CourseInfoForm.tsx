import React from "react";

interface CourseInfoFormProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  onSubmit: (event: React.MouseEvent<HTMLFormElement>) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <label className="block text-xl font-medium mb-2">
        Informações do curso
      </label>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
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
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Descrição:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Atualizar Informações do curso
      </button>
    </form>
  );
};

export default CourseInfoForm;
