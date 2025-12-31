import { supabase } from "../config/supabaseClient.js";

export const getAllTracks = async (req, res) => {
  const { data, error } = await supabase
    .from("tracks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};


export const getTrackById = async (req, res) => {
  const { id } = req.params;    
    const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.json(data);
};


export const createTrack = async (req, res) => {
  const { title, artist, album, url } = req.body;   
    const { data, error } = await supabase
        .from("tracks")
        .insert([{ title, artist, album, url }])
        .single();  
    if (error) {
        return res.status(500).json({ message: error.message });
    }   
    res.status(201).json(data);
};  


export const deleteTrack = async (req, res) => {
    const { id } = req.params;      
    const { data, error } = await supabase
        .from("tracks")
        .delete()
        .eq("id", id);  
    if (error) {
        return res.status(500).json({ message: error.message });
    }  
    res.json({ message: "Track deleted successfully", data });
};  


export const updateTrack = async (req, res) => {
    const { id } = req.params;
    const { title, artist, album, url } = req.body; 
    const { data, error } = await supabase
        .from("tracks")
        .update({ title, artist, album, url })  
        .eq("id", id)
        .single();
    if (error) {
        return res.status(500).json({ message: error.message });
    }       
    res.json(data);
};  

export const searchTracks = async (req, res) => {
    const { query } = req.query;    
    const { data, error } = await supabase
        .from("tracks")
        .select("*")    
        .or(`title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`);
    if (error) {
        return res.status(500).json({ message: error.message });
    }   
    res.json(data);
};


export const getRecentTracks = async (req, res) => {
    const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    res.json(data);
};
