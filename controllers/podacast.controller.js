import { supabase } from "../config/supabaseClient.js";

/**
 * Create Podcast
 */
export const createPodcast = async (req, res) => {
  const { title, description, cover_url } = req.body;

  const { data, error } = await supabase
    .from("podcasts")
    .insert([{ title, description, cover_url }])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data[0]);
};

/**
 * Delete Podcast
 */
export const deletePodcast = async (req, res) => {
  const { id } = req.params;

  await supabase.from("podcast_episodes").delete().eq("podcast_id", id);
  await supabase.from("podcasts").delete().eq("id", id);

  res.json({ message: "Podcast deleted successfully" });
};

/**
 * Get All Podcasts (USER)
 */
export const getAllPodcasts = async (req, res) => {
  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};
