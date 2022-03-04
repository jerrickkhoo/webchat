import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";

const Chat = ({ chatClicked }) => {
  console.log('chatclicked',chatClicked);
  const [messages, setMessages] = useState([]);
  const [friendData, setFriendData] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${chatClicked?._id}`);
        console.log(response?.data?.message);
        setMessages(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chatClicked]);

  useEffect(() => {
    const friendID = chatClicked.participants.find((ID) => ID !== user._id);
    const getFriend = async () => {
      try {
        const response = await axios.get(`/api/users/${friendID}`);
        setFriendData(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [chatClicked.participants, user._id]);

  const userMessages = messages.map((item, index) => {
    if (item?.senderID === user._id) {
      return (
        <p className="chatmessage chatsend">
          <span className="chatname">{item?.senderName}</span>
          {item?.body}
          <span className="chattimestamp">{item?.updatedAt}</span>
        </p>
      );
    } else {
      return (
        <p className="chatmessage">
          <span className="chatname">{item?.senderName}</span>
          {item?.body}
          <span className="chattimestamp">{item?.updatedAt}</span>
        </p>
      );
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      body: e.target.body.value,
      chatID: chatClicked?._id,
      senderName: user.username,
      senderID: user._id
    };
    await axios
      .post(`/api/messages/`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
      e.target.body.value=''
  };

  console.log(friendData);
  return (
    <div className="chat">
      <div className="chatheader">
        <Avatar src={friendData.img} />
        <div className="chatheaderinfo">
          <h3 id="chatheaderinfoh3">{friendData.username}</h3>
          {/* <p id="chatheaderinfop">Last seen at...</p> */}
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbody">{userMessages}</div>
      <div className="chatfooter">
        <form id="chatfooterform" onSubmit={handleSubmit}>
          <input
            id="chatfooterinput"
            placeholder="type here"
            type="text"
            name="body"
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>{" "}
        </form>
      </div>
    </div>
  );
};

export default Chat;
