"use client";
import { addTopic } from "@/app/actions/topics";

import React from "react";
import Button from "./Button";
import { useFormStatus } from "react-dom";

export function AddTopicButton({ courseId }: { courseId: number }) {
  return (
    <form action={addTopic}>
      <div className="flex justify-between items-center gap-2">
        <input value={courseId} type="hidden" name="course_id" />
        <input
          type="text"
          name="topic"
          placeholder="Adicionar tópico"
          className="border border-gray-300 rounded-lg w-full p-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <Submit />
      </div>
    </form>
  );
}

function Submit() {
  // ✅ `pending` will be derived from the form that wraps the Submit component
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? "Enviando" : "Enviar"}</Button>;
}
