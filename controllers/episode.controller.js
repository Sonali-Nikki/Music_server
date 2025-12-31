import { supabase } from "../config/supabaseClient.js";
import fs from "fs";

/**
 * Upload Podcast Episode
 */
export const uploadEpisode = async (req, res) => {
  const { podcast_id, title, duration } = req.body;
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).json({ message: "Audio file required" });
  }

  const filePath = `episodes/${Date.now()}-${audioFile.originalname}`;

  const { error: uploadError } = await supabase.storage
    .from("podcasts")
    .upload(filePath, fs.readFileSync(audioFile.path), {
      contentType: audioFile.mimetype,
    });

  fs.unlinkSync(audioFile.path);

  if (uploadError) {
    return res.status(400).json({ message: uploadError.message });
  }

  const audioUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/podcasts/${filePath}`;

  const { data, error } = await supabase
    .from("podcast_episodes")
    .insert([
      {
        podcast_id,
        title,
        duration,
        audio_url: audioUrl,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data[0]);
};

/**
 * Get Episodes by Podcast (USER)
 */
export const getEpisodesByPodcast = async (req, res) => {
  const { podcastId } = req.params;

  const { data, error } = await supabase
    .from("podcast_episodes")
    .select("*")
    .eq("podcast_id", podcastId)
    .order("created_at");

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

/**
 * Delete Episode
 */
export const deleteEpisode = async (req, res) => {
  const { id } = req.params;

  const { data } = await supabase
    .from("podcast_episodes")
    .select("audio_url")
    .eq("id", id)
    .single();

  if (!data) {
    return res.status(404).json({ message: "Episode not found" });
  }

  const filePath = data.audio_url.split("/podcasts/")[1];

  await supabase.storage.from("podcasts").remove([filePath]);
  await supabase.from("podcast_episodes").delete().eq("id", id);

  res.json({ message: "Episode deleted successfully" });
};
