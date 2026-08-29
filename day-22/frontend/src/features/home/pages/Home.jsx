import React from "react";
import FaceExpression from "../../expression/component/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import Navbar from "../components/Navbar";
import UploadSong from "../components/UploadSong";
import Playlist from "../components/Playlist";

const Home = () => {
  const { handleGetSong, songs, handleSelectSong } = useSong();

  return (
    <div className="min-h-screen bg-[#09090b] pb-24 text-white">
      <Navbar />

      <main
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-5
          px-3
          py-5
          sm:px-5
          lg:grid-cols-[1.45fr_1fr]
          lg:gap-6
          lg:px-6
          xl:grid-cols-[1.5fr_1fr]
        "
      >
        {/* LEFT — Camera */}
        <section className="min-w-0">
          <FaceExpression
            onClick={(expression) => {
              handleGetSong({ mood: expression });
            }}
          />

          {/* Upload area later */}
          <UploadSong />
        </section>

        {/* RIGHT — Playlist */}
        <aside
          className="
            min-w-0
            rounded-2xl
            border border-zinc-800/80
            bg-[#111113]
            p-4
            shadow-2xl
            sm:p-5
          "
        >
          <Playlist songs={songs} handleSelectSong={handleSelectSong}/>
        </aside>
      </main>

      <Player />
    </div>
  );
};

export default Home;
