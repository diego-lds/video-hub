"use server";

import { createClient } from "@/utils/supabase/server";

export const getCoursesAction = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, image_path")
    .order("created_at", { ascending: true });
  if (error) {
    return { error };
  }
  return { data };
};

export const createCourse = async (formData: FormData) => {
  const supabase = createClient();

  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("courses")
    .insert({ title, description, created_by: user?.id })
    .select();

  if (error) {
    return { error };
  }

  if (image) {
    const newCourseId = data[0].id;
    const { data: imageReponse, error } = await supabase.storage
      .from("thumbnails")
      .upload(newCourseId.toString(), image, { upsert: true });

    if (error) {
      return { error };
    }
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
    return { error };
  }
  return { data };
};

export const getCoursesDetailsAction = async (courseId: string | null) => {
  const supabase = createClient();

  let { data, error } = await supabase
    .from("courses")
    .select(
      `
      *,
    lessons:lessons(*),
    learning_topics:learning_topics(*)
    `
    )
    .eq("id", courseId)
    .single();

  if (error) {
    return { error };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("thumbnails").getPublicUrl(data?.id);

  return { data, image_path: publicUrl };
};

export const updateCourseDetails = async (formData: FormData) => {
  const supabase = createClient();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  const { data, error } = await supabase
    .from("courses")
    .update({ title, description })
    .eq("id", id);

  if (error) {
    return { error };
  }
  if (image) {
    const {} = supabase.storage
      .from("thumbnails")
      .upload(`${id}`, image, { upsert: true });
  }

  return { data };
};

export const addNewTopic = async (formData: FormData) => {
  const supabase = createClient();
  const course_id = formData.get("course_id") as string;
  const topic = formData.get("topic") as string;

  const { data, error } = await supabase
    .from("learning_topics")
    .insert({ course_id, topic })
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
