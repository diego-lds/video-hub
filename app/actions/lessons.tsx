"use server";

import { createClient } from "@/utils/supabase/server";

export const getLessonsAction = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", id);
  if (error) {
    return { error };
  }
  return { data };
};

export const createLesson = async (formData: FormData) => {
  const supabase = createClient();

  const title = formData.get("title");
  const description = formData.get("description");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error: courseError } = await supabase
    .from("lessons")
    .insert({ title, description })
    .select();

  if (courseError) {
    return { error: courseError };
  }

  return { data };
};

export const createNewLesson = async (formData: FormData) => {
  const supabase = createClient();
  const course_id = formData.get("course_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const { data, error } = await supabase
    .from("lessons")
    .insert({ title, description, course_id })
    .select();

  if (error) {
    return { error };
  }

  return { data };
};

export const getLessonVideoUrl = async (lessonId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("public-videos")
    .createSignedUrl(lessonId, 3600);

  if (error) {
    return { error };
  }
  return { data };
};
