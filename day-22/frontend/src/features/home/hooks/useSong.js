import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, postSong } from "../services/song.api";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, songs, setSongs, loading, setLoading } = context;

  const handlePostSong = async ({mood, file})=>{
    setLoading(true)
    const data = await postSong({mood,file})
    setSongs(data.songs)
    setLoading(false)
  }

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.songs[0]);
    setSongs(data.songs);
    setLoading(false);
    console.log("SONG DATA:", data);
  };

  const handleSelectSong = async (song)=>{
    await setSong(song)
  }

  return { song, songs, loading, handleGetSong, handleSelectSong, handlePostSong };
};
