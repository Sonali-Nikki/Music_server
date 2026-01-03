import axios from "axios";
import { supabase } from "./config/supabaseClient.js"; 

const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID;

async function seedSongs() {
  
  try {
    const res = await axios.get("https://api.jamendo.com/v3.0/tracks", {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        limit: 20,
        audioformat: "mp31",
        tags: "india,hindi,bollywood",
      },
    });

    const songs = res.data.results.map((track) => ({
      title: track.name,
      artist: track.artist_name,
      audio_url: track.audio,
      cover: track.album_image,
    }));

    const { error } = await supabase.from("songs").insert(songs);

    if (error) {
      console.error("❌ Insert error:", error);
    } else {
      console.log("✅ Hindi / Bollywood-style songs added!");
    }
  } catch (err) {
    console.error("❌ Jamendo error:", err.message);
  }
}

seedSongs();
