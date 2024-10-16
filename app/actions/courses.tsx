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
    const newCourseId = data[0].id.toString();

    const { error } = await supabase.storage
      .from("thumbnails")
      .upload(newCourseId, image, { upsert: true });

    if (error) {
      return { error };
    }

    const { data: publicUrlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(newCourseId);

    const { data: updateData, error: updateError } = await supabase
      .from("courses")
      .update({ image_path: publicUrlData.publicUrl })
      .eq("id", newCourseId);

    if (updateError) {
      return { error: updateError };
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

  console.log(data);

  return { data };
};

export const getCourseLessonsAction = async (courseId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    return { error };
  }

  return { data };
};

export const getCoursesDetailsAction = async (courseId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id,title,description,image_path")
    .eq("id", courseId)
    .single();

  if (error) {
    return { error };
  }

  return { data };
};

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
    const { data: uploadImage, error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(`${id}`, image, { upsert: true });

    if (uploadError) {
      return { error: uploadError };
    }

    // Obter a URL pública após o upload
    const { data: publicUrlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(`${id}`);

    // Atualizar o curso com a URL da imagem
    const { data: updateData, error: updateError } = await supabase
      .from("courses")
      .update({ image_path: publicUrlData.publicUrl })
      .eq("id", id);

    if (updateError) {
      return { error: updateError };
    }
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

export const createNewLesson = async (formData: FormData) => {
  const supabase = createClient();
  const course_id = formData.get("course_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const video = formData.get("video") as File;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("lessons")
    .insert({ title, description, course_id })
    .select();

  if (error) {
    return { error };
  }

  const lessonId = data[0]?.id.toString();

  const path = `${user?.id?.toString()}/${course_id}/${lessonId}`;

  const { data: videoData, error: videoError } = await supabase.storage
    .from("public-videos")
    .upload(path, video, {
      upsert: true,
    });

  if (videoError) {
    return { error: videoError };
  }

  const {} = await supabase
    .from("lessons")
    .update({ video_path: videoData.path })
    .eq("id", lessonId);

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
  console.log(data);
  return { data };
};
