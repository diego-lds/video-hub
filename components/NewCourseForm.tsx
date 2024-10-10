"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createCourse } from "@/app/actions/courses";
export default function NewCourseForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter(); // Inicialize o hook useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const { error } = await createCourse(formData);

    setLoading(false);

    if (error) {
      console.error("Error creating course:", error.message);
      alert("Failed to create course.");
    } else {
      setSuccessMessage("Course created successfully!");
      router.push("/admin");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Course Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Course Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w/full border-gray-300 rounded-md shadow-sm"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="courseImage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Imagem de capa
        </label>
        <input
          type="file"
          id="courseImage"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Preview da Imagem:
          </p>
          <div className=" border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </form>
  );
}
