import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import axios from "axios";

const RoomChat = ({ chats }) => {
  const [friendData, setFriendData] = useState(null);
  console.log(chats);
  const user = JSON.parse(localStorage.getItem("user"));

  //get
  useEffect(() => {
    const friendID = chats.participants.find((ID) => ID !== user._id);
    const getFriend = async () => {
      try {
        const response = await axios.get(`/api/users/${friendID}`);
        setFriendData(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  },[chats.participants, user._id]);

  return (
    <div className="roomchat">
      <Avatar src={friendData?.img}/>
      <div className="roomchatinfo">
        <h2 id="roomchath2">{friendData?.username}</h2>
        {/* <p>Last message</p> */}
      </div>
    </div>
  );
};

export default RoomChat;
