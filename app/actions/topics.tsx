"use server";

import { createClient } from "@/utils/supabase/server";

export const getCourseTopicsAction = async (courseId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("learning_topics")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    return { error };
  }

  return { data };
};

export const addNewTopic = async (formData: FormData) => {
  const supabase = createClient();

  const topic = formData.get("topic") as string;
  const course_id = formData.get("course_id") as string;

  const { data, error } = await supabase
    .from("learning_topics")
    .insert({ topic, course_id })
    .select();

  if (error) {
    return { error };
  }

  return { data };
};

export const deleteTopic = async (topicId: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("learning_topics")
    .delete()
    .eq("id", topicId);

  return { error };
};
