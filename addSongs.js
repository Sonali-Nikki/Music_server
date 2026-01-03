// import axios from "axios";
// import { supabase } from "../config/supabaseClient.js";



// // Example: Jamendo tracks (free full audio)
// const JAMENDO_CLIENT_ID = "f17b3544";
// // CLIENT_SECRET=2510eac3956c75e69fb29ef24d006d70

// const addSongs = async () => {
//   const songs = [];

//   // Example: Add some TheAudioDB songs
//   const audioDBTracks = [
//     { artist: "Coldplay", track: "Adventure Of A Lifetime" },
//     { artist: "Adele", track: "Hello" },
//     { artist: "Ed Sheeran", track: "Perfect" }
//   ];

//   for (const t of audioDBTracks) {
//     try {
//       const res = await axios.get(
//         `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${encodeURIComponent(t.artist)}&t=${encodeURIComponent(t.track)}`
//       );
//       const track = res.data.track?.[0];
//       if (track) {
//         songs.push({
//           title: track.strTrack,
//           artist: track.strArtist,
//           album: track.strAlbum,
//           cover: track.strTrackThumb,
//           audio_url: track.strMusicVid || null,
//           source: "TheAudioDB"
//         });
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   // Fetch free songs from Jamendo
//   try {
//     const res = await axios.get("https://api.jamendo.com/v3.0/tracks", {
//       params: { client_id: JAMENDO_CLIENT_ID, limit: 20, format: "json", audioformat: "mp31" }
//     });
//     res.data.results.forEach(track => {
//       songs.push({
//         title: track.name,
//         artist: track.artist_name,
//         album: track.album_name,
//         cover: track.album_image,
//         audio_url: track.audio,
//         source: "Jamendo"
//       });
//     });
//   } catch (err) {
//     console.error(err.message);
//   }

//   // Insert into Supabase
//   for (const song of songs) {
//     const { data, error } = await supabase.from("songs").insert([song]);
//     if (error) console.error("Insert error:", error);
//     else console.log("Inserted:", song.title, "-", song.artist);
//   }

//   console.log("✅ All songs added successfully!");
// };

// addSongs();
