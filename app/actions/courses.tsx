"use server";

import { createClient } from "@/utils/supabase/server";

interface Course {
  id: number;
  title: string;
  description: string;
  newImage: File | null;
}

export const getCoursesAction = async () => {
  const supabase = createClient();

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
  const supabase = createClient();

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

export const getCoursesDetailsAction = async (courseId: string | null) => {
  const supabase = createClient();

  const { data: courseDetails, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      lessons!inner(*), 
      learning_topics(*)
    `
    )
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Erro ao buscar dados do curso:", error);
  }

  return { courseDetails };
};

export const updateCourseDetails = async (courseData: Course) => {
  const supabase = createClient();
  const { id, title, description, newImage } = courseData;

  const { data, error } = await supabase
    .from("courses")
    .update({ title, description })
    .eq("id", id);

  if (error) return { error };

  if (newImage) {
    const {} = supabase.storage
      .from("thumbnails")
      .upload(`${id}`, newImage, { upsert: true });
  }

  return { data };
};
