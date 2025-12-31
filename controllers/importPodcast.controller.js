import crypto from "crypto";

export const importPodcasts = async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.PODCAST_API_KEY;
  const apiSecret = process.env.PODCAST_API_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);

  const hash = crypto
    .createHash("sha1")
    .update(apiKey + apiSecret + timestamp)
    .digest("hex");

  const response = await fetch(
    `https://api.podcastindex.org/api/1.0/search/byterm?q=${q}`,
    {
      headers: {
        "X-Auth-Date": timestamp,
        "X-Auth-Key": apiKey,
        Authorization: hash,
        "User-Agent": "MusicApp/1.0",
      },
    }
  );

  const data = await response.json();
  const podcasts = data.feeds.slice(0, 5);

  for (const p of podcasts) {
    const { data: podcast } = await supabase
      .from("podcasts")
      .insert({
        title: p.title,
        description: p.description,
        cover_url: p.image,
        publisher: p.author,
      })
      .select()
      .single();

    // episodes
    const epRes = await fetch(
      `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${p.id}`,
      {
        headers: {
          "X-Auth-Date": timestamp,
          "X-Auth-Key": apiKey,
          Authorization: hash,
          "User-Agent": "MusicApp/1.0",
        },
      }
    );

    const epData = await epRes.json();

    const episodes = epData.items.map((ep) => ({
      podcast_id: podcast.id,
      title: ep.title,
      audio_url: ep.enclosureUrl,
      duration: ep.duration,
      published_at: ep.datePublished * 1000,
    }));

    await supabase.from("episodes").insert(episodes);
  }

  res.json({ imported: podcasts.length });
};
