"use client";
import { FC } from "react";
import Button from "./Button";
import { Topic } from "@/types";

const Topics: FC<{ data: Topic[] | null }> = ({ data }) => {
  const topics = data;

  return (
    <form>
      <ul className="">
        <h3 className="mt-6 border-b border-b-slate-300">Topicos do curso</h3>
        {topics?.map(({ topic, id }) => (
          <li key={id} className="flex justify-between p-1">
            <label>{topic}</label>
            <Button variant={"destructive"} type="submit">
              Deletar Topico
            </Button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Topics;
