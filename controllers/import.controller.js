import fetch from "node-fetch";
import { supabase } from "../config/supabaseClient.js";

/**
 * Import Music from TheAudioDB API
 */ 

export const importMusic = async (req, res) => {
  const { artist } = req.query;

  const url = `https://theaudiodb.com/api/v1/json/2/searchtrack.php?s=${artist}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.track) {
    return res.status(404).json({ message: "No tracks found" });
  }

  const tracks = data.track.map((t) => ({
    title: t.strTrack,
    artist: t.strArtist,
    album: t.strAlbum,
    cover_url: t.strTrackThumb || t.strAlbumThumb,
    category: t.strGenre,
    type: "music",
    audio_url: null, // demo metadata
  }));

  const { error } = await supabase
    .from("tracks")
    .insert(tracks);

  if (error) return res.status(400).json(error);

  res.json({
    imported: tracks.length,
    artist,
  });
};
