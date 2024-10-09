"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getCoursesAction = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, image_path")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error.message);
    return { error };
  }

  return { data };
};

export const getMyCoursesAction = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, image_path, created_at")
    .eq("created_by", user?.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error.message);
    return { error };
  }

  return { data };
};

export const getCoursesDetailsAction = async (courseId: string) => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      lessons (*),
      learning_topics (topic)
    `
    )
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Erro ao buscar dados do curso:", error);
  }

  return { data };
};
