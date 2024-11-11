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

export const fetchLessons = async (id: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", id);

    if (error) {
      return { error };
    }
    return { data };
  } catch (e) {
    return { error: e };
  }
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

export const deleteLesson = async (lessonId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);

  if (error) {
    return { error };
  }

  const { error: storageError } = await supabase.storage
    .from("public-videos")
    .remove([lessonId]);

  if (storageError) {
    return { error: storageError };
  }

  return { data: true };
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
