import { supabase } from "../config/supabaseClient.js";

/**
 * Like a track
 */
export const likeTrack = async (req, res) => {
  const userId = req.user.id;
  const { trackId } = req.body;

  const { error } = await supabase
    .from("liked_tracks")
    .insert([{ user_id: userId, track_id: trackId }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Track liked" });
};

/**
 * Unlike a track
 */
export const unlikeTrack = async (req, res) => {
  const userId = req.user.id;
  const { trackId } = req.body;

  const { error } = await supabase
    .from("liked_tracks")
    .delete()
    .match({ user_id: userId, track_id: trackId });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Track unliked" });
};

/**
 * Get liked tracks
 */
export const getLikedTracks = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("liked_tracks")
    .select(`
      id,
      tracks (
        id,
        title,
        artist,
        audio_url,
        cover_url,
        duration
      )
    `)
    .eq("user_id", userId);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};
