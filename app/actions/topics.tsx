"use server";

import { createClient } from "@/utils/supabase/server";

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

export const deleteTopic = async (id: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("topics").delete().eq("id", id);

    if (error) return { error };

    return { data: true };
  } catch (e) {
    return { error: e };
  }
};
