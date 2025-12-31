import { supabase } from "../config/supabaseClient.js";

/**
 * Create Playlist
 */
export const createPlaylist = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("playlists")
    .insert([{ name, user_id: userId }])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data[0]);
};

/**
 * Get User Playlists
 */
export const getUserPlaylists = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

/**
 * Add Track to Playlist
 */
export const addTrackToPlaylist = async (req, res) => {
  const { playlistId, trackId } = req.body;

  const { error } = await supabase
    .from("playlist_tracks")
    .insert([{ playlist_id: playlistId, track_id: trackId }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Track added to playlist" });
};

/**
 * Remove Track from Playlist
 */
export const removeTrackFromPlaylist = async (req, res) => {
  const { playlistId, trackId } = req.body;

  const { error } = await supabase
    .from("playlist_tracks")
    .delete()
    .match({ playlist_id: playlistId, track_id: trackId });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Track removed from playlist" });
};
