import { supabase } from "../config/supabaseClient.js";

/**
 * Add or Update Recently Played
 */
export const upsertRecentlyPlayed = async (req, res) => {
  const userId = req.user.id;
  const { trackId, lastPosition } = req.body;

  const { error } = await supabase
    .from("recently_played")
    .upsert(
      {
        user_id: userId,
        track_id: trackId,
        last_position: lastPosition,
        updated_at: new Date(),
      },
      { onConflict: ["user_id", "track_id"] }
    );

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Playback progress saved" });
};

/**
 * Get Recently Played Tracks
 */
export const getRecentlyPlayed = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("recently_played")
    .select(`
      id,
      last_position,
      updated_at,
      tracks (
        id,
        title,
        artist,
        audio_url,
        cover_url,
        duration
      )
    `)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

/**
 * Get Resume Info for One Track
 */
export const getResumeTrack = async (req, res) => {
  const userId = req.user.id;
  const { trackId } = req.params;

  const { data, error } = await supabase
    .from("recently_played")
    .select("last_position")
    .eq("user_id", userId)
    .eq("track_id", trackId)
    .single();

  if (error) {
    return res.json({ last_position: 0 });
  }

  res.json(data);
};
