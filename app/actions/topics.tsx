"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const getCourseTopicsAction = async (courseId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    return { error };
  }

  return { data };
};

export const fetchTopics = async (courseId: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .eq("course_id", courseId);

    if (error) {
      return { error };
    }

    return { data };
  } catch (err) {
    return { error: err };
  }
};

export const addTopic = async (formData: FormData) => {
  const supabase = createClient();

  try {
    const topic = formData.get("topic") as string;
    const course_id = formData.get("course_id") as string;
    const { error } = await supabase
      .from("topics")
      .insert({ topic, course_id });

    if (error) return { error };

    revalidatePath("/my-courses/edit-course/" + course_id);

    return { data: true };
  } catch (e) {
    return { error: e };
  }
};

export const deleteTopic = async (topicId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("topics").delete().eq("id", topicId);

  return { error };
};

export const deleteTopic2 = async (id: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("topics").delete().eq("id", id);

    if (error) return { error };

    return { data: true };
  } catch (e) {
    return { error: e };
  }
};
