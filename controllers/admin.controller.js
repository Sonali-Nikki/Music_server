import { supabase } from "../config/supabaseClient.js";
import fs from "fs";

/**
 * Upload Track (Audio + Metadata)
 */
export const uploadTrack = async (req, res) => {
  const { title, artist, category, duration } = req.body;
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).json({ message: "Audio file required" });
  }

  const filePath = `tracks/${Date.now()}-${audioFile.originalname}`;

  const { error: uploadError } = await supabase.storage
    .from("tracks")
    .upload(filePath, fs.readFileSync(audioFile.path), {
      contentType: audioFile.mimetype,
    });

  fs.unlinkSync(audioFile.path);

  if (uploadError) {
    return res.status(400).json({ message: uploadError.message });
  }

  const audioUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/tracks/${filePath}`;

  const { data, error } = await supabase.from("tracks").insert([
    {
      title,
      artist,
      category,
      duration,
      audio_url: audioUrl,
    },
  ]).select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data[0]);
};

/**
 * Delete Track
 */
export const deleteTrack = async (req, res) => {
  const { id } = req.params;

  const { data } = await supabase
    .from("tracks")
    .select("audio_url")
    .eq("id", id)
    .single();

  if (!data) {
    return res.status(404).json({ message: "Track not found" });
  }

  const filePath = data.audio_url.split("/tracks/")[1];

  await supabase.storage.from("tracks").remove([filePath]);
  await supabase.from("tracks").delete().eq("id", id);

  res.json({ message: "Track deleted successfully" });
};
