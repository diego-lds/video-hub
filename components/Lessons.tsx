"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "./Button";
import { Lesson } from "@/types";
import { deleteLesson } from "@/app/actions/lessons";

const Lessons: React.FC<{ data: Lesson[] | null }> = ({ data }) => {
  const [lessons, setLessons] = useState<Lesson[] | null>(null);

  useEffect(() => {
    if (!data) return;
    setLessons(data);
  }, []);

  const handleDeleteLesson = async (id: number) => {
    const { error } = await deleteLesson(id.toString());
    if (error) {
      toast.error(error.message);
      return;
    }

    if (lessons) {
      setLessons(lessons.filter((topic) => topic.id !== id));
      toast.success("Aula removida com sucesso!");
    }
  };

  return (
    <ul className="">
      <h3 className="mt-6 border-b border-b-slate-300">Aulas do curso</h3>
      {lessons?.map(({ title, id }) => (
        <li key={id} className="flex justify-between p-1">
          <label>{title}</label>
          <Button
            variant={"destructive"}
            onClick={() => {
              handleDeleteLesson(id);
            }}
          >
            Deletar Aula
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Lessons;
