"use client";

import { addNewTopic } from "@/app/actions/courses";
import { revalidatePath } from "next/cache";
import { use } from "react";

export default function AddTopic({ topic: string }) {
  return (
    <div className="flex items-center gap-4">
      <form
        action={async (formData: FormData) => {
          `use server`;
          await addNewTopic(courseId, formData);
          revalidatePath(`/my-courses/edit-course/${courseId}`);
        }}
      >
        <input type="text" name="topic" />
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Criar Topico
        </button>
      </form>
    </div>
  );
}
