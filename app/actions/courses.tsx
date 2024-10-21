"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const getCoursesAction = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("courses").select("*");
  console.log(error);
  if (error) {
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
    .select("*")
    .eq("owner", user?.id);

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

  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .insert({ title, description, owner: user?.id })
    .select();

  if (courseError) {
    return { error: courseError };
  }

  const newCourseId = courseData[0].id.toString();

  if (image) {
    const { error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(newCourseId, image, { upsert: true });

    if (uploadError) {
      await supabase.from("courses").delete().eq("id", newCourseId);
      return { error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(newCourseId, {
        transform: {
          width: 300,
          height: 200,
        },
      });

    const { error: updateError } = await supabase
      .from("courses")
      .update({ image_url: publicUrlData.publicUrl })
      .eq("id", newCourseId);

    if (updateError) {
      await supabase.from("courses").delete().eq("id", newCourseId);
      return { error: updateError };
    }
  }

  return { data: courseData };
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
    .select("*")
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
      .update({ image_url: publicUrlData.publicUrl })
      .eq("id", id);

    revalidatePath("/admin");
    if (updateError) {
      return { error: updateError };
    }
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

  const { data, error } = await supabase
    .from("lessons")
    .insert({ title, description, course_id })
    .select();

  if (error) {
    return { error };
  }

  return { data: data[0] };
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

export const addNewTopic = async (formData: FormData) => {
  const supabase = createClient();

  const topic = formData.get("topic") as string;
  const course_id = formData.get("course_id") as string;

  console.log({ topic });

  const { data, error } = await supabase
    .from("learning_topics")
    .insert({ topic, course_id })
    .select();

  if (error) {
    return { error };
  }

  return { data };
};

export const uploadVideo = async (formData: FormData) => {
  const supabase = createClient();

  const topic = formData.get("topic") as string;
  const course_id = formData.get("course_id") as string;

  console.log({ topic });

  const { data, error } = await supabase
    .from("learning_topics")
    .insert({ topic, course_id })
    .select();

  if (error) {
    return { error };
  }

  return { data };
};
