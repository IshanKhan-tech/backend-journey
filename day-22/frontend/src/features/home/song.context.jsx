import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider =({ children }) => {

  const [song, setSong] = useState({
  "url": "https://ik.imagekit.io/flhcpraro/moodify/songs/Mere_Mehboob__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__uP5u9G8He.mp3",
  "posterUrl": "https://ik.imagekit.io/flhcpraro/moodify/poster/Mere_Mehboob__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.Com__YkrlFe7XZ.jpeg",
  "title": "Mere Mehboob (From \"Vicky Vidya Ka Woh Wala Video\") [DownloadMing.Com]",
  "mood": "happy",
});
    
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
