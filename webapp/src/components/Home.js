import React from "react";
import Chat from "./HomeComponents/Chat.js";
import Rooms from "./HomeComponents/Rooms.js";

const Home = () => {
  return (
    <div className="home">
      <div className='homebody'>
        <Rooms />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
