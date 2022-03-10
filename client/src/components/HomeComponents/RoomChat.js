import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

const RoomChat = ({ chats }) => {
  const [friendData, setFriendData] = useState(null);
  console.log('chats',chats);
  const user = JSON.parse(localStorage.getItem("user"));
  const chatClicked = JSON.parse(localStorage.getItem("chatClicked"));

  // const notis = JSON.parse(localStorage.getItem(`${chats._id}`));
  // console.log('notis',notis)


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
  }, [chats.participants, user._id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete(`/api/chats/${chats._id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
      window.location.reload(); 

  };

  return (
    <div className="roomchat">
      <Avatar src={friendData?.img} />
      <div className="roomchatinfo ">
        <h2 id="roomchath2">{friendData?.username}</h2>
        <div style={{color:'red'}}>
          {chats?.participants[1] === user?._id &&
          chats?.participant2 !== 0 &&
          chatClicked?._id !== chats._id ?
             chats?.participant2
            : null}
          {chats?.participants[0] === user?._id &&
          chats?.participant1 !== 0 &&
          chatClicked?._id !== chats?._id ?
             chats?.participant1
            : null}
        </div>
        <div className="delete" style={{ paddingLeft: "200px" }}>
          <DeleteIcon onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
