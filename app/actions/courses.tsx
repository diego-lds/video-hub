"use server";

import { createClient } from "@/utils/supabase/server";

export const fetchAllCourses = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      return { error };
    }
    return { data };
  } catch (e) {
    return { error: e };
  }
};

export const fetchMyCourses = async () => {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("owner_id", user?.id);

    if (error) {
      return { error };
    }
    return { data };
  } catch (e) {
    return { error: e };
  }
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
    .insert({ title, description, owner_id: user?.id })
    .select();

  if (courseError) {
    return { error: courseError };
  }

  const newCourseId = courseData[0].id.toString();

  if (image) {
    const { data: uploadImage, error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(newCourseId, image, { upsert: true });
    if (uploadError) {
      await supabase.from("courses").delete().eq("id", newCourseId);
      return { error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(newCourseId, {});

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

export const fetchCourseDetails = async (id: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { error };
    }

    return { data };
  } catch (e) {
    return { error: e };
  }
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
    const { data: storage } = await supabase.storage
      .from("thumbnails")
      .upload(`${id}`, image, { upsert: true });

    const { data: publicUrlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(`${id}`);

    const { data: updateData, error: updateError } = await supabase
      .from("courses")
      .update({ image_url: publicUrlData.publicUrl })
      .eq("id", id);

    if (updateError) {
      return { error: updateError };
    }
  }

  return { data };
};
