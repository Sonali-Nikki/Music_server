import express from "express";
import cors from "cors";
import trackRoutes from "./routes/track.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import podcastRoutes from "./routes/podcast.routes.js";
import episodeRoutes from "./routes/episode.routes.js";
import likeRoutes from "./routes/likedTrack.routes.js";
import recentlyPlayedRoutes from "./routes/recentlyPlayed.routes.js";
import importRoutes from "./routes/import.routes.js";
import songRoutes from "./routes/song.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Music Streaming Server is running");
}); 

app.use("/api/tracks", trackRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/recently-played", recentlyPlayedRoutes);
app.use("/api/import", importRoutes);
app.use("/songs", songRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});