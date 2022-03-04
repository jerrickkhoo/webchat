import { useState, useEffect } from "react";
import Chat from "./HomeComponents/Chat.js";
import Rooms from "./HomeComponents/Rooms.js";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [chatClicked, setChatClicked] = useState(null);

  console.log(chatClicked)

  function getChatClicked (chatClicked) {
    setChatClicked(chatClicked)
  }

  return (
    <div className="home">
      <div className="homebody">
        <Rooms setChatClicked={getChatClicked}/>
        {chatClicked !== null ? <Chat chatClicked={chatClicked}/> : null}
      </div>
    </div>
  );
};

export default Home;
