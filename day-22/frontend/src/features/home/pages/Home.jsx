import React from "react";
import FaceExpression from "../../expression/component/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import Navbar from "../components/Navbar";
const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <div>
      <Navbar/>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />

      <Player />
    </div>
  );
};

export default Home;
