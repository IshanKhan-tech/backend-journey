import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../services/song.api";

export const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
    console.log("SONG DATA:", data);
  };

  return { song, loading, handleGetSong };
};
